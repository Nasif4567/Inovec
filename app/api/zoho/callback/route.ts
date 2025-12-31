import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing 'code' from Zoho OAuth" },
      { status: 400 }
    );
  }

  const clientId = process.env.CLIENTID;
  const clientSecret = process.env.CLIENTSECRET;
  const redirectUri = "http://localhost:3000/api/zoho/callback";

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing Zoho client credentials" },
      { status: 500 }
    );
  }

  // Exchange authorization code for tokens
  const tokenRes = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await tokenRes.json();

  console.log("ZOHO TOKEN RESPONSE:", data);

  return NextResponse.json(data);
}
