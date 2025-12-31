import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

export async function POST(req: Request) {
  try {
    const { orderData } = await req.json();

    const accessToken = await getZohoAccessToken(); // ✅ you defined TOKEN but used accessToken
    const ORG_ID = process.env.ZOHOORGID;

    if (!ORG_ID) {
      return NextResponse.json(
        { error: "Missing Zoho Organization ID" },
        { status: 500 }
      );
    }

    const zohoRes = await fetch(
      `https://www.zohoapis.com/inventory/v1/salesorders?organization_id=${ORG_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const data = await zohoRes.json();

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
    console.error("Zoho Sales Order Error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
