# Xander35 — Dynamic Torn Signature

A Vercel serverless function that generates a live PNG signature showing your real-time Torn City online status and level.

## Deploy to Vercel

### Step 1 — Upload to GitHub
1. Go to [github.com](https://github.com) → **New repository**
2. Name it `xander35-torn-sig` → Create
3. Upload all 3 files: `api/sig.js`, `package.json`, `vercel.json`

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Click **Deploy** (default settings are fine)

### Step 3 — Add your API Key (secret!)
1. In Vercel → your project → **Settings → Environment Variables**
2. Add:
   - **Name:** `TORN_API_KEY`
   - **Value:** *(your Torn read-only API key)*
3. Click **Save** → then go to **Deployments → Redeploy**

### Step 4 — Get your image URL
Your signature will be live at:
```
https://YOUR-PROJECT-NAME.vercel.app/sig
```

### Step 5 — Add to Torn Profile
1. Torn → **Settings → Preferences → Profile Signature**
2. Click the **A** button (rich text editor)
3. Click the **image icon**
4. Paste your Vercel URL
5. Save ✅

## What updates live
- ✅ Online / Idle / Offline status (dot color changes)
- ✅ Player level
- ✅ Player name
