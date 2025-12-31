// app/api/inventory/images/[image_id]/route.ts
import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

export async function GET(
  req: Request,
  context: { params: { image_id: string } | Promise<{ image_id: string }> }
) {
  // Unwrap params if it's a Promise
  const params = context.params instanceof Promise ? await context.params : context.params;
  const image_id = params.image_id;

  console.log("Fetching image for item ID:", image_id);

  const TOKEN = await getZohoAccessToken();
  const ORG_ID = process.env.ZOHOORGID;

  try {
    const zohoRes = await fetch(
      `https://www.zohoapis.com/inventory/v1/items/${image_id}/image?organization_id=${ORG_ID}`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${TOKEN}` },
      }
    );

    if (zohoRes.status === 204) {
      return NextResponse.json({ error: "Item has no image" }, { status: 204 });
    }

    if (!zohoRes.ok) {
      const text = await zohoRes.text();
      return NextResponse.json(
        { error: "Failed to fetch Zoho image", status: zohoRes.status, details: text },
        { status: zohoRes.status }
      );
    }

    return new NextResponse(zohoRes.body, {
      status: 200,
      headers: {
        "Content-Type": zohoRes.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching image", details: String(error) },
      { status: 500 }
    );
  }
}
