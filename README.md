# SupplyFinder.ai MVP

AI-powered sourcing landing page with a request form and Vercel Serverless email handler.

## Tech Stack
- Vite + React (Hooks)
- Vanilla CSS
- Vercel Serverless Functions in `api/`
- Email via SMTP (Zoho) using Nodemailer, fallback to SendGrid if configured

## Setup
```bash
# install deps
npm install

# run dev
npm run dev

# build / preview
npm run build
npm run preview
```

## Environment Variables (set in Vercel)
Either configure SMTP (recommended) or SendGrid. SMTP takes precedence when present.

SMTP (Zoho)
- `SMTP_HOST`=smtp.zoho.com
- `SMTP_PORT`=465 (or 587)
- `SMTP_SECURE`=true for 465, false for 587
- `SMTP_USER`=hello@SupplyFinder.ai
- `SMTP_PASS`=your_app_password
- `MAIL_FROM`=hello@SupplyFinder.ai
- `MAIL_TO`=hello@SupplyFinder.ai
- `MAIL_SUBJECT`=New SupplyFinder Request (optional)

SendGrid (fallback)
- `SENDGRID_API_KEY`
- `MAIL_FROM` (default: `hello@supplyfinder.ai`)
- `MAIL_TO` (default: `hello@supplyfinder.ai`)

Security & Anti‑Spam
- `RATE_LIMIT_SECRET` – enable stateless per-client cooldown via signed cookie (recommended)
- Built-in measures: server-side validation, honeypot field, simple math CAPTCHA, short rate-limit window

Market Intelligence (optional, enables real-time data)
- `INTEL_TTL_MINUTES` – cache TTL in minutes (default: 15)
- Lithium price providers (choose any available):
  - `SMM_API_KEY` – SMM (Shanghai Metals Market)
  - `FASTM_API_KEY` – Fastmarkets
  - `CME_LI_API_URL` – Custom JSON endpoint returning `{ pricePerTon, trend, change }`
- EU port congestion providers (choose 1):
  - `MARINETRAFFIC_API_KEY` and `MARINETRAFFIC_API_URL` – MarineTraffic API base/query URL
  - `PORT_CONGESTION_API_URL` – Custom JSON endpoint returning `{ value, trend, change }`
- Policy alert (optional):
  - `POLICY_ALERT_API_URL` – Custom JSON endpoint returning `{ value, trend, change }`

## Deployment (Vercel)
- Push to GitHub, import repo to Vercel
- Add env vars above
- Build command: `npm run vercel-build`
- Output: `dist`

## Project Structure
```
.
├─ api/
│  ├─ submit-request.js        # Serverless: handles form submit + SMTP/SendGrid
│  └─ market-intelligence.js   # Serverless: aggregates real-time market signals with caching
├─ public/
│  ├─ hero-bg.svg              # Techy hero background
│  └─ favicon.svg              # Favicon
├─ src/
│  ├─ components/
│  │  └─ RequestForm.jsx       # Request form with validation + fetch
│  ├─ styles/
│  │  └─ globals.css           # Modern, responsive styling
│  ├─ App.jsx                  # Landing page sections
│  └─ main.jsx                 # React entry
├─ index.html                  # Vite HTML entry
├─ package.json                # Scripts + deps
├─ vite.config.js              # Vite config
└─ README.md
```

## Notes
- The form POSTs to `/api/submit-request`.
- For Zoho with 2FA, generate an App Password and use it as `SMTP_PASS`.
- SMTP is preferred for deliverability from your domain; SendGrid remains available as a fallback.
- If you set `RATE_LIMIT_SECRET`, a 30s cooldown per client applies between submissions.
