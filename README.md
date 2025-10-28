# SupplyFinder.ai MVP

AI-powered sourcing landing page with a request form and Vercel Serverless email handler.

## Tech Stack
- Vite + React (Hooks)
- Vanilla CSS
- Vercel Serverless Functions in `api/`
- SendGrid Mail SDK

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
- `SENDGRID_API_KEY`
- `MAIL_FROM` (default: `hello@supplyfinder.ai`)
- `MAIL_TO` (default: `hello@supplyfinder.ai`)

## Deployment (Vercel)
- Push to GitHub, import repo to Vercel
- Add env vars above
- Build command: `npm run vercel-build`
- Output: `dist`

## Project Structure
```
.
├─ api/
│  └─ submit-request.js        # Serverless: handles form submit + SendGrid
├─ public/
│  ├─ hero-bg.svg              # Techy hero background
│  └─ favicon.svg              # Favicon (add your own)
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
- The form POSTs to `/api/submit-request`. Ensure SendGrid API key is valid.
- For local testing without SendGrid, you can mock the API response in the function.
