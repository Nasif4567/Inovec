import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise
  const { id } = await context.params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing product ID" }), {
      status: 400,
    });
  }

  try {
    const product = await prisma.product.findUnique({
  where: {
    zoho_item_id: id
  },
  select: {
    zoho_item_id: true,
    name: true,
    price: true,
    tabs: true,
    pdfs: true,
  }
});

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    // Return the tabs and pdfs for frontend
    return new Response(
      JSON.stringify({
        tabs: product.tabs || [],
        pdfs: product.pdfs || [],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch product error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
