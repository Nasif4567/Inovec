import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

// In-memory cache
let cachedItems: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000;  // 5 minutes

export async function GET() {
  try {
    const now = Date.now();

    // Use cache if still valid
    if (cachedItems && now - cacheTimestamp < CACHE_TTL) {
      return NextResponse.json({ items: cachedItems });
    }

    // Otherwise, fetch from Zoho
    const accessToken = await getZohoAccessToken();
    console.log("The Zoho inventory Access Token :", accessToken);
    const response = await fetch(
      `https://www.zohoapis.com/inventory/v1/items?organization_id=${process.env.ZOHOORGID}`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      }
    );

    const data = await response.json();
   // console.log("Zoho Items Response:", data);
    if (!response.ok || !data.items) {
      return NextResponse.json(
        { error: "Failed to fetch Zoho items", details: data },
        { status: response.status }
      );
    }

    cachedItems = data.items;
    cacheTimestamp = now;

    return NextResponse.json({ items: cachedItems });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
