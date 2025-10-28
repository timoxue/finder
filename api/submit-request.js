import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'
import crypto from 'node:crypto'

// Initialize SendGrid (fallback only)
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const RATE_LIMIT_WINDOW_MS = 30_000 // 30 seconds cooldown per client
const RATE_LIMIT_COOKIE = 'sf_rl'
const RATE_LIMIT_SECRET = process.env.RATE_LIMIT_SECRET || ''

function signToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const hmac = crypto.createHmac('sha256', RATE_LIMIT_SECRET)
  hmac.update(data)
  const sig = hmac.digest('base64url')
  return `${data}.${sig}`
}

function verifyToken(token) {
  if (!token) return null
  const [data, sig] = token.split('.')
  if (!data || !sig) return null
  const hmac = crypto.createHmac('sha256', RATE_LIMIT_SECRET)
  hmac.update(data)
  const expected = hmac.digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString())
  } catch {
    return null
  }
}

function parseCookies(req) {
  const header = req.headers['cookie'] || ''
  return Object.fromEntries(header.split(';').filter(Boolean).map(kv => {
    const idx = kv.indexOf('=')
    const k = kv.slice(0, idx).trim()
    const v = kv.slice(idx + 1).trim()
    return [k, decodeURIComponent(v)]
  }))
}

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, company, email, requestDetails, website, captchaA, captchaB, captchaAnswer } = req.body || {}

    // Honeypot: should be empty
    if (typeof website === 'string' && website.trim().length > 0) {
      return res.status(400).json({ error: 'Invalid submission' })
    }

    // Simple captcha: a + b = answer
    const a = Number(captchaA)
    const b = Number(captchaB)
    const ans = Number(captchaAnswer)
    if (!Number.isFinite(a) || !Number.isFinite(b) || a + b !== ans) {
      return res.status(400).json({ error: 'Captcha validation failed' })
    }

    // Stateless rate limit using signed cookie
    if (RATE_LIMIT_SECRET) {
      const cookies = parseCookies(req)
      const token = cookies[RATE_LIMIT_COOKIE]
      const data = verifyToken(token)
      const now = Date.now()
      if (data && typeof data.ts === 'number' && now - data.ts < RATE_LIMIT_WINDOW_MS) {
        const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - data.ts)) / 1000)
        res.setHeader('Retry-After', String(retryAfter))
        return res.status(429).json({ error: 'Too many requests. Please wait a bit and try again.' })
      }
      const newToken = signToken({ ts: now })
      res.setHeader('Set-Cookie', `${RATE_LIMIT_COOKIE}=${encodeURIComponent(newToken)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`)
    }

    // Validate required fields
    if (!name || !company || !email || !requestDetails) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, company, email, and request details are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const to = process.env.MAIL_TO || 'hello@supplyfinder.ai'
    const from = process.env.MAIL_FROM || 'hello@supplyfinder.ai'
    const subject = process.env.MAIL_SUBJECT || `New SupplyFinder Request from ${company}`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New SupplyFinder Request
        </h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-bottom: 15px;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-bottom: 15px;">Sourcing Requirements</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${requestDetails}</p>
        </div>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #64748b; font-size: 14px;">Submitted via SupplyFinder.ai</p>
        </div>
      </div>
    `

    const text = `
New SupplyFinder Request

Contact Information:
- Name: ${name}
- Company: ${company}
- Email: ${email}

Sourcing Requirements:
${requestDetails}
`

    const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

    if (hasSmtp) {
      // Prefer SMTP (Zoho)
      const port = Number(process.env.SMTP_PORT || 465)
      const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure, // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({ from, to, subject, text, html })
    } else if (process.env.SENDGRID_API_KEY) {
      // Fallback to SendGrid
      await sgMail.send({ to, from, subject, text, html })
    } else {
      return res.status(500).json({ 
        error: 'Email configuration missing',
        message: 'Please configure SMTP (Zoho) or SendGrid environment variables.'
      })
    }

    console.log(`Request email sent: ${name} / ${company} / ${email}`)
    return res.status(200).json({ success: true, message: 'Request submitted successfully' })

  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ 
      error: 'Failed to send request',
      message: 'There was an error processing your request. Please try again later.'
    })
  }
}
