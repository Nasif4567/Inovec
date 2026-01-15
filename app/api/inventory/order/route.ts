import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getZohoAccessToken } from "@/lib/zoho";
import { sendOrderEmail } from "@/lib/mail"; // Import the helper

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { zoho_order_details } = await req.json();
    const accessToken = await getZohoAccessToken();
    const ORG_ID = process.env.ZOHOORGID;

    // 1. Create order in Zoho
    const formData = new URLSearchParams();
    formData.append('JSONString', JSON.stringify(zoho_order_details));

    const zohoRes = await fetch(
      `https://www.zohoapis.com/inventory/v1/salesorders?organization_id=${ORG_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: formData.toString(), 
      }
    );

    const data = await zohoRes.json();

    if (zohoRes.ok) {
      // 2. SUCCESS: Send the email to the user
      try {
        await sendOrderEmail(session.user.email!, zoho_order_details);
      } catch (mailError) {
        console.error("Email failed to send, but order was created:", mailError);
        // We don't fail the request here because the order is already in Zoho
      }

      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Zoho Error", details: data }, { status: zohoRes.status });
    }

  } catch (error: any) {
    return NextResponse.json({ error: "Server Error", message: error.message }, { status: 500 });
  }
}