# NEXURA LABS — High-Conversion Digital Systems & Central Demo Hub

**NEXURA LABS** is a futuristic, conversion-focused web engineering agency and multi-demo platform founded by Afiq Amri.

Instead of paying for separate domains and hosting accounts for every prospect, **NEXURA LABS** serves as your central agency headquarters (`/`) while hosting unlimited live client prototypes under `/demo/[client-name]`.

---

## 🏛️ System Architecture & Folder Structure

```
Nexura_Labs/
├── package.json               # Project manifest & dev scripts ("nexura-labs")
├── index.html                 # NEXURA LABS Main Agency Website (Root /)
├── assets/
│   ├── css/
│   │   └── futuristic.css     # Cyber-luxe black styling, HUD cards, neon glow utilities
│   └── js/
│       └── agency.js          # Interactive particle canvas, terminal simulation, project estimator
│
├── demo/                      # Central Client Demo Directory
│   └── maymorii/              # First Live Client Prototype: Maymorii Studio
│       ├── index.html         # Maymorii Studio landing page (/demo/maymorii/)
│       ├── css/style.css      # Editorial luxury photography styling
│       └── js/main.js         # Lightbox, review submission form, WhatsApp builder
│
└── README.md                  # System documentation & deployment guide
```

---

## ⚡ The NEXURA Sales Workflow (The "Demo-First" Model)

```
Prospect Discovery (Google Maps)
               │
               ▼
Rapid Prototype Deployment (24–48 Hours)
Hosted at: nexuralabs.com/demo/[business-name]
               │
               ▼
Outreach to Business Owner:
"I noticed you don't have a website, so I built a quick concept specifically for your business:
nexuralabs.com/demo/[business-name]"
               │
               ▼
Client Review & WOW Factor
               │
               ▼
50% Deposit Paid ➔ Final Website Migrated to Client's Domain
               │
               ▼
Monthly Maintenance (RM 99/month)
```

---

## 🚀 How to Add a New Client Demo in 10 Minutes

When you want to create a new demo for a cafe, barber, or workshop:

1. Create a new folder under `demo/`:
   ```bash
   demo/abc-barber/
   ├── index.html
   ├── css/style.css
   └── js/main.js
   ```
2. Customize the copy, colors, and WhatsApp link for that business.
3. It automatically becomes available at:
   `https://nexuralabs.com/demo/abc-barber`
4. Add the card to the **Client Demo Hub** on the main NEXURA LABS page (`index.html`).

---

## 💻 Running & Hosting Locally

### Option 1: Using npm
```bash
# Start local server
npm run dev

# Or with python
python -m http.server 8088
```
Visit:
- Main Agency Site: `http://localhost:8088/`
- Maymorii Studio Demo: `http://localhost:8088/demo/maymorii/`

### Option 2: Deploying to the Web for Free
You can deploy this entire repository to **Vercel**, **Netlify**, or **Cloudflare Pages** in 60 seconds with **Zero Cost**:
1. Push this folder to a GitHub repository named `nexura-labs`.
2. Connect the repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Set build settings to **Static HTML** (no build command needed).
4. Connect your custom domain (e.g., `nexuralabs.com`).
5. Your main site will be at `nexuralabs.com` and your demos will be live at `nexuralabs.com/demo/maymorii`!
