# Wayfare — AI Travel Planner

A production-ready Next.js (App Router) app that generates a full day-by-day travel
itinerary using the Gemini API, based on destination, trip length, budget, and interests.

## File tree

```
ai-travel-planner/
├── app/
│   ├── api/
│   │   └── generate-itinerary/
│   │       └── route.ts        # Backend API route — calls Gemini securely
│   ├── globals.css             # Tailwind + design tokens (skeleton shimmer, stamp edge, etc.)
│   ├── layout.tsx              # Root layout, fonts, metadata
│   └── page.tsx                # Main page: form, loading, error, results
├── components/
│   ├── TravelForm.tsx          # Destination / days / budget / interests form
│   ├── LoadingSkeleton.tsx     # Skeleton shown while Gemini generates the plan
│   └── ItineraryDisplay.tsx    # Day-by-day itinerary UI
├── lib/
│   ├── gemini.ts               # Prompt builder + JSON response schema for Gemini
│   └── types.ts                # Shared TypeScript types
├── .env.local.example          # Template for your local env file
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 1. Install dependencies

```bash
npm install
```

## 2. Set up your environment variable

Get a free Gemini API key from **https://aistudio.google.com/apikey**, then:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste your key:

```
GEMINI_API_KEY=your_actual_key_here
```

`.env.local` is already listed in `.gitignore`, so it will never be committed. The key is
only ever read on the server inside `app/api/generate-itinerary/route.ts` — it is never
sent to the browser.

## 3. Run it locally

```bash
npm run dev
```

Open **http://localhost:3000**.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AI travel planner"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 5. Deploy on Vercel

1. Go to **https://vercel.com/new** and import the GitHub repo you just pushed.
2. Vercel auto-detects Next.js — leave the build settings as default.
3. Before deploying, open **Settings → Environment Variables** (or the prompt during
   import) and add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
   - **Environments:** Production, Preview, and Development
4. Click **Deploy**. On future pushes to `main`, Vercel redeploys automatically.

If you add or change the env var after the first deploy, redeploy from the Vercel
dashboard (**Deployments → ⋯ → Redeploy**) so the new value takes effect.

## Notes

- The API route validates all inputs (empty destination, out-of-range days, invalid
  budget) and returns a `400` with a clear message before ever calling Gemini.
- If Gemini returns malformed data or the request fails, the route returns a `502` with
  a human-readable error, which the UI surfaces in an inline error banner.
- `config.responseSchema` constrains Gemini to return itinerary JSON that matches
  `lib/types.ts` exactly, so the UI never has to guess at the shape of the response.
