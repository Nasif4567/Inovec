import nodemailer from "nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this path to your auth config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail(userEmail: string, orderDetails: any) {
  // 1. Get session on the server side
  const session = await getServerSession(authOptions);
  const customerName = session?.user?.name || "Valued Customer";
  
  const logoUrl = "https://your-website.com/logo-black.png"; 

  // 2. Generate Item Rows
  const itemsHtml = orderDetails.line_items.map((item: any) => `
    <tr>
      <td style="padding: 15px 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">
        <span style="display: block; font-weight: 700; font-size: 14px; color: #1e293b;">${item.name || "Industrial Product"}</span>
        <span style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">SKU: ${item.item_id || 'N/A'}</span>
      </td>
      <td style="padding: 15px 12px; border-bottom: 1px solid #f1f5f9; text-align: center; color: #1e293b; font-weight: 700; font-size: 14px;">
        ${item.quantity || 1}
      </td>
      <td style="padding: 15px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; color: #1e293b; font-weight: 600; font-size: 14px;">
        QAR ${parseFloat(item.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </td>
    </tr>
  `).join("");

  // 3. Setup Mail Options
  const mailOptions = {
    from: `"NAK Industrial" <${process.env.SMTP_USER}>`, // Use consistent ENV variable
    to: userEmail,
    subject: `Order Confirmation - NAK Industrial`,
    html: `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <div style="background-color: #facc15; padding: 40px 20px; text-align: center;">
          <img src="${logoUrl}" alt="NAK Industrial" style="width: 150px; height: auto; margin-bottom: 15px;" />
          <div style="background-color: #000; color: #facc15; display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
            Order Confirmed
          </div>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 22px; font-weight: 800;">Hello ${customerName},</h2>
          <p style="color: #64748b; line-height: 1.6; font-size: 15px; margin: 0;">Your order has been successfully logged in our system. Our logistics team in Doha is preparing your items for dispatch if you have any question please feel free to call us at +974233434445</p>
          
          <div style="margin: 35px 0; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <th style="text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px;">Item Details</th>
                  <th style="padding: 12px; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px;">Qty</th>
                  <th style="text-align: right; padding: 12px; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px;">Rate</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div style="background-color: #1e293b; padding: 25px; border-radius: 10px; color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="font-size: 14px; color: #94a3b8; padding-bottom: 10px;">Subtotal</td>
                <td style="text-align: right; font-size: 14px; color: #f8fafc; padding-bottom: 10px;">QAR ${parseFloat(orderDetails.total).toFixed(2)}</td>
              </tr>
              <tr style="border-top: 1px solid #334155;">
                <td style="padding-top: 15px; font-size: 18px; font-weight: 800; color: #facc15;">Grand Total</td>
                <td style="padding-top: 15px; text-align: right; font-size: 22px; font-weight: 800; color: #facc15;">QAR ${parseFloat(orderDetails.total).toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid #f1f5f9; text-align: center;">
            <p style="font-size: 14px; font-weight: 800; color: #1e293b; margin: 0 0 5px 0;">NAK INDUSTRIAL SOLUTIONS</p>
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">Specialized Industrial Equipment & Parts<br/>Doha, State of Qatar</p>
          </div>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}