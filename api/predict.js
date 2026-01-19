const rateLimitStore = new Map(); 

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const now = Date.now();
  const lastRequest = rateLimitStore.get(ip) || 0;

  if (now - lastRequest < 2000) {
    return res.status(429).json({ error: "Too many requests, slow down!" });
  }

  rateLimitStore.set(ip, now);
  try {
    const { GoogleAuth } = await import("google-auth-library");
    const payload = req.body;

    const auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GCP_API_KEY),
    });

    const client = await auth.getIdTokenClient(process.env.VITE_API_URL);

    const response = await client.request({
      url: process.env.VITE_API_URL + "/predict",
      method: "POST",
      data: payload,
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Backend call failed" });
  }
}
