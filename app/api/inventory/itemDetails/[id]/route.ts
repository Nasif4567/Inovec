import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

// In-memory cache for individual products
const productCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const now = Date.now();

  try {
    // 1️⃣ Check cache
    const cached = productCache.get(id);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ item: cached.data });
    }

    // 2️⃣ Fetch fresh from Zoho
    const TOKEN = await getZohoAccessToken();
    const ORG_ID = process.env.ZOHOORGID;

    const res = await fetch(
      `https://www.zohoapis.com/inventory/v1/items/${id}?organization_id=${ORG_ID}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data.item) {
      return NextResponse.json(
        { error: "Failed to fetch product", details: data },
        { status: res.status }
      );
    }

    // 3️⃣ Save to cache
    productCache.set(id, {
      data: data.item,
      timestamp: now,
    });

    // 4️⃣ Return response
    return NextResponse.json({ item: data.item });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
