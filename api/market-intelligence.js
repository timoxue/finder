// Aggregates market intelligence with simple in-memory caching
// Supports pluggable data sources via environment variables

const CACHE_TTL_MINUTES = Number(process.env.INTEL_TTL_MINUTES || 15)
const CACHE_TTL_MS = CACHE_TTL_MINUTES * 60 * 1000

let cache = {
  ts: 0,
  data: null,
}

function now() {
  return Date.now()
}

function withinTtl(timestamp) {
  return timestamp && now() - timestamp < CACHE_TTL_MS
}

async function safeFetchJson(url, options = {}) {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    // Try text then parse if possible
    const txt = await res.text()
    try { return JSON.parse(txt) } catch { throw new Error('Non-JSON response') }
  }
  return res.json()
}

// Fetch lithium price from available providers
async function fetchLithiumPrice() {
  // Priority: SMM -> Fastmarkets -> Custom JSON endpoint -> fallback
  const smmKey = process.env.SMM_API_KEY
  const fastmKey = process.env.FASTM_API_KEY
  const customUrl = process.env.CME_LI_API_URL // or any JSON endpoint you provide

  try {
    if (smmKey) {
      // Placeholder: replace with actual SMM endpoint when available
      // const smm = await safeFetchJson(`https://api.smm.cn/lithium?apikey=${smmKey}`)
      // return { value: `${smm.spot}/ton`, trend: smm.trend, change: smm.change }
      return null
    }
    if (fastmKey) {
      // Placeholder: replace with Fastmarkets endpoint
      // const fm = await safeFetchJson(`https://api.fastmarkets.com/lithium?apikey=${fastmKey}`)
      // return { value: `${fm.assessment}/ton`, trend: fm.trend, change: fm.change }
      return null
    }
    if (customUrl) {
      const data = await safeFetchJson(customUrl)
      // Expecting a structure like { pricePerTon: number, trend: 'up'|'down'|'neutral', change: string }
      return {
        value: typeof data.pricePerTon === 'number' ? `${data.pricePerTon}/ton` : String(data.value || data.price || 'N/A'),
        trend: data.trend || 'neutral',
        change: data.change || '',
      }
    }
  } catch (e) {
    // Log and fall through to fallback
    console.error('Lithium fetch failed:', e.message)
  }

  // Fallback snapshot
  return { value: '¥105,500/ton', trend: 'down', change: '-2.3% this week' }
}

// Fetch EU Port Congestion
async function fetchEuPortCongestion() {
  const mtKey = process.env.MARINETRAFFIC_API_KEY
  const mtUrl = process.env.MARINETRAFFIC_API_URL // optional override for a prebuilt query URL
  const customUrl = process.env.PORT_CONGESTION_API_URL // any JSON endpoint returning congestion metrics

  try {
    if (mtUrl && mtKey) {
      const data = await safeFetchJson(`${mtUrl}${mtUrl.includes('?') ? '&' : '?'}apikey=${encodeURIComponent(mtKey)}`)
      // Normalize expected structure
      return {
        value: data.value || data.level || 'Moderate',
        trend: data.trend || 'neutral',
        change: data.change || '+3 days avg delay',
      }
    }
    if (customUrl) {
      const data = await safeFetchJson(customUrl)
      return {
        value: data.value || data.level || 'Moderate',
        trend: data.trend || 'neutral',
        change: data.change || '+3 days avg delay',
      }
    }
  } catch (e) {
    console.error('Port congestion fetch failed:', e.message)
  }

  // Fallback snapshot
  return { value: 'Moderate', trend: 'neutral', change: '+3 days avg delay' }
}

async function fetchPolicyAlert() {
  // Optional: can wire to a news/policy feed
  // Allow custom JSON endpoint for quick integration
  const url = process.env.POLICY_ALERT_API_URL
  try {
    if (url) {
      const data = await safeFetchJson(url)
      return {
        value: data.value || data.region || 'Germany',
        trend: data.trend || 'up',
        change: data.change || 'New subsidy draft released',
      }
    }
  } catch (e) {
    console.error('Policy alert fetch failed:', e.message)
  }
  return { value: 'Germany', trend: 'up', change: 'New subsidy draft released' }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  // Serve cache when valid
  if (withinTtl(cache.ts) && cache.data) {
    res.status(200).json(cache.data)
    return
  }

  try {
    const [lithium, congestion, policy] = await Promise.all([
      fetchLithiumPrice(),
      fetchEuPortCongestion(),
      fetchPolicyAlert(),
    ])

    const payload = {
      lithium_price: lithium,
      shipping_delay: congestion,
      policy_alert: policy,
      meta: {
        updatedAt: new Date().toISOString(),
        ttlMinutes: CACHE_TTL_MINUTES,
        sources: {
          lithium: process.env.SMM_API_KEY ? 'SMM' : process.env.FASTM_API_KEY ? 'Fastmarkets' : process.env.CME_LI_API_URL ? 'Custom' : 'Fallback',
          congestion: process.env.MARINETRAFFIC_API_KEY ? 'MarineTraffic' : process.env.PORT_CONGESTION_API_URL ? 'Custom' : 'Fallback',
          policy: process.env.POLICY_ALERT_API_URL ? 'Custom' : 'Fallback',
        }
      }
    }

    cache = { ts: now(), data: payload }
    res.status(200).json(payload)
  } catch (e) {
    console.error('market-intelligence error:', e)
    if (cache.data) {
      res.status(200).json(cache.data)
    } else {
      res.status(500).json({ error: 'Failed to load market intelligence' })
    }
  }
}

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
