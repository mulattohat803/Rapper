/**
 * ============================================================
 *  ARTIST CONFIG — Edit this file to set up a new artist
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
  theme: {
    accent:      "#FF6B35",
    accentGlow:  "#FF6B3540",
    bg:          "#0A0A0A",
    bgCard:      "#111111",
    bgCardHover: "#1A1A1A",
    textPrimary: "#F5F5F0",
    textMuted:   "#888882",
    font:        "'Space Grotesk', sans-serif",
    fontDisplay: "'Bebas Neue', cursive",
  },

  // ── Cover Art ──────────────────────────────────────────────
  coverArt:  "assets/cover.jpg",
  bannerBg:  "assets/banner.jpg",   // optional; falls back to coverArt

  // ── Streaming Links ────────────────────────────────────────
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

  // ── Pre-Save / Countdown Mode ──────────────────────────────
  // Remove or set releaseDate to null to hide the banner.
  // releaseDate accepts any valid JS Date string (ISO 8601 recommended).
  presave: {
    releaseDate: null,               // e.g. "2025-06-21T00:00:00-05:00"
    presaveLinks: {
      spotify:    null,              // Spotify pre-save campaign URL
      appleMusic: null,              // Apple Music pre-add URL
    },
  },

  // ── Discography ────────────────────────────────────────────
  // Powers the /discography.html page. Add one entry per release.
  // Set to [] or remove to hide the Discography nav link.
  discography: [
    {
      title:      "MIDNIGHT FREQUENCIES",
      type:       "MIXTAPE",
      year:       "2024",
      cover:      "assets/cover.jpg",
      url:        "index.html",            // links to this same site
      isActive:   true,                    // highlight as current
    },
    {
      title:      "CITY NIGHTS VOL. 1",
      type:       "EP",
      year:       "2023",
      cover:      "assets/city-nights.jpg",
      url:        "../city-nights/index.html",
      isActive:   false,
    },
    {
      title:      "RAW SESSIONS",
      type:       "MIXTAPE",
      year:       "2022",
      cover:      "assets/raw-sessions.jpg",
      url:        "../raw-sessions/index.html",
      isActive:   false,
    },
  ],

  // ── Tracks ─────────────────────────────────────────────────
  // src:      local mp3 path — set null for streaming-only tracks
  // streaming: per-track overrides (null removes a platform for this track)
  tracks: [
    {
      number: 1, title: "INTRO (CITY PULSE)", duration: "1:42",
      feat: null, src: "audio/01-intro.mp3", explicit: false,
      streaming: { youtube: "https://youtube.com/watch?v=TRACK_VIDEO_ID" }
    },
    {
      number: 2, title: "NEON SAINTS", duration: "3:28",
      feat: null, src: "audio/02-neon-saints.mp3", explicit: true,
      streaming: { youtube: "https://youtube.com/watch?v=NEON_SAINTS_ID" }
    },
    {
      number: 3, title: "PAPER CROWN", duration: "2:55",
      feat: "Verse Cole", src: null, explicit: false,
      streaming: {
        spotify:    "https://open.spotify.com/track/PAPER_CROWN_ID",
        soundcloud: "https://soundcloud.com/YOUR_ARTIST/paper-crown",
        youtube:    "https://youtube.com/watch?v=PAPER_CROWN_YT",
      }
    },
    {
      number: 4, title: "3AM IN DECEMBER", duration: "3:47",
      feat: null, src: "audio/04-3am.mp3", explicit: true,
      streaming: { youtube: null }
    },
    {
      number: 5, title: "WAVELENGTH", duration: "4:02",
      feat: "Mira Sol", src: "audio/05-wavelength.mp3", explicit: false,
      streaming: { youtube: "https://youtube.com/watch?v=WAVELENGTH_ID" }
    },
    {
      number: 6, title: "BURN SLOW", duration: "3:19",
      feat: null, src: "audio/06-burn-slow.mp3", explicit: true,
      streaming: { youtube: "https://youtube.com/watch?v=BURN_SLOW_ID" }
    },
    {
      number: 7, title: "INTERLUDE", duration: "0:58",
      feat: null, src: "audio/07-interlude.mp3", explicit: false,
      streaming: {}
    },
    {
      number: 8, title: "FREQUENCY CHECK", duration: "3:33",
      feat: null, src: "audio/08-frequency-check.mp3", explicit: false,
      streaming: { youtube: "https://youtube.com/watch?v=FREQ_CHECK_ID" }
    },
    {
      number: 9, title: "GOLD TEETH GOSPEL", duration: "4:11",
      feat: "DC Melo", src: "audio/09-gold-teeth.mp3", explicit: true,
      streaming: {
        youtube:    "https://youtube.com/watch?v=GOLD_TEETH_ID",
        soundcloud: "https://soundcloud.com/YOUR_ARTIST/gold-teeth-gospel",
      }
    },
    {
      number: 10, title: "ECHO CHAMBER", duration: "3:05",
      feat: null, src: null, explicit: false,
      streaming: {
        spotify:    "https://open.spotify.com/track/ECHO_CHAMBER_ID",
        soundcloud: "https://soundcloud.com/YOUR_ARTIST/echo-chamber",
      }
    },
    {
      number: 11, title: "LATE NIGHT GOSPEL", duration: "3:52",
      feat: null, src: "audio/11-late-night.mp3", explicit: false,
      streaming: { youtube: "https://youtube.com/watch?v=LATE_NIGHT_ID" }
    },
    {
      number: 12, title: "RED LIGHT DISTRICT", duration: "3:27",
      feat: "Kareem J", src: "audio/12-red-light.mp3", explicit: true,
      streaming: { youtube: "https://youtube.com/watch?v=RED_LIGHT_ID" }
    },
    {
      number: 13, title: "GHOST FREQUENCIES", duration: "4:30",
      feat: null, src: "audio/13-ghost-freq.mp3", explicit: false,
      streaming: { youtube: "https://youtube.com/watch?v=GHOST_FREQ_ID" }
    },
    {
      number: 14, title: "OUTRO (SUNRISE)", duration: "2:18",
      feat: null, src: "audio/14-outro.mp3", explicit: false,
      streaming: { youtube: "https://youtube.com/watch?v=OUTRO_ID" }
    },
  ],

  // ── Credits ────────────────────────────────────────────────
  credits: [
    { role: "Executive Producer",  name: "Lyric Cole" },
    { role: "Mixed & Mastered by", name: "Studio 7 Audio" },
    { role: "Cover Art",           name: "Visual by DXN" },
    { role: "Recorded at",         name: "Compound Studios, Atlanta GA" },
  ],

  // ── Footer ─────────────────────────────────────────────────
  footerText: "© 2024 Lyric Cole. All rights reserved.",

};
