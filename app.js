/**
 * app.js — Reads ARTIST_CONFIG from config.js and builds the entire page.
 * Never edit this file per-artist. Only edit config.js.
 */

(function () {
  const C = ARTIST_CONFIG;
  const T = C.theme;

  // ── Apply Theme ────────────────────────────────────────────
  const root = document.documentElement;
  root.style.setProperty('--accent',       T.accent);
  root.style.setProperty('--accent-glow',  T.accentGlow);
  root.style.setProperty('--bg',           T.bg);
  root.style.setProperty('--bg-card',      T.bgCard);
  root.style.setProperty('--bg-hover',     T.bgCardHover);
  root.style.setProperty('--text',         T.textPrimary);
  root.style.setProperty('--muted',        T.textMuted);
  root.style.setProperty('--font',         T.font);
  root.style.setProperty('--font-display', T.fontDisplay);

  // Load Google Fonts
  const fontNames = [T.font, T.fontDisplay]
    .map(f => f.split(',')[0].replace(/['"]/g, '').trim())
    .filter(Boolean);
  const link = document.getElementById('gfont-link');
  link.href = `https://fonts.googleapis.com/css2?${fontNames.map(f => `family=${encodeURIComponent(f).replace(/%20/g, '+')}&display=swap`).join('&')}`;

  // ── Meta / SEO ─────────────────────────────────────────────
  document.getElementById('page-title').textContent  = `${C.projectTitle} — ${C.artistName}`;
  document.getElementById('page-desc').content        = C.description;
  document.getElementById('og-title').content         = `${C.projectTitle} — ${C.artistName}`;
  document.getElementById('og-desc').content          = C.description;
  document.getElementById('og-image').content         = C.coverArt;

  // ── Hero BG ────────────────────────────────────────────────
  const bgSrc = C.bannerBg || C.coverArt;
  const heroBg = document.getElementById('hero-bg');
  heroBg.style.backgroundImage = `url("${bgSrc}")`;

  // ── Cover Art ──────────────────────────────────────────────
  const coverImg  = document.getElementById('cover-img');
  const coverPH   = document.getElementById('cover-placeholder');
  if (C.coverArt) {
    coverImg.src = C.coverArt;
    coverImg.alt = `${C.projectTitle} cover art`;
    coverImg.style.display = 'block';
    coverPH.style.display  = 'none';
    coverImg.onerror = () => { coverImg.style.display='none'; coverPH.style.display='flex'; };
  }

  // ── Hero Text ──────────────────────────────────────────────
  document.getElementById('badge-type').textContent  = C.projectType;
  document.getElementById('hero-title').textContent  = C.projectTitle;
  document.getElementById('hero-artist').textContent = C.artistName;
  document.getElementById('stat-year').textContent   = C.releaseYear;
  document.getElementById('stat-tracks').textContent = C.tracks.length;
  document.getElementById('stat-genre').textContent  = C.genre;
  document.getElementById('hero-desc').textContent   = C.description;

  // ── Streaming Buttons ──────────────────────────────────────
  const PLATFORM_META = {
    spotify:     { label: 'Spotify',      primary: true,  svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>' },
    appleMusic:  { label: 'Apple Music',  primary: false, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.87.08 4.17.19 3.5.473a4.905 4.905 0 0 0-2.37 2.198C.57 3.576.38 4.61.36 5.648c-.003.34-.01.68-.01 1.02 0 .18 0 .36.003.54.003 2.09.01 4.18.013 6.27 0 1.48.007 2.96.007 4.44 0 .8.007 1.607.007 2.41 0 .37.01.73.01 1.1l.013.33c.01.8.17 1.57.5 2.28a5.02 5.02 0 0 0 3.193 2.68c.57.17 1.14.25 1.74.27l.33.013c.29.01.57.013.86.013H18.2c.29 0 .58-.003.87-.013l.33-.013c.6-.02 1.17-.1 1.74-.27a5.02 5.02 0 0 0 3.193-2.68c.33-.71.49-1.48.5-2.28l.013-.33c0-.37.01-.73.01-1.1v-2.41c0-1.48.007-2.96.007-4.44.003-2.09.01-4.18.013-6.27 0-.18.003-.36.003-.54l-.01-1.02zm-6.099 2.465v6.985c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V7.56l-5.9 1.64v7.44c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V9.024c0-.37.22-.7.56-.84l6.12-1.71c.08-.02.17-.03.25-.03.42 0 .79.33.79.78v1.35z"/></svg>' },
    youtube:     { label: 'YouTube',      primary: false, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>' },
    soundcloud:  { label: 'SoundCloud',   primary: false, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.56 8.87V17h8.76c1.46-.01 2.65-1.2 2.65-2.67 0-1.46-1.18-2.65-2.65-2.65-.12 0-.24.01-.35.03C19.55 9.6 17.94 8 16 8c-.62 0-1.2.18-1.7.47-.32-.36-.78-.6-1.3-.6-.56 0-1.05.28-1.36.7-.06-.1-.08.3-.08.3zM0 15c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2S0 7.9 0 9v6zm5.5 1c0 .83.67 1.5 1.5 1.5S8.5 16.83 8.5 16V8c0-.83-.67-1.5-1.5-1.5S5.5 7.17 5.5 8v8z"/></svg>' },
    tidal:       { label: 'Tidal',        primary: false, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L8.008 7.996l4.004 4.004 4.004-4.004zM8.008 11.988l-4.004 4.004L8.008 20l4.004-4.008zM16.008 7.992l-4.004 4.004 4.004 4.004 4.004-4.004z"/></svg>' },
    amazonMusic: { label: 'Amazon Music', primary: false, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.51 14.674c3.642 2.814 8.742 4.508 14.053 4.508 3.463 0 7.47-.98 10.373-2.885.48-.311.09-.773-.44-.519-2.954 1.393-6.338 2.15-9.437 2.15-4.494 0-9.076-1.313-12.53-3.471-.549-.329-.994.236-.519.647zm-1.51-1.69c-.318.512.166.731.587.399 1.148-.878 2.895-1.294 4.423-.817.513.16.679-.444.249-.701C2.53 11.193.28 11.897-.999 12.985zm12.07-3.69c0 .63.066 1.14.198 1.53.133.39.336.818.612 1.282.099.149.132.298.132.43a.592.592 0 0 1-.282.48l-.927.618a.717.717 0 0 1-.396.131c-.155 0-.31-.074-.462-.215a4.762 4.762 0 0 1-.549-.717 11.845 11.845 0 0 1-.472-.9c-1.185 1.397-2.673 2.095-4.464 2.095-1.278 0-2.295-.366-3.049-1.096-.754-.731-1.131-1.703-1.131-2.917 0-1.29.455-2.337 1.366-3.138.91-.8 2.121-1.2 3.637-1.2.505 0 1.023.042 1.574.121.552.08 1.117.199 1.715.354v-1.09c0-1.136-.237-1.926-.71-2.374-.474-.45-1.274-.671-2.407-.671-.516 0-1.047.063-1.59.19a11.72 11.72 0 0 0-1.59.502 4.217 4.217 0 0 1-.517.19.905.905 0 0 1-.233.035c-.204 0-.307-.145-.307-.44v-.692c0-.228.031-.398.1-.515.067-.116.19-.232.373-.347a7.688 7.688 0 0 1 1.74-.617 8.624 8.624 0 0 1 2.19-.267c1.666 0 2.885.38 3.661 1.136.769.757 1.16 1.907 1.16 3.45v4.543l.027.003zm-6.162 2.326c.487 0 .989-.09 1.52-.267.533-.178.006-.535.006-.535a3.296 3.296 0 0 0-.757-1.032 1.767 1.767 0 0 0-1.17-.415c-.694 0-1.214.246-1.56.74-.347.494-.52 1.113-.52 1.862 0 .692.153 1.209.461 1.554.309.345.757.517 1.345.517l.675-.424zm11.082 1.448c-.517 0-.895-.078-1.133-.235-.238-.157-.447-.481-.63-.975L12.65 5.58a3.143 3.143 0 0 1-.167-.677c0-.266.133-.401.397-.401h1.621c.529 0 .89.09 1.078.265.215.152.372.479.513.945l2.196 8.668 2.037-8.668c.12-.47.274-.796.464-.945.19-.15.563-.265 1.082-.265h1.32c.53 0 .89.09 1.082.265.19.152.35.479.46.945l2.062 8.782 2.265-8.782c.14-.47.308-.796.512-.945.206-.152.566-.265 1.082-.265h1.53c.265 0 .4.132.4.4 0 .08-.014.162-.04.248a2.7 2.7 0 0 1-.127.44l-3.093 9.888c-.14.469-.3.796-.513.953-.215.157-.562.235-1.04.235h-1.42c-.532 0-.89-.088-1.082-.262-.19-.175-.354-.49-.46-.95L17.16 7.956l-2.017 7.878c-.116.46-.274.775-.462.95-.19.174-.553.262-1.082.262h-1.088z"/></svg>' },
    deezer:      { label: 'Deezer',       primary: false, svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.81 11.28h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zM18.81 8.98h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zM18.81 6.7h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm6.39 6.56h1.67v1.09H15.6zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zM3.05 11.28h1.67v1.09H3.05zm0-2.3h1.67v1.09H3.05zm15.76 4.6h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zm-2.88 0h1.67v1.09H3.05zm15.76 2.3h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zm-2.88 0h1.67v1.09H3.05z"/></svg>' },
  };

  const streamRow = document.getElementById('streaming-row');
  let firstAdded = false;
  for (const [key, url] of Object.entries(C.streaming)) {
    if (!url) continue;
    const meta = PLATFORM_META[key];
    if (!meta) continue;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = `btn-stream ${(!firstAdded) ? 'primary' : 'outline'}`;
    a.innerHTML = `${meta.svg}<span>${meta.label}</span>`;
    streamRow.appendChild(a);
    firstAdded = true;
  }

  // ── Build Tracklist ────────────────────────────────────────
  const tracklist = document.getElementById('tracklist');

  C.tracks.forEach((track, index) => {
    const row = document.createElement('div');
    row.className = 'track-row';
    row.dataset.index = index;

    // Track-level streaming links (merge global + track-specific)
    const trackLinks = {};
    for (const [key, url] of Object.entries(C.streaming)) {
      if (url) trackLinks[key] = url;
    }
    if (track.streaming) {
      for (const [key, url] of Object.entries(track.streaming)) {
        if (url) trackLinks[key] = url;
        else delete trackLinks[key];
      }
    }

    const hasSrc      = !!track.src;
    const linkIcons   = buildTrackLinks(trackLinks, track);

    row.innerHTML = `
      <div class="track-num">${track.number}</div>
      <div class="playing-bars">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="track-info">
        <div class="track-title-row">
          <span class="track-title">${track.title}</span>
          ${track.explicit ? '<span class="explicit-badge">E</span>' : ''}
        </div>
        ${track.feat ? `<span class="track-feat">feat. ${track.feat}</span>` : ''}
      </div>
      <div class="track-right">
        <div class="track-links">${linkIcons}</div>
        <span class="track-duration">${track.duration}</span>
      </div>
    `;

    if (hasSrc) {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.track-link-btn')) return;
        playTrack(index);
      });
      row.style.cursor = 'pointer';
    } else {
      row.style.cursor = 'default';
      row.querySelector('.track-num').style.color = 'var(--muted)';
    }

    tracklist.appendChild(row);
  });

  function buildTrackLinks(links, track) {
    const ICONS = {
      spotify:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
      appleMusic: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.87.08 4.17.19 3.5.473a4.905 4.905 0 0 0-2.37 2.198C.57 3.576.38 4.61.36 5.648c-.003.34-.01.68-.01 1.02 0 .18 0 .36.003.54.003 2.09.01 4.18.013 6.27 0 1.48.007 2.96.007 4.44 0 .8.007 1.607.007 2.41 0 .37.01.73.01 1.1l.013.33c.01.8.17 1.57.5 2.28a5.02 5.02 0 0 0 3.193 2.68c.57.17 1.14.25 1.74.27l.33.013c.29.01.57.013.86.013H18.2c.29 0 .58-.003.87-.013l.33-.013c.6-.02 1.17-.1 1.74-.27a5.02 5.02 0 0 0 3.193-2.68c.33-.71.49-1.48.5-2.28l.013-.33c0-.37.01-.73.01-1.1v-2.41c0-1.48.007-2.96.007-4.44.003-2.09.01-4.18.013-6.27 0-.18.003-.36.003-.54l-.01-1.02zm-6.099 2.465v6.985c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V7.56l-5.9 1.64v7.44c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V9.024c0-.37.22-.7.56-.84l6.12-1.71c.08-.02.17-.03.25-.03.42 0 .79.33.79.78v1.35z"/></svg>',
      youtube:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>',
      soundcloud: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.56 8.87V17h8.76c1.46-.01 2.65-1.2 2.65-2.67 0-1.46-1.18-2.65-2.65-2.65-.12 0-.24.01-.35.03C19.55 9.6 17.94 8 16 8c-.62 0-1.2.18-1.7.47-.32-.36-.78-.6-1.3-.6-.56 0-1.05.28-1.36.7-.06-.1-.08.3-.08.3zM0 15c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2S0 7.9 0 9v6zm5.5 1c0 .83.67 1.5 1.5 1.5S8.5 16.83 8.5 16V8c0-.83-.67-1.5-1.5-1.5S5.5 7.17 5.5 8v8z"/></svg>',
    };
    return Object.entries(links)
      .filter(([key]) => ICONS[key])
      .map(([key, url]) => `
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="track-link-btn" title="${key}" onclick="event.stopPropagation()">
          ${ICONS[key]}
        </a>
      `).join('');
  }

  // ── Credits ────────────────────────────────────────────────
  if (C.credits && C.credits.length) {
    document.getElementById('credits-label').style.display = 'flex';
    const grid = document.getElementById('credits-grid');
    C.credits.forEach(cr => {
      const card = document.createElement('div');
      card.className = 'credit-card';
      card.innerHTML = `<div class="credit-role">${cr.role}</div><div class="credit-name">${cr.name}</div>`;
      grid.appendChild(card);
    });
  }

  // ── Social ─────────────────────────────────────────────────
  const SOCIAL_META = {
    instagram: { label: 'Instagram', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
    twitter:   { label: 'Twitter / X', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    tiktok:    { label: 'TikTok', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.7a8.18 8.18 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1-.09z"/></svg>' },
    website:   { label: 'Website', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' },
  };

  const socialLinks = Object.entries(C.social || {}).filter(([, url]) => url);
  if (socialLinks.length) {
    document.getElementById('social-label').style.display = 'flex';
    const row = document.getElementById('social-row');
    socialLinks.forEach(([key, url]) => {
      const meta = SOCIAL_META[key];
      if (!meta) return;
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.className = 'social-btn';
      a.innerHTML = `${meta.svg}<span>${meta.label}</span>`;
      row.appendChild(a);
    });
  }

  // ── Footer ─────────────────────────────────────────────────
  document.getElementById('footer').textContent = C.footerText;

  // ── Audio Player ───────────────────────────────────────────
  const audio     = document.getElementById('audio-player');
  const playerBar = document.getElementById('player-bar');
  const btnPlay   = document.getElementById('btn-play');
  const iconPlay  = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const btnPrev   = document.getElementById('btn-prev');
  const btnNext   = document.getElementById('btn-next');
  const progTrack = document.getElementById('progress-track');
  const progFill  = document.getElementById('progress-fill');
  const timeCur   = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  const volSlider = document.getElementById('vol-slider');
  const playerTrackName  = document.getElementById('player-track-name');
  const playerArtistName = document.getElementById('player-artist-name');
  const playerCoverImg   = document.getElementById('player-cover-img');
  const playerCoverPH    = document.getElementById('player-cover-placeholder');

  let currentIndex  = -1;
  let isPlaying     = false;

  // Get playable tracks (those with src)
  const playableTracks = C.tracks
    .map((t, i) => ({ ...t, originalIndex: i }))
    .filter(t => t.src);

  function getPlayableIndex(originalIndex) {
    return playableTracks.findIndex(t => t.originalIndex === originalIndex);
  }

  function playTrack(originalIndex) {
    const pi = getPlayableIndex(originalIndex);
    if (pi === -1) return;

    const track = playableTracks[pi];

    // Update row states
    document.querySelectorAll('.track-row').forEach(r => {
      r.classList.remove('active', 'playing');
    });
    const activeRow = document.querySelector(`.track-row[data-index="${originalIndex}"]`);
    if (activeRow) activeRow.classList.add('active', 'playing');

    currentIndex = pi;
    audio.src    = track.src;
    audio.load();
    audio.play().catch(() => {});
    isPlaying = true;

    // Update player bar
    playerTrackName.textContent  = track.title + (track.feat ? ` (feat. ${track.feat})` : '');
    playerArtistName.textContent = C.artistName;

    // Cover
    if (C.coverArt) {
      playerCoverImg.src = C.coverArt;
      playerCoverImg.style.display = 'block';
      playerCoverPH.style.display  = 'none';
    }

    playerBar.classList.add('visible');
    setPlayIcon(true);
  }

  function setPlayIcon(playing) {
    iconPlay.style.display  = playing ? 'none'  : 'block';
    iconPause.style.display = playing ? 'block' : 'none';
  }

  btnPlay.addEventListener('click', () => {
    if (currentIndex === -1) {
      if (playableTracks.length) playTrack(playableTracks[0].originalIndex);
      return;
    }
    if (isPlaying) { audio.pause(); isPlaying = false; setPlayIcon(false); }
    else           { audio.play(); isPlaying = true; setPlayIcon(true); }
  });

  btnNext.addEventListener('click', () => {
    if (!playableTracks.length) return;
    const next = (currentIndex + 1) % playableTracks.length;
    playTrack(playableTracks[next].originalIndex);
  });

  btnPrev.addEventListener('click', () => {
    if (!playableTracks.length) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    const prev = (currentIndex - 1 + playableTracks.length) % playableTracks.length;
    playTrack(playableTracks[prev].originalIndex);
  });

  audio.addEventListener('ended', () => {
    const next = (currentIndex + 1) % playableTracks.length;
    playTrack(playableTracks[next].originalIndex);
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    setPlayIcon(false);
    const row = document.querySelector('.track-row.playing');
    if (row) row.classList.remove('playing');
  });

  audio.addEventListener('play', () => {
    isPlaying = true;
    setPlayIcon(true);
    if (currentIndex >= 0) {
      const oi = playableTracks[currentIndex].originalIndex;
      const row = document.querySelector(`.track-row[data-index="${oi}"]`);
      if (row) row.classList.add('playing');
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progFill.style.width = pct + '%';
    timeCur.textContent  = fmtTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = fmtTime(audio.duration);
  });

  progTrack.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progTrack.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });

  volSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volSlider.value);
  });

  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = String(Math.floor(s % 60)).padStart(2, '0');
    return `${m}:${sec}`;
  }

})();
