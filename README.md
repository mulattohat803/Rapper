# 🎵 Album / Mixtape Site Template

A zero-dependency, GitHub Pages–ready website template for music artists.  
One config file. Any genre. Any streaming platform.

---

## File Structure

```
album-site/
├── index.html          ← Never touch this
├── app.js              ← Never touch this
├── config.js           ← ✅ THE ONLY FILE YOU EDIT PER ARTIST
├── assets/
│   ├── cover.jpg       ← Album/mixtape cover art (square, min 600x600)
│   └── banner.jpg      ← Optional hero background (landscape, min 1400px wide)
└── audio/
    ├── 01-track.mp3    ← Local audio files (optional)
    └── ...
```

---

## Quick Start — New Artist in 5 Minutes

1. **Fork / copy** this repo to a new GitHub repo, e.g. `artist-name-mixtape`
2. **Edit `config.js`** — fill in artist name, project title, tracks, streaming links
3. **Drop assets** — add `assets/cover.jpg` (required) and `assets/banner.jpg` (optional)
4. **Add audio** — drop MP3s in `/audio/` and reference them in `config.js` track `src` fields  
   *(Skip this if tracks are streaming-only — just set `src: null`)*
5. **Enable GitHub Pages** — Settings → Pages → Deploy from `main` branch root

That's it. Live in ~60 seconds after push.

---

## config.js Reference

### Basic Info
```js
artistName:    "LYRIC COLE",       // Artist display name
projectTitle:  "MIDNIGHT FREQ",    // Album/mixtape title  
projectType:   "MIXTAPE",          // "ALBUM" | "MIXTAPE" | "EP" | "SINGLE"
releaseYear:   "2024",
genre:         "Hip-Hop / R&B",
description:   "Short bio / project description shown in hero",
```

### Theme
Change these 7 values to match an artist's brand colors and fonts:
```js
theme: {
  accent:      "#FF6B35",        // Buttons, highlights, active track indicator
  accentGlow:  "#FF6B3540",      // Transparent version of accent (overlays)
  bg:          "#0A0A0A",        // Page background
  bgCard:      "#111111",        // Card/panel backgrounds
  bgCardHover: "#1A1A1A",        // Hover state
  textPrimary: "#F5F5F0",        // Body text
  textMuted:   "#888882",        // Secondary/label text
  font:        "'Space Grotesk', sans-serif",  // Body font (Google Fonts)
  fontDisplay: "'Bebas Neue', cursive",        // Display/title font (Google Fonts)
},
```

**Finding Google Fonts:** Browse at fonts.google.com. Copy the font name exactly.  
Example fonts by genre:
- Hip-Hop:     `'Bebas Neue'` display + `'Space Grotesk'` body
- R&B/Soul:    `'Playfair Display'` display + `'DM Sans'` body  
- Electronic:  `'Orbitron'` display + `'Rajdhani'` body
- Rock:        `'Black Han Sans'` display + `'Barlow'` body
- Pop:         `'Syne'` display + `'Plus Jakarta Sans'` body

### Streaming Platforms
Set any platform URL. Set to `null` to hide the button:
```js
streaming: {
  spotify:     "https://open.spotify.com/album/...",
  appleMusic:  "https://music.apple.com/album/...",
  youtube:     "https://youtube.com/playlist?list=...",
  soundcloud:  "https://soundcloud.com/.../sets/...",
  tidal:       null,      // hidden
  amazonMusic: null,      // hidden
  deezer:      null,      // hidden
}
```

### Tracks
Three modes per track:

**1. Local MP3 (hosted directly)**
```js
{
  number:   1,
  title:    "TRACK NAME",
  duration: "3:28",
  feat:     null,              // or "Artist Name"
  src:      "audio/01-track.mp3",   // plays in the built-in player
  explicit: true,
  streaming: { spotify: null, youtube: null }
}
```

**2. Streaming only (no local audio)**
```js
{
  number:   2,
  title:    "STREAMING ONLY TRACK",
  duration: "4:02",
  feat:     null,
  src:      null,              // no local file — player won't activate
  explicit: false,
  streaming: {
    spotify: "https://open.spotify.com/track/TRACK_ID",
    youtube: "https://youtube.com/watch?v=VIDEO_ID",
  }
}
```

**3. Override global streaming links per-track**
If a track has a different Spotify URL than the album, override it:
```js
streaming: {
  spotify: "https://open.spotify.com/track/SPECIFIC_TRACK_ID",
  youtube: null,   // explicitly hide YouTube for this track
}
```

---

## Audio Hosting Options

| Method | How | Best For |
|--------|-----|----------|
| **GitHub repo** | Put MP3s in `/audio/`, push to repo | Small projects, demos (100MB repo limit) |
| **GitHub Releases** | Upload MP3s as release assets, use raw URL | Larger files, keeps repo clean |
| **CDN (Cloudflare R2, S3, Backblaze B2)** | Upload files, use public URL in `src` | Professional, scalable |
| **SoundCloud** | Link tracks in streaming instead of src | Easy, no storage concerns |

For CDN: just put the full URL in `src`:
```js
src: "https://your-cdn.com/artist/track01.mp3"
```

---

## Multi-Artist Setup (Agency Workflow)

If you're managing sites for multiple artists, keep one repo per artist  
or use a monorepo with subdirectories:

```
music-sites/
├── lyric-cole/
│   ├── config.js
│   ├── index.html    ← symlink or copy from template
│   ├── app.js        ← symlink or copy from template
│   └── assets/
├── artist-two/
│   └── ...
```

GitHub Pages can serve from subdirectories, or use separate repos with  
`<username>.github.io/<repo-name>` URLs.

---

## Customization Beyond Config

For deeper customization (custom page sections, video embeds, merch store links, etc.),  
edit `index.html` to add new sections, then wire them in `app.js`.

The config system is intentionally simple. For complex needs, extend it by:
1. Adding new fields to `ARTIST_CONFIG` in `config.js`
2. Reading those fields in `app.js` to render new UI

---

## Browser Support
Chrome, Firefox, Safari, Edge — all modern browsers.  
Audio playback requires MP3 support (universal) or an MP3-compatible format.
