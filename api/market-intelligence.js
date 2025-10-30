export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const data = {
    lithium_price: { value: '¥105,500', trend: 'down', change: '-2.3%' },
    shipping_delay: { value: 'Moderate', trend: 'neutral', change: '+3 days' },
    policy_alert: { value: 'Germany', trend: 'up', change: 'New subsidy draft' }
  }

  return res.status(200).json(data)
}
