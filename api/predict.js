import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {
  try {
    console.log("TESTING")
    const payload = req.body;

    const auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GCP_API_KEY),
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });

    const url = process.env.VITE_API_URL + '/predict';
    const client = await auth.getIdTokenClient(url);

    const response = await client.request({
      url,
      method: 'POST',
      data: payload,
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to call Cloud Run' });
  }
}
