/**
 * app.js v2 — All features driven from config.js.
 * Features: Dark/Light toggle · Waveform visualizer · Embed modal ·
 *           Pre-save countdown · Discography link
 */

(function () {
  const C = ARTIST_CONFIG;
  const T = C.theme;

  // ── 1. THEME APPLICATION ───────────────────────────────────
  const root = document.documentElement;
  root.style.setProperty('--accent',       T.accent);
  root.style.setProperty('--accent-glow',  T.accentGlow || T.accent + '40');
  root.style.setProperty('--font',         T.font);
  root.style.setProperty('--font-display', T.fontDisplay);

  // Load Google Fonts
  const fontNames = [T.font, T.fontDisplay]
    .map(f => f.split(',')[0].replace(/['"]/g,'').trim()).filter(Boolean);
  document.getElementById('gfont-link').href =
    `https://fonts.googleapis.com/css2?${fontNames.map(f => `family=${encodeURIComponent(f).replace(/%20/g,'+')}&display=swap`).join('&')}`;

  // ── 2. DARK / LIGHT TOGGLE ────────────────────────────────
  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  const themeToggle = document.getElementById('theme-toggle');
  const iconSun     = document.getElementById('icon-sun');
  const iconMoon    = document.getElementById('icon-moon');
  const themeLabel  = document.getElementById('theme-label');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';
    iconSun.style.display  = isDark ? 'none'  : 'block';
    iconMoon.style.display = isDark ? 'block' : 'none';
    themeLabel.textContent = isDark ? 'Light' : 'Dark';
    // redraw waveform with new colors
    if (waveformData.length) drawWaveform();
  }

  applyTheme(savedTheme);
  themeToggle.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // ── 3. META & HERO ────────────────────────────────────────
  document.getElementById('page-title').textContent  = `${C.projectTitle} — ${C.artistName}`;
  document.getElementById('page-desc').content        = C.description;
  document.getElementById('og-title').content         = `${C.projectTitle} — ${C.artistName}`;
  document.getElementById('og-desc').content          = C.description;
  document.getElementById('og-image').content         = C.coverArt || '';

  const bgSrc = C.bannerBg || C.coverArt;
  if (bgSrc) document.getElementById('hero-bg').style.backgroundImage = `url("${bgSrc}")`;

  if (C.coverArt) {
    const ci = document.getElementById('cover-img');
    const cp = document.getElementById('cover-placeholder');
    ci.src = C.coverArt;
    ci.alt = `${C.projectTitle} cover art`;
    ci.style.display = 'block'; cp.style.display = 'none';
    ci.onerror = () => { ci.style.display='none'; cp.style.display='flex'; };
  }

  document.getElementById('badge-type').textContent  = C.projectType;
  document.getElementById('hero-title').textContent  = C.projectTitle;
  document.getElementById('hero-artist').textContent = C.artistName;
  document.getElementById('stat-year').textContent   = C.releaseYear;
  document.getElementById('stat-tracks').textContent = C.tracks.length;
  document.getElementById('stat-genre').textContent  = C.genre;
  document.getElementById('hero-desc').textContent   = C.description;

  // Discography link — only show if discography config exists
  if (!C.discography || !C.discography.length) {
    const dl = document.getElementById('disco-link');
    if (dl) dl.style.display = 'none';
  }

  // ── 4. PRE-SAVE COUNTDOWN ────────────────────────────────
  const ps = C.presave;
  if (ps && ps.releaseDate) {
    const banner    = document.getElementById('presave-banner');
    const titleEl   = document.getElementById('presave-title-text');
    const countRow  = document.getElementById('countdown-row');
    const ctaRow    = document.getElementById('presave-cta-row');

    const releaseMs = new Date(ps.releaseDate).getTime();
    titleEl.textContent = `${C.projectTitle} — ${C.artistName}`;

    // Build CTA buttons
    const PS_ICONS = {
      spotify:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
      appleMusic: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15H5.986c-.152.01-.303.017-.455.026C4.87.08 4.17.19 3.5.473a4.905 4.905 0 0 0-2.37 2.198C.57 3.576.38 4.61.36 5.648c-.003.34-.01.68-.01 1.02v9.668c0 .37.01.73.01 1.1l.013.33c.01.8.17 1.57.5 2.28a5.02 5.02 0 0 0 3.193 2.68c.57.17 1.14.25 1.74.27l.33.013H18.2l.33-.013c.6-.02 1.17-.1 1.74-.27a5.02 5.02 0 0 0 3.193-2.68c.33-.71.49-1.48.5-2.28l.013-.33V6.668c0-.18.003-.36.003-.54l-.01-1.02h.025zM17.895 8.589v6.985c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V7.56l-5.9 1.64v7.44c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V9.024c0-.37.22-.7.56-.84l6.12-1.71c.08-.02.17-.03.25-.03.42 0 .79.33.79.78v1.35z"/></svg>',
    };

    if (ps.presaveLinks) {
      for (const [key, url] of Object.entries(ps.presaveLinks)) {
        if (!url) continue;
        const a = document.createElement('a');
        a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.className = 'presave-btn';
        const label = key === 'spotify' ? 'Pre-save on Spotify' : key === 'appleMusic' ? 'Pre-add on Apple Music' : `Pre-save on ${key}`;
        a.innerHTML = `${PS_ICONS[key] || ''}${label}`;
        ctaRow.appendChild(a);
      }
    }

    function buildCountdown() {
      const now  = Date.now();
      const diff = releaseMs - now;
      if (diff <= 0) {
        banner.classList.remove('active');
        return;
      }
      banner.classList.add('active');
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      countRow.innerHTML = [
        { v: d, l: 'Days' }, { v: h, l: 'Hrs' },
        { v: m, l: 'Min' },  { v: s, l: 'Sec' }
      ].map((u, i) => `
        ${i > 0 ? '<span class="countdown-sep">:</span>' : ''}
        <div class="countdown-unit">
          <span class="countdown-num">${String(u.v).padStart(2,'0')}</span>
          <span class="countdown-lbl">${u.l}</span>
        </div>
      `).join('');
    }

    buildCountdown();
    setInterval(buildCountdown, 1000);
  }

  // ── 5. PLATFORM ICONS & STREAMING BUTTONS ────────────────
  const PLAT = {
    spotify:    { label:'Spotify',       svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>' },
    appleMusic: { label:'Apple Music',   svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15H5.986c-.152.01-.303.017-.455.026C4.87.08 4.17.19 3.5.473a4.905 4.905 0 0 0-2.37 2.198C.57 3.576.38 4.61.36 5.648c-.003.34-.01.68-.01 1.02v9.668c0 .37.01.73.01 1.1l.013.33c.01.8.17 1.57.5 2.28a5.02 5.02 0 0 0 3.193 2.68c.57.17 1.14.25 1.74.27l.33.013H18.2l.33-.013c.6-.02 1.17-.1 1.74-.27a5.02 5.02 0 0 0 3.193-2.68c.33-.71.49-1.48.5-2.28l.013-.33V6.668c0-.18.003-.36.003-.54l-.01-1.02h.025zM17.895 8.589v6.985c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V7.56l-5.9 1.64v7.44c0 .67-.2 1.26-.62 1.72-.55.61-1.3.87-2.1.85-.63-.015-1.19-.24-1.67-.67-.43-.4-.67-.91-.67-1.52 0-.62.24-1.14.69-1.55.42-.38.94-.59 1.54-.66.34-.04.68-.06 1.02-.06.29 0 .58.02.87.07V9.024c0-.37.22-.7.56-.84l6.12-1.71c.08-.02.17-.03.25-.03.42 0 .79.33.79.78v1.35z"/></svg>' },
    youtube:    { label:'YouTube',       svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>' },
    soundcloud: { label:'SoundCloud',    svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.56 8.87V17h8.76c1.46-.01 2.65-1.2 2.65-2.67 0-1.46-1.18-2.65-2.65-2.65-.12 0-.24.01-.35.03C19.55 9.6 17.94 8 16 8c-.62 0-1.2.18-1.7.47-.32-.36-.78-.6-1.3-.6-.56 0-1.05.28-1.36.7-.06-.1-.08.3-.08.3zM0 15c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2S0 7.9 0 9v6zm5.5 1c0 .83.67 1.5 1.5 1.5S8.5 16.83 8.5 16V8c0-.83-.67-1.5-1.5-1.5S5.5 7.17 5.5 8v8z"/></svg>' },
    tidal:      { label:'Tidal',         svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L8.008 7.996l4.004 4.004 4.004-4.004zM8.008 11.988l-4.004 4.004L8.008 20l4.004-4.008zM16.008 7.992l-4.004 4.004 4.004 4.004 4.004-4.004z"/></svg>' },
    amazonMusic:{ label:'Amazon Music',  svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.93 7.2c0 .63.066 1.14.198 1.53.133.39.336.818.612 1.282.099.149.132.298.132.43a.592.592 0 0 1-.282.48l-.927.618a.717.717 0 0 1-.396.131c-.155 0-.31-.074-.462-.215a4.762 4.762 0 0 1-.549-.717 11.845 11.845 0 0 1-.472-.9c-1.185 1.397-2.673 2.095-4.464 2.095-1.278 0-2.295-.366-3.049-1.096C5.477 10.1 5.1 9.128 5.1 7.914c0-1.29.455-2.337 1.366-3.138.91-.8 2.121-1.2 3.637-1.2.505 0 1.023.042 1.574.121.552.08 1.117.199 1.715.354v-1.09c0-1.136-.237-1.926-.71-2.374C12.208.139 11.408-.082 10.275-.082c-.516 0-1.047.063-1.59.19a11.72 11.72 0 0 0-1.59.502c-.19.07-.32.111-.397.125-.076.014-.133.021-.171.021-.204 0-.307-.145-.307-.44v-.692C6.22-.604 6.251-.774 6.32-.891c.067-.116.19-.232.373-.347A7.688 7.688 0 0 1 8.433-.855a8.624 8.624 0 0 1 2.19-.267c1.666 0 2.885.38 3.661 1.136.769.757 1.16 1.907 1.16 3.45V7.2h-.513zm-6.162 2.326c.487 0 .989-.09 1.52-.267.533-.178.994-.535.994-.535a3.296 3.296 0 0 0-.757-1.032 1.767 1.767 0 0 0-1.17-.415c-.694 0-1.214.246-1.56.74-.347.494-.52 1.113-.52 1.862 0 .692.153 1.209.461 1.554.309.345.757.517 1.345.517l-.313-.424z"/></svg>' },
    deezer:     { label:'Deezer',        svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.81 11.28h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zM18.81 8.98h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zM18.81 6.7h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm6.39 6.56h1.67v1.09H15.6zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zM3.05 11.28h1.67v1.09H3.05zm0-2.3h1.67v1.09H3.05zm15.76 4.6h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zm-2.88 0h1.67v1.09H3.05zm15.76 2.3h1.67v1.09h-1.67zm-3.21 0h1.67v1.09h-1.67zm-3.25 0h1.67v1.09h-1.67zm-3.21 0h1.67v1.09H9.14zm-3.21 0h1.67v1.09H5.93zm-2.88 0h1.67v1.09H3.05z"/></svg>' },
  };

  // Hero streaming buttons
  const streamRow = document.getElementById('streaming-row');
  let firstBtn = false;
  for (const [key, url] of Object.entries(C.streaming || {})) {
    if (!url || !PLAT[key]) continue;
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = `btn-stream ${!firstBtn ? 'primary' : 'outline'}`;
    a.innerHTML = `${PLAT[key].svg}<span>${PLAT[key].label}</span>`;
    streamRow.appendChild(a);
    firstBtn = true;
  }

  // ── 6. EMBED MODAL ───────────────────────────────────────
  const modal      = document.getElementById('embed-modal');
  const modalTabs  = document.getElementById('modal-tabs');
  const modalBody  = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-track-name');
  const modalClose = document.getElementById('modal-close');

  // Embed URL builders
  function getEmbedUrl(platform, url) {
    if (!url) return null;
    if (platform === 'youtube') {
      const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
      return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1` : null;
    }
    if (platform === 'soundcloud') {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23${T.accent.replace('#','')}&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false`;
    }
    if (platform === 'spotify') {
      const m = url.match(/track\/([a-zA-Z0-9]+)/);
      return m ? `https://open.spotify.com/embed/track/${m[1]}?utm_source=generator` : null;
    }
    return null;
  }

  function getEmbedHeight(platform) {
    if (platform === 'youtube') return '360px';
    if (platform === 'soundcloud') return '166px';
    if (platform === 'spotify') return '152px';
    return '200px';
  }

  let activeTabPlatform = null;

  function openModal(track, allLinks) {
    audio.pause(); isPlaying = false; setPlayIcon(false);
    modalTitle.textContent = track.title + (track.feat ? ` feat. ${track.feat}` : '');
    modalTabs.innerHTML = '';
    modalBody.innerHTML = '';
    activeTabPlatform = null;

    const embeddable = ['youtube','soundcloud','spotify'];
    const tabs = [];

    for (const [key, url] of Object.entries(allLinks)) {
      if (!url) continue;
      const embedUrl = getEmbedUrl(key, url);
      const p = PLAT[key];
      if (!p) continue;
      tabs.push({ key, url, embedUrl, label: p.label, svg: p.svg });
    }

    if (!tabs.length) {
      modalBody.innerHTML = `<div class="modal-link-fallback"><p>No streaming links for this track.</p></div>`;
      modal.classList.add('open');
      return;
    }

    tabs.forEach((tab, i) => {
      const btn = document.createElement('button');
      btn.className = 'modal-tab' + (i === 0 ? ' active' : '');
      btn.innerHTML = `${tab.svg}<span>${tab.label}</span>`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        renderEmbed(tab);
      });
      modalTabs.appendChild(btn);
    });

    renderEmbed(tabs[0]);
    modal.classList.add('open');
  }

  function renderEmbed(tab) {
    const embedUrl = tab.embedUrl;
    if (embedUrl) {
      modalBody.innerHTML = `<iframe src="${embedUrl}" height="${getEmbedHeight(tab.key)}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    } else {
      modalBody.innerHTML = `
        <div class="modal-link-fallback">
          <p>Open this track on ${tab.label}</p>
          <a href="${tab.url}" target="_blank" rel="noopener noreferrer">${tab.svg} Listen on ${tab.label}</a>
        </div>`;
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    modalBody.innerHTML = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── 7. TRACKLIST ─────────────────────────────────────────
  const tracklist = document.getElementById('tracklist');

  C.tracks.forEach((track, index) => {
    const row = document.createElement('div');
    row.className = 'track-row';
    row.dataset.index = index;

    // Merge global + per-track streaming
    const trackLinks = {};
    for (const [k, v] of Object.entries(C.streaming || {})) { if (v) trackLinks[k] = v; }
    for (const [k, v] of Object.entries(track.streaming || {})) {
      if (v) trackLinks[k] = v; else delete trackLinks[k];
    }

    const hasSrc    = !!track.src;
    const hasLinks  = Object.keys(trackLinks).length > 0;
    const hasEmbed  = ['youtube','soundcloud','spotify'].some(p => trackLinks[p]);

    if (hasSrc || hasLinks) row.classList.add('clickable');

    // Build icon buttons for links (excluding embed-capable ones shown via modal)
    const linkBtns = Object.entries(trackLinks)
      .filter(([k]) => PLAT[k])
      .map(([k, url]) => `
        <a href="${url}" target="_blank" rel="noopener noreferrer"
           class="track-icon-btn" title="${PLAT[k].label}" onclick="event.stopPropagation()">
          ${PLAT[k].svg.replace('fill="currentColor"','').replace('<svg ','<svg fill="currentColor" ')}
        </a>`).join('');

    const embedBtn = hasEmbed ? `
      <button class="track-icon-btn embed-trigger" title="Play preview" data-embed="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>` : '';

    row.innerHTML = `
      <div class="track-num">${track.number}</div>
      <div class="playing-bars"><span></span><span></span><span></span><span></span></div>
      <div class="track-info">
        <div class="track-title-row">
          <span class="track-title">${track.title}</span>
          ${track.explicit ? '<span class="explicit-badge">E</span>' : ''}
        </div>
        ${track.feat ? `<span class="track-feat">feat. ${track.feat}</span>` : ''}
      </div>
      <div class="track-right">
        <div class="track-actions">${embedBtn}${linkBtns}</div>
        <span class="track-duration">${track.duration}</span>
      </div>`;

    // Click: audio plays if src, otherwise open embed modal
    row.addEventListener('click', e => {
      if (e.target.closest('a.track-icon-btn')) return; // let link open
      if (e.target.closest('[data-embed]') || (!hasSrc && hasEmbed)) {
        openModal(track, trackLinks);
        return;
      }
      if (hasSrc) playTrack(index);
    });

    tracklist.appendChild(row);
  });

  // ── 8. CREDITS ───────────────────────────────────────────
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

  // ── 9. SOCIAL ────────────────────────────────────────────
  const SOCIAL = {
    instagram: { label:'Instagram',   svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
    twitter:   { label:'Twitter / X', svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    tiktok:    { label:'TikTok',      svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.7a8.18 8.18 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1-.09z"/></svg>' },
    website:   { label:'Website',     svg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' },
  };

  const socialLinks = Object.entries(C.social || {}).filter(([,v]) => v);
  if (socialLinks.length) {
    document.getElementById('social-label').style.display = 'flex';
    const row = document.getElementById('social-row');
    socialLinks.forEach(([k, url]) => {
      const meta = SOCIAL[k]; if (!meta) return;
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.className = 'social-btn';
      a.innerHTML = `${meta.svg}<span>${meta.label}</span>`;
      row.appendChild(a);
    });
  }

  // Footer
  const foot = document.getElementById('footer');
  foot.textContent = C.footerText || `© ${C.releaseYear} ${C.artistName}. All rights reserved.`;
  if (C.discography && C.discography.length) {
    foot.innerHTML += ` · <a href="discography.html">Discography</a>`;
  }

  // ── 10. AUDIO PLAYER ─────────────────────────────────────
  const audio         = document.getElementById('audio-player');
  const playerBar     = document.getElementById('player-bar');
  const btnPlay       = document.getElementById('btn-play');
  const iconPlay      = document.getElementById('icon-play');
  const iconPause     = document.getElementById('icon-pause');
  const btnPrev       = document.getElementById('btn-prev');
  const btnNext       = document.getElementById('btn-next');
  const timeCur       = document.getElementById('time-current');
  const timeTotal     = document.getElementById('time-total');
  const volSlider     = document.getElementById('vol-slider');
  const playerTName   = document.getElementById('player-track-name');
  const playerAName   = document.getElementById('player-artist-name');
  const playerCoverI  = document.getElementById('player-cover-img');
  const playerCoverPH = document.getElementById('player-cover-placeholder');

  let currentIndex = -1;
  let isPlaying    = false;

  const playableTracks = C.tracks
    .map((t, i) => ({ ...t, originalIndex: i }))
    .filter(t => t.src);

  function playTrack(originalIndex) {
    const pi = playableTracks.findIndex(t => t.originalIndex === originalIndex);
    if (pi === -1) return;
    const track = playableTracks[pi];

    document.querySelectorAll('.track-row').forEach(r => r.classList.remove('active','playing'));
    const row = document.querySelector(`.track-row[data-index="${originalIndex}"]`);
    if (row) row.classList.add('active', 'playing');

    currentIndex = pi;
    audio.src = track.src;
    audio.load();
    audio.play().catch(() => {});
    isPlaying = true;

    playerTName.textContent  = track.title + (track.feat ? ` feat. ${track.feat}` : '');
    playerAName.textContent  = C.artistName;

    if (C.coverArt) {
      playerCoverI.src = C.coverArt;
      playerCoverI.style.display  = 'block';
      playerCoverPH.style.display = 'none';
    }

    playerBar.classList.add('visible');
    setPlayIcon(true);
    setupWaveform();
  }

  function setPlayIcon(p) {
    iconPlay.style.display  = p ? 'none'  : 'block';
    iconPause.style.display = p ? 'block' : 'none';
  }

  btnPlay.addEventListener('click', () => {
    if (currentIndex === -1) { if (playableTracks.length) playTrack(playableTracks[0].originalIndex); return; }
    if (isPlaying) { audio.pause(); } else { audio.play(); }
  });

  btnNext.addEventListener('click', () => {
    if (!playableTracks.length) return;
    playTrack(playableTracks[(currentIndex + 1) % playableTracks.length].originalIndex);
  });

  btnPrev.addEventListener('click', () => {
    if (!playableTracks.length) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    playTrack(playableTracks[(currentIndex - 1 + playableTracks.length) % playableTracks.length].originalIndex);
  });

  audio.addEventListener('ended', () => {
    playTrack(playableTracks[(currentIndex + 1) % playableTracks.length].originalIndex);
  });

  audio.addEventListener('pause',  () => { isPlaying = false; setPlayIcon(false); document.querySelector('.track-row.playing')?.classList.remove('playing'); });
  audio.addEventListener('play',   () => {
    isPlaying = true; setPlayIcon(true);
    if (currentIndex >= 0) {
      document.querySelector(`.track-row[data-index="${playableTracks[currentIndex].originalIndex}"]`)?.classList.add('playing');
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    timeCur.textContent = fmtTime(audio.currentTime);
    drawWaveform();
  });

  audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = fmtTime(audio.duration);
  });

  volSlider.addEventListener('input', () => { audio.volume = parseFloat(volSlider.value); });

  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
  }

  // ── 11. WAVEFORM VISUALIZER ───────────────────────────────
  const canvas  = document.getElementById('waveform-canvas');
  const ctx2d   = canvas.getContext('2d');
  let waveformData  = [];
  let analyser      = null;
  let audioCtx      = null;
  let sourceNode    = null;
  let animFrame     = null;

  function setupWaveform() {
    if (animFrame) cancelAnimationFrame(animFrame);
    waveformData = [];

    try {
      if (!audioCtx) {
        audioCtx  = new (window.AudioContext || window.webkitAudioContext)();
        analyser  = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        sourceNode = audioCtx.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      animateWaveform();
    } catch(e) {
      // Fallback: simple time-based bar
      drawFallbackWaveform();
    }
  }

  function animateWaveform() {
    animFrame = requestAnimationFrame(animateWaveform);
    const bufLen = analyser.frequencyBinCount;
    const data   = new Uint8Array(bufLen);
    analyser.getByteFrequencyData(data);

    // Store rolling snapshot for static waveform shape
    waveformData = Array.from(data);
    drawWaveform();
  }

  function drawWaveform() {
    const dpr = window.devicePixelRatio || 1;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx2d.scale(dpr, dpr);

    const isDark  = root.getAttribute('data-theme') === 'dark';
    const accent  = T.accent;
    const barW    = 3;
    const gap     = 2;
    const cols    = Math.floor(w / (barW + gap));
    const progress = audio.duration ? audio.currentTime / audio.duration : 0;

    ctx2d.clearRect(0, 0, w, h);

    for (let i = 0; i < cols; i++) {
      const dataIdx  = Math.floor((i / cols) * (waveformData.length || cols));
      const rawVal   = waveformData[dataIdx] !== undefined ? waveformData[dataIdx] / 255 : (0.2 + Math.sin(i * 0.4) * 0.15);
      const barH     = Math.max(3, rawVal * h * 0.85);
      const x        = i * (barW + gap);
      const y        = (h - barH) / 2;
      const played   = i / cols < progress;

      ctx2d.fillStyle = played ? accent : (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)');
      ctx2d.beginPath();
      ctx2d.roundRect(x, y, barW, barH, 1.5);
      ctx2d.fill();
    }
  }

  function drawFallbackWaveform() {
    // Simple static bars with smooth sine wave when no WebAudio available
    waveformData = Array.from({ length: 64 }, (_, i) => Math.abs(Math.sin(i * 0.5)) * 200 + 30);
    drawWaveform();
  }

  canvas.addEventListener('click', e => {
    if (!audio.duration) return;
    const rect = canvas.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });

})();
