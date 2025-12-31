// lib/zoho.ts
declare global {
  var czohoTokenCache: {
    ctoken?: string;
    cexpiry?: number;
  };
}

if (!global.czohoTokenCache) {
  global.czohoTokenCache = {};
}

export async function cgetZohoAccessToken() {
  const now = Date.now();

  if (global.czohoTokenCache.ctoken && global.czohoTokenCache.cexpiry && now < global.czohoTokenCache.cexpiry) {
    return global.czohoTokenCache.ctoken;
  }

  const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    body: new URLSearchParams({
      refresh_token: process.env.CREFRESH_TOKEN!,
      client_id: process.env.CCLIENTID!,
      client_secret: process.env.CCLIENTSECRET!,
      grant_type: "refresh_token",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const datas = await res.json();

  if (!datas.caccess_token) {
    console.error("Failed to get Zoho token:", datas);
    throw new Error("Zoho token fetch failed");
  }

  global.czohoTokenCache.ctoken = datas.caccess_token;
  global.czohoTokenCache.cexpiry = now + (datas.cexpires_in - 60) * 1000; // minus 1 min buffer

  console.log("Company New Zoho access token fetched");

  return datas.caccess_token;
}
