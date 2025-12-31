import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

// Cache variables
let cachedItems: ZohoItem[] = []; // Initialize as empty array
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Define Zoho item type
interface ZohoItem {
  item_id: string;
  item_name: string;
  description?: string;
  rate?: number;
  category?: string;
  [key: string]: any; // To allow extra Zoho fields
}

// Fetch items with caching
async function fetchZohoItems(): Promise<ZohoItem[]> {
  const now = Date.now();

  // Return cache if still valid
  if (cachedItems.length && now - cacheTimestamp < CACHE_TTL) {
    return cachedItems;
  }

  const accessToken = await getZohoAccessToken();
  const ORG_ID = process.env.ZOHOORGID;
  if (!ORG_ID) throw new Error("Missing Zoho Organization ID");

  const response = await fetch(
    `https://www.zohoapis.com/inventory/v1/items?organization_id=${ORG_ID}`,
    { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } }
  );

  const data = await response.json();

  if (!response.ok || !Array.isArray(data.items)) {
    cachedItems = []; // fallback to empty array
  } else {
    cachedItems = data.items;
  }

  cacheTimestamp = now;
  return cachedItems;
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { categories, search } = (await req.json()) as {
      categories?: string[];
      search?: string;
    };

    let items = await fetchZohoItems();

    // Filter by categories if provided
    if (categories?.length) {
      const lowerCats = categories.map((c) => c.toLowerCase());
      items = items.filter(
        (item) => item.category && lowerCats.includes(item.category.toLowerCase())
      );
    }

    // Filter by search term if provided
    if (search?.trim()) {
      const term = search.toLowerCase();
      items = items.filter(
        (item) => item.item_name && item.item_name.toLowerCase().includes(term)
      );
    }

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
