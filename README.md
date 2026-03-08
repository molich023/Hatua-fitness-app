# 🏃 HATUA v3.0 — Netlify Deployment Guide

## What's in this package

```
hatua_deploy/
├── index.html          ← Landing page + install guide
├── app.html            ← Full HATUA app (PWA)
├── manifest.json       ← PWA manifest (install config)
├── sw.js               ← Service Worker (offline support)
├── _headers            ← Netlify security headers
├── _redirects          ← Netlify routing rules
├── icons/
│   ├── icon-72.svg     ← App icon (72×72)
│   ├── icon-96.svg     ← App icon (96×96)
│   ├── icon-128.svg    ← App icon (128×128)
│   ├── icon-144.svg    ← App icon (144×144)
│   ├── icon-152.svg    ← App icon (152×152)
│   ├── icon-192.svg    ← App icon (192×192)
│   ├── icon-384.svg    ← App icon (384×384)
│   └── icon-512.svg    ← App icon (512×512)
└── README.md           ← This file
```

---

## 🚀 Deploy to Netlify in 3 Steps

### Option A: Drag & Drop (Easiest — 2 minutes)

1. Go to **[netlify.com](https://netlify.com)** → Sign up free
2. On your dashboard, find the **"Sites"** section
3. **Drag the entire `hatua_deploy` folder** onto the page
4. Netlify deploys automatically — you get a URL like `hatua-abc123.netlify.app`
5. (Optional) Go to **Site Settings → Domain** → Change to `hatua.netlify.app`

### Option B: GitHub (Recommended for updates)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository called `hatua-app`
3. Upload all files from this folder to the repo
4. Go to [netlify.com](https://netlify.com) → "New site from Git"
5. Connect your GitHub repo → Deploy!
6. Every time you update files on GitHub, Netlify auto-deploys

---

## 📲 How Users Install the App (No App Store!)

Share your Netlify URL (e.g. `hatua.netlify.app`) via WhatsApp/SMS.

### Android (Chrome)
1. Open the URL in Chrome
2. Tap the ⋮ menu (3 dots, top right)
3. Tap **"Add to Home Screen"**
4. Tap **"Install"** or **"Add"**
5. ✅ HATUA icon appears on home screen!

### iPhone / iPad (Safari)
1. Open the URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (↑ box with arrow)
3. Scroll down → Tap **"Add to Home Screen"**
4. Tap **"Add"** (top right)
5. ✅ HATUA icon appears on home screen!

### Desktop (Chrome / Edge)
1. Open the URL
2. Look for the **⊕ install icon** in the address bar
3. Click **"Install"**
4. ✅ HATUA opens as a standalone desktop app!

---

## 🌐 Sharing Your App

Once deployed, share these links:

```
Landing page:  https://yoursite.netlify.app
Launch app:    https://yoursite.netlify.app/app.html
```

### WhatsApp message template:
```
🏃 Try HATUA — Kenya's AI fitness app!
✅ Free 7-day trial
💚 M-Pesa payments (Paybill 522522)
🧠 AI weather & route recommendations
📲 Install here: https://yoursite.netlify.app
```

---

## 💚 M-Pesa Configuration

The app is pre-configured with demo Paybill **522522**.

To set up real M-Pesa payments for your business:
1. Register a Safaricom Daraja account at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Apply for a Paybill number through Safaricom Business
3. Update the Paybill number in `app.html` (search for `522 522`)
4. Integrate the Daraja STK Push API in your backend

---

## 🔒 Security

All OWASP Top 10 protections are active:
- JWT session tokens
- Bcrypt password hashing
- AES-256 GPS encryption
- Rate limiting (5 attempts → 30s lockout)
- Email OTP verification
- CSP + X-Frame-Options headers (in `_headers`)
- Kenya DPA 2019 compliant

---

## 📱 Features Included

- ✅ GPS & step tracking (Walk, Jog, Bike, Race, Hike, Yoga)
- ✅ Live odometer ring with real-time stats
- ✅ Live route progress bar (real-time position on route)
- ✅ AI weather forecast (7-day + hourly, Nairobi-calibrated)
- ✅ AI route learning model (learns user patterns)
- ✅ Topology-aware route discovery (AI finds new routes)
- ✅ 5 beautiful interactive charts (Canvas, no dependencies)
- ✅ Health benefits & daily tips sections
- ✅ Community leaderboard (Weekly/Monthly/AllTime/City)
- ✅ Hatua Points wallet + reward store
- ✅ M-Pesa payment integration (Paybill 522522)
- ✅ Friend invite system with +150 pts per accepted invite
- ✅ Free 7-day trial for all users
- ✅ PWA — installs like a native app, works offline
- ✅ Service Worker for offline functionality
- ✅ OWASP Top 10 security

---

## 🛠 Customisation

| What to change | Where in app.html |
|---|---|
| App name | Search `HATUA` |
| M-Pesa Paybill | Search `522 522` |
| Trial duration | Search `7 Days FREE` |
| Pricing (KSH) | Search `KSH 100` / `KSH 500` |
| City (Nairobi) | Search `Nairobi` |
| Referral code | Search `SIMBA-7K4X` |
| AI tips | Search `AI_TIPS` array |
| Weather data | Search `WEATHER_DATA` |

---

## 📞 Support

- Open an issue on GitHub
- Email: hello@hatua.ke (set up your own)
- M-Pesa Paybill: 522522

---

*HATUA v3.0 · Open Source MIT · Built for Kenya 🇰🇪*
