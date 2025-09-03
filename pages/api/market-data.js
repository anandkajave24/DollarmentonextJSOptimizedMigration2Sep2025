// Market data API route for Next.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Market data logic here - simplified for migration
      const mockData = {
        sp500: { current: 4500, change: '+1.2%' },
        nasdaq: { current: 14200, change: '+0.8%' },
        dow: { current: 34800, change: '+0.5%' },
        lastUpdated: new Date().toISOString()
      };
      res.status(200).json(mockData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch market data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}