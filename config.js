/**
 * ============================================================
 *  ARTIST CONFIG — Edit this file to set up a new artist
 * ============================================================
 *
 *  QUICK START:
 *  1. Fill in artist info below
 *  2. Drop album art as "assets/cover.jpg"
 *  3. Drop background/banner as "assets/banner.jpg" (optional)
 *  4. Add tracks to the TRACKS array
 *  5. Push to GitHub Pages — done!
 * ============================================================
 */

const ARTIST_CONFIG = {

  // ── Basic Info ─────────────────────────────────────────────
  artistName:    "LYRIC COLE",
  projectTitle:  "MIDNIGHT FREQUENCIES",
  projectType:   "MIXTAPE",          // "ALBUM" | "MIXTAPE" | "EP" | "SINGLE"
  releaseYear:   "2024",
  genre:         "Hip-Hop / R&B",
  description:   "A raw, introspective journey through late nights and city lights. 14 tracks straight from the soul.",

  // ── Theme / Colors ─────────────────────────────────────────
  // Change these to match your artist's brand
  theme: {
    accent:      "#FF6B35",   // Primary accent color (buttons, highlights)
    accentGlow:  "#FF6B3540", // Accent with transparency (glows, overlays)
    bg:          "#0A0A0A",   // Page background
    bgCard:      "#111111",   // Card/panel background
    bgCardHover: "#1A1A1A",   // Card hover state
    textPrimary: "#F5F5F0",   // Main text
    textMuted:   "#888882",   // Secondary/muted text
    font:        "'Space Grotesk', sans-serif",  // Google Font name
    fontDisplay: "'Bebas Neue', cursive",        // Display/heading font
  },

  // ── Cover Art ──────────────────────────────────────────────
  coverArt:      "assets/cover.jpg",    // Local path OR full URL
  bannerBg:      "assets/banner.jpg",   // Used as blurred hero background (optional, falls back to cover)

  // ── Streaming Links ────────────────────────────────────────
  // Set to null to hide a platform button
  streaming: {
    spotify:     "https://open.spotify.com/album/YOUR_ALBUM_ID",
    appleMusic:  "https://music.apple.com/album/YOUR_ALBUM_ID",
    youtube:     "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID",
    soundcloud:  "https://soundcloud.com/YOUR_ARTIST/sets/YOUR_SET",
    tidal:       null,
    amazonMusic: null,
    deezer:      null,
  },

  // ── Social Links ───────────────────────────────────────────
  social: {
    instagram:   "https://instagram.com/YOUR_HANDLE",
    twitter:     "https://twitter.com/YOUR_HANDLE",
    tiktok:      null,
    website:     null,
  },

  // ── Tracks ─────────────────────────────────────────────────
  // Each track needs at minimum: title
  // For audio: set `src` to a local path or URL to an MP3
  // For streaming only: leave `src` as null and set platform links
  tracks: [
    {
      number:   1,
      title:    "INTRO (CITY PULSE)",
      duration: "1:42",
      feat:     null,
      src:      "audio/01-intro.mp3",     // local MP3 (set null if streaming only)
      explicit: false,
      streaming: {
        spotify:    null,    // override global per-track if needed
        youtube:    "https://youtube.com/watch?v=TRACK_VIDEO_ID",
      }
    },
    {
      number:   2,
      title:    "NEON SAINTS",
      duration: "3:28",
      feat:     null,
      src:      "audio/02-neon-saints.mp3",
      explicit: true,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   3,
      title:    "PAPER CROWN",
      duration: "2:55",
      feat:     "Verse Cole",
      src:      null,   // streaming only — no local file
      explicit: false,
      streaming: {
        spotify: "https://open.spotify.com/track/SPECIFIC_TRACK_ID",
        youtube: "https://youtube.com/watch?v=ANOTHER_ID",
      }
    },
    {
      number:   4,
      title:    "3AM IN DECEMBER",
      duration: "3:47",
      feat:     null,
      src:      "audio/04-3am.mp3",
      explicit: true,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   5,
      title:    "WAVELENGTH",
      duration: "4:02",
      feat:     "Mira Sol",
      src:      "audio/05-wavelength.mp3",
      explicit: false,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   6,
      title:    "BURN SLOW",
      duration: "3:19",
      feat:     null,
      src:      "audio/06-burn-slow.mp3",
      explicit: true,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   7,
      title:    "INTERLUDE",
      duration: "0:58",
      feat:     null,
      src:      "audio/07-interlude.mp3",
      explicit: false,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   8,
      title:    "FREQUENCY CHECK",
      duration: "3:33",
      feat:     null,
      src:      "audio/08-frequency-check.mp3",
      explicit: false,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   9,
      title:    "GOLD TEETH GOSPEL",
      duration: "4:11",
      feat:     "DC Melo",
      src:      "audio/09-gold-teeth.mp3",
      explicit: true,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   10,
      title:    "ECHO CHAMBER",
      duration: "3:05",
      feat:     null,
      src:      null,
      explicit: false,
      streaming: {
        spotify: "https://open.spotify.com/track/ECHO_TRACK_ID",
        youtube: null,
      }
    },
    {
      number:   11,
      title:    "LATE NIGHT GOSPEL",
      duration: "3:52",
      feat:     null,
      src:      "audio/11-late-night.mp3",
      explicit: false,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   12,
      title:    "RED LIGHT DISTRICT",
      duration: "3:27",
      feat:     "Kareem J",
      src:      "audio/12-red-light.mp3",
      explicit: true,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   13,
      title:    "GHOST FREQUENCIES",
      duration: "4:30",
      feat:     null,
      src:      "audio/13-ghost-freq.mp3",
      explicit: false,
      streaming: { spotify: null, youtube: null }
    },
    {
      number:   14,
      title:    "OUTRO (SUNRISE)",
      duration: "2:18",
      feat:     null,
      src:      "audio/14-outro.mp3",
      explicit: false,
      streaming: { spotify: null, youtube: null }
    },
  ],

  // ── Credits (optional) ─────────────────────────────────────
  credits: [
    { role: "Executive Producer",  name: "Lyric Cole" },
    { role: "Mixed & Mastered by", name: "Studio 7 Audio" },
    { role: "Cover Art",           name: "Visual by DXN" },
    { role: "Recorded at",         name: "Compound Studios, Atlanta GA" },
  ],

  // ── Footer ─────────────────────────────────────────────────
  footerText: "© 2024 Lyric Cole. All rights reserved.",

};
