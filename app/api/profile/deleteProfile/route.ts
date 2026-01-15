import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getZohoAccessToken } from "@/lib/zoho";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Find the user to get their Zoho Customer ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, zohoCusID: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Delete from Zoho Inventory if ID exists
    if (user.zohoCusID) {
      try {
        const accessToken = await getZohoAccessToken();
        const ORG_ID = process.env.ZOHOORGID;

        const zohoRes = await fetch(
          `https://www.zohoapis.com/inventory/v1/contacts/${user.zohoCusID}?organization_id=${ORG_ID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
          }
        );

        const zohoData = await zohoRes.json();
        
        // Zoho might block deletion if there are active transactions (invoices/orders)
        if (!zohoRes.ok) {
          console.error("Zoho Delete Error:", zohoData);
          // Optional: Return error if you want to prevent DB deletion when Zoho fails
          // return NextResponse.json({ error: "Cannot delete Zoho contact with active transactions" }, { status: 400 });
        }
      } catch (err) {
        console.error("Zoho Connection Error during deletion:", err);
      }
    }

    // 3. Delete from Prisma Database
    await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json({
      success: true,
      message: "Account deleted from system and Zoho successfully",
    });
  } catch (error: any) {
    console.error("Delete Account Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}