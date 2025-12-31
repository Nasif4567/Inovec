// lib/zoho.ts
declare global {
  var zohoTokenCache: {
    token?: string;
    expiry?: number;
  };
}

if (!global.zohoTokenCache) {
  global.zohoTokenCache = {};
}

export async function getZohoAccessToken() {
  const now = Date.now();

  if (global.zohoTokenCache.token && global.zohoTokenCache.expiry && now < global.zohoTokenCache.expiry) {
    return global.zohoTokenCache.token;
  }

  const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    body: new URLSearchParams({
      refresh_token: process.env.REFRESH_TOKEN!,
      client_id: process.env.CLIENTID!,
      client_secret: process.env.CLIENTSECRET!,
      grant_type: "refresh_token",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await res.json();

  if (!data.access_token) {
    console.error("Failed to get Zoho token:", data);
    throw new Error("Zoho token fetch failed");
  }

  global.zohoTokenCache.token = data.access_token;
  global.zohoTokenCache.expiry = now + (data.expires_in - 60) * 1000; // minus 1 min buffer

  console.log("New Zoho access token fetched");

  return data.access_token;
}
