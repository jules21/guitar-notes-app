# 🎸 Guitar Notes — Dynamic Blog

A React + Vite blog for your guitar class notes.
Add lessons through a WYSIWYG editor — no copy-pasting, no file templates.

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 — that's it.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx       ← Reusable nav, auto-populates from posts
│   ├── PostCard.jsx      ← Card used on homepage list
│   ├── Editor.jsx        ← WYSIWYG editor (TipTap)
│   └── PostModal.jsx     ← Create / Edit modal
├── pages/
│   ├── Home.jsx          ← Homepage (hero + post list)
│   └── PostPage.jsx      ← Single lesson page
├── hooks/
│   └── useLocalPosts.js  ← Post state + localStorage persistence
├── data/
│   └── posts.js          ← Seed content (your 5 existing lessons)
└── styles/
    └── globals.css       ← CSS variables + base styles
```

---

## ✏️ Adding a New Lesson

1. Click "New Lesson" in the sidebar
2. Fill in part number, title, description, tags
3. Write your notes in the WYSIWYG editor
4. Click "Create lesson"

Done — appears on homepage and sidebar immediately.
Posts are saved in localStorage and persist between sessions.

---

## 🌐 Deploying to Netlify (Free)

### First deploy
1. Run: npm run build
2. Go to netlify.com → sign up free
3. "Add new site" → "Deploy manually"
4. Drag the dist/ folder onto the deploy box
5. Live at random-words.netlify.app

### Auto-deploy with GitHub (recommended)
1. Push project to GitHub
2. Netlify → "Add new site → Import from Git"
3. Build command: npm run build
4. Publish directory: dist
5. Every git push auto-deploys ⚡

---

## ⚠️ Making Posts Permanent

Posts are currently in localStorage (same device only).
To make them permanent across devices, options are:

- Export posts.js button → commit to Git → redeploy (simplest)
- Supabase free tier (real database, free 500MB)
- Netlify CMS (Git-based admin UI, fully free)
