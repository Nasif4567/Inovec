import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const BOOKS_ACCESS_TOKEN = process.env.CACCESS_TOKEN;
  const BOOKS_ORG_ID = process.env.CZOHOORGID;
  const INV_ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const INV_ORG_ID = process.env.ZOHOORGID;

  const DEFAULTS = {
    unit: "PCS",
    item_type: "goods",
    product_type: "goods",
    track_inventory: false,
    category_name: "OTHERS", // fallback if missing
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Sanitize item names for Zoho Inventory
  const sanitizeItemName = (name: string) => {
    if (!name) return "Unnamed Item";
    return name
      .replace(/[^a-zA-Z0-9\s\-_\.]/g, "-") // replace invalid characters
      .replace(/\s+/g, " ")                 // collapse multiple spaces
      .trim()
      .substring(0, 255);                   // limit to 255 chars
  };

  try {
    console.log("Fetching items from Zoho Books...");
    const booksResp = await fetch(
      `https://www.zohoapis.com/books/v3/items?organization_id=${BOOKS_ORG_ID}`,
      { headers: { Authorization: `Zoho-oauthtoken ${BOOKS_ACCESS_TOKEN}` } }
    );
    const booksData = await booksResp.json();

    if (!booksData.items || booksData.items.length === 0) {
      return new Response(JSON.stringify({ message: "No items found." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(`Found ${booksData.items.length} items. Syncing to Inventory...`);

    const created: any[] = [];
    const failed: any[] = [];

    for (const item of booksData.items) {
      const payload = {
        name: sanitizeItemName(item.item_name),
        sku: item.sku || "",
        unit: item.unit || DEFAULTS.unit,
        description: item.description || "",
        item_type: item.item_type || DEFAULTS.item_type,
        product_type: item.product_type || DEFAULTS.product_type,
        track_inventory: item.track_inventory ?? DEFAULTS.track_inventory,
        rate: item.rate || 0,
        purchase_rate: item.purchase_rate || 0,
        category_id: item.category_id || "",
        category_name: item.category_name || DEFAULTS.category_name,
        tags: item.tags || [],
        brand: item.brand || "",
      };

      let success = false;
      let retries = 0;

      while (!success && retries < 5) {
        try {
          const invResp = await fetch(
            `https://www.zohoapis.com/inventory/v1/items?organization_id=${INV_ORG_ID}`,
            {
              method: "POST",
              headers: {
                Authorization: `Zoho-oauthtoken ${INV_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          const invData = await invResp.json();
          console.log("Inventory response for item", payload.name, ":", invData);

          if (invResp.status === 201 || invResp.status === 200) {
            created.push({ name: payload.name, id: invData.item?.item_id });
            success = true;
          } else if (invData.code === 45) {
            // Rate limit hit – wait and retry
            console.warn(`Rate limit reached. Waiting 5s before retrying...`);
            await delay(5000);
            retries++;
          } else if (invData.code === 4) {
            // Invalid item name
            console.error(`Invalid item name for "${payload.name}". Skipping.`);
            failed.push({ name: payload.name, error: invData.message });
            success = true;
          } else {
            failed.push({ name: payload.name, error: invData });
            success = true;
          }
        } catch (err: any) {
          console.error("Error posting item:", err.message);
          failed.push({ name: payload.name, error: err.message });
          success = true;
        }
      }

      // Small delay between items to reduce chance of rate limit
      await delay(200);
    }

    return new Response(
      JSON.stringify({
        message: "Items sync completed",
        createdCount: created.length,
        failedCount: failed.length,
        created,
        failed,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error syncing items:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
