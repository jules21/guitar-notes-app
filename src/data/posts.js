// src/data/posts.js
// ─────────────────────────────────────────────
// This is your "database". Each object is one lesson post.
// Add a new post here and it appears on the site automatically.
// ─────────────────────────────────────────────

export const POSTS = [
  {
    id: "part-1-genesis",
    part: 1,
    title: "Genesis — The Basics",
    description: "What is music? Parts of the acoustic guitar, the 6 strings, notes vs chords.",
    date: "Feb 9, 2026",
    tags: ["Fundamentals"],
    content: `<h2>🎵 Umuziki ni iki? — What is Music?</h2>
<p><strong>Definition:</strong> Umuziki ni uruhurirane cg urusobe rw'amajwi rukoze muburyo bunogeye amatwi ndetse n'umutima.</p>
<p><em>Music is a harmonious collection of sounds arranged in a way pleasing to both ears and heart.</em></p>
<blockquote><strong>⚠️ Noise ≠ Music.</strong> Noise = unwanted signal. When sounds clash unpleasantly, that's noise.</blockquote>

<h2>🎸 Parts of the Acoustic Guitar</h2>
<p>Body · Soundhole · Rosette · Bridge · Neck/Fretboard · Frets · Headstock · Tuning Keys</p>

<h2>🎸 The 6 Strings — Imirya itandatu</h2>
<p>String positions: <strong>E A D G B E</strong> (thick → thin, string 6 → string 1)</p>
<ul>
  <li><strong>1 — E (Mi)</strong> — thinnest, at the bottom when holding</li>
  <li><strong>2 — B (Si)</strong></li>
  <li><strong>3 — G (Sol)</strong></li>
  <li><strong>4 — D (Ré)</strong></li>
  <li><strong>5 — A (La)</strong></li>
  <li><strong>6 — E (Mi)</strong> — thickest</li>
</ul>
<blockquote>💡 String 1 (thinnest) is at the bottom when holding the guitar. Use technical terms — vuga nk'umucuranzi!</blockquote>

<h2>🎶 Note vs. Chord</h2>
<ul>
  <li><strong>Note:</strong> Single sound / ijwi rimwe. Pressing one string = one note.</li>
  <li><strong>Chord:</strong> 2 or more notes played together. Igizwe n'amanota abiri kuzamura.</li>
</ul>`
  },
  {
    id: "part-2-continuity",
    part: 2,
    title: "Continuity — Notes & Chords",
    description: "Full chromatic scale, octaves, sharps & flats, the fretboard map.",
    date: "Feb 9, 2026",
    tags: ["Theory"],
    content: `<h2>🔡 Chromatic Scale — Amanota yose</h2>
<p>E (Mi) and B (Si) have <strong>NO sharp!</strong></p>
<p>Full scale: C · C# · D · D# · E · F · F# · G · G# · A · A# · B · C</p>
<blockquote>📌 When going backwards, sharps become flats (bémols). Sharp = add half-step. Flat = remove half-step.</blockquote>

<h2>Key Terms</h2>
<ul>
  <li><strong>Octave / Urunani:</strong> 8 notes: Do Re Mi Fa Sol La Si Do — first and last sound the same at a different pitch.</li>
  <li><strong>Sharp / Dièse ♯:</strong> Note raised by a half-step. Inota ryongeweho igice cyaryo.</li>
  <li><strong>Flat / Bémol ♭:</strong> Note lowered by a half-step. Inota rigavanyijweho igice cyaryo.</li>
  <li><strong>Game / Keynote:</strong> Root note and its companions in a key. Inota shingiro ndetse n'ayiherekeza.</li>
</ul>`
  },
  {
    id: "part-3-fingers",
    part: 3,
    title: "Stretch Your Fingers",
    description: "Left & right hand finger names, fingerstyle technique, positioning.",
    date: "Feb 9, 2026",
    tags: ["Technique"],
    content: `<h2>✋ Finger Names — Getting Started</h2>
<p><strong>Left hand (chord hand):</strong> 1=Index · 2=Middle · 3=Ring · 4=Pinky</p>
<p><strong>Right hand (picking hand):</strong> p=Thumb · i=Index · m=Middle · a=Ring · c=Pinky</p>

<blockquote>🎯 Each finger in its proper position produces sweet, clean sound. Utu tuntu nukutwitondera — the small details matter!</blockquote>

<h2>🎸 Guitar is Played with Both Hands (L + R)</h2>
<ul>
  <li><strong>Left Hand:</strong> Chord hand — presses strings on the fretboard. Fingers numbered 1–4 (index to pinky).</li>
  <li><strong>Right Hand:</strong> Strumming / picking hand. p=thumb, i=index, m=middle, a=ring, c=pinky.</li>
</ul>

<blockquote>🌟 Utu tuntu nukutwitondera nubwo mubona twadutinzeho niho hava sweetness of music. Paying attention to small details is where the sweetness of music is born.</blockquote>`
  },
  {
    id: "part-4-theory",
    part: 4,
    title: "Pre-Practice Theory",
    description: "Numbering system, C Major scale, Major / minor / Diminished chord formula.",
    date: "Feb 9, 2026",
    tags: ["Theory"],
    content: `<h2>🔢 The Chord Formula — C Major / Do Majeur</h2>
<p>The numbering system (1–7) tells you which chord type to use for each position in any key.</p>
<ul>
  <li><strong>1 → C — Major</strong></li>
  <li><strong>2 → D — minor</strong></li>
  <li><strong>3 → E — minor</strong></li>
  <li><strong>4 → F — Major</strong></li>
  <li><strong>5 → G — Major</strong></li>
  <li><strong>6 → A — minor</strong></li>
  <li><strong>7 → B — Diminished°</strong></li>
</ul>

<h2>🎯 C Major Scale — Do Majeur</h2>
<p>C → D → E → F → G → A → B → C (1 through 8)</p>
<ul>
  <li>Major: positions 1 (C), 4 (F), 5 (G)</li>
  <li>minor: positions 2 (D), 3 (E), 6 (A)</li>
  <li>Diminished°: position 7 (B)</li>
</ul>

<h2>📖 Chord Types Explained</h2>
<ul>
  <li><strong>Major:</strong> Full, bright sound. Used at positions 1, 4, 5.</li>
  <li><strong>Minor:</strong> Slightly darker/softer. Used at positions 2, 3, 6.</li>
  <li><strong>Diminished°:</strong> Tense, emotional sound. Resolves back to 1. Used only at position 7.</li>
</ul>

<blockquote>🙏 Imusic iri spiritual cyane kurusha uko yumvwa. The spirit behind the music matters deeply.</blockquote>`
  },
  {
    id: "part-5-chords",
    part: 5,
    title: "Basic Chords — Practice",
    description: "Chord diagrams for A C D E F G, muted strings, practice reminders.",
    date: "Feb 9, 2026",
    tags: ["Practice"],
    content: `<h2>🎸 Chord Diagrams — A C D E F G</h2>
<p>Practice these open chords in order: <strong>A — C — D — E — F — G</strong></p>
<ul>
  <li>✗ = muted string (do NOT play)</li>
  <li>○ = open string (play without fretting)</li>
  <li>Numbers inside dots = which finger to use (1=index, 2=middle, 3=ring, 4=pinky)</li>
</ul>

<blockquote>❌ Where you see ✗, do NOT play that string. Every string you DO play must ring clearly!</blockquote>

<h2>🌟 Key Reminders</h2>
<ul>
  <li><strong>Music is spiritual</strong> — Imusic iri spiritual cyane kurusha uko yumvwa.</li>
  <li><strong>Use technical terms</strong> — Vuga nk'umucuranzi. "String 1 / E string" not informal names.</li>
  <li><strong>Small details = sweetness</strong> — Utu tuntu nukutwitondera.</li>
</ul>`
  }
];

// ─────────────────────────────────────────────
// HELPER — get all posts sorted by part number
export function getAllPosts() {
  return [...POSTS].sort((a, b) => a.part - b.part);
}

// HELPER — get one post by id
export function getPost(id) {
  return POSTS.find(p => p.id === id) || null;
}

// HELPER — get prev / next
export function getAdjacentPosts(id) {
  const sorted = getAllPosts();
  const idx = sorted.findIndex(p => p.id === id);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
