import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

export async function POST(req: Request) {
  try {
    // 1. Get the raw body
    const body = await req.json();

    // 2. Map the incoming data to Zoho's specific schema
    // Zoho requires 'contact_name' as a mandatory field.
    const zohoPayload = {
      contact_name: body.name, 
      company_name: body.name,
      contact_type: "customer",
      customer_sub_type: "individual",
      emails: body.email,
      phone: body.phone,
      billing_address: {
        address: body.billing_address?.address || "",
        city: body.billing_address?.city || "",
        zip: body.billing_address?.zip || "00000",
        country: "Qatar",
      },
    };

    // 3. Format as x-www-form-urlencoded with JSONString key
    const formData = new URLSearchParams();
    formData.append('JSONString', JSON.stringify(zohoPayload));

    const accessToken = await getZohoAccessToken();
    const ORG_ID = process.env.ZOHOORGID;

    const zohoRes = await fetch(
      `https://www.zohoapis.com/inventory/v1/contacts?organization_id=${ORG_ID}`,
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
    // ... rest of your error handling
    console.log("Zoho API Response:", data);

    if (!zohoRes.ok) {
      return NextResponse.json(
        {
          error: "Zoho API Error",
          details: data,
        },
        { status: zohoRes.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Zoho Create Contact Error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
