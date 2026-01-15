import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getZohoAccessToken } from "@/lib/zoho";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, phone, address, city, zipCode } = await req.json();

    // 1. UPDATE PRISMA DATABASE
    // We update the user record based on the email in the current session
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phone,
        address,
        city,
        zip: zipCode, // Mapping zipCode state to zip column
      },
    });

    // 2. UPDATE ZOHO INVENTORY CONTACT
    // Only attempt if the user has a linked Zoho Customer ID
    if (updatedUser.zohoCusID) {
      try {
        const accessToken = await getZohoAccessToken();
        const ORG_ID = process.env.ZOHOORGID;

        const zohoPayload = {
          contact_name: name,
          company_name: name,
          phone: phone,
          billing_address: {
            address: address,
            city: city,
            zip: zipCode || "00000",
            country: "Qatar",
          },
        };

        const formData = new URLSearchParams();
        formData.append("JSONString", JSON.stringify(zohoPayload));

        const zohoRes = await fetch(
          `https://www.zohoapis.com/inventory/v1/contacts/${updatedUser.zohoCusID}?organization_id=${ORG_ID}`,
          {
            method: "PUT", // Use PUT for updating an existing contact
            headers: {
              Authorization: `Zoho-oauthtoken ${accessToken}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          }
        );

        if (!zohoRes.ok) {
          const errorData = await zohoRes.json();
          console.error("Zoho Sync Failed:", errorData);
          // We don't throw an error here because the DB update was successful
        }
      } catch (zohoErr) {
        console.error("Zoho Connection Error:", zohoErr);
      }
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("API Update Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}