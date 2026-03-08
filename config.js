/* ════════════════════════════════════════════════
   ✏️  NOVA SYNDICATE — GLOBAL CONFIG
   Hier kannst du alles für ALLE Seiten gleichzeitig ändern!
════════════════════════════════════════════════ */

/* MAINTENANCE MODE
   true  = alle Seiten zeigen Maintenance
   false = normale Website */
const MAINTENANCE = false;

/* EXPLOIT PAGE
   true  = exploit.html ist erreichbar
   false = Weiterleitung zu 404 */
const EXPLOIT_ENABLED = true;

/* CORRUPTED PAGE
   true  = corrupted.html ist erreichbar
   false = Weiterleitung zu 404 */
const CORRUPTED_ENABLED = true;

/* THEME — gilt für alle Seiten gleichzeitig
   Options: "default" | "winter" | "sunset" | "christmas" | "halloween" | "newyear" | "valentine" */
const GLOBAL_THEME = "default";

/* ANNOUNCEMENT — erscheint auf allen Seiten
   Set to "" um es zu verstecken */
const GLOBAL_ANNOUNCEMENT = "";

/* ════════════════════════════════════════════════ */

// Maintenance Redirect
const _isMaintPage = window.location.href.includes('maintenance.html');

if (MAINTENANCE && !_isMaintPage) {
  window.location.replace('maintenance.html');
} else if (!MAINTENANCE && _isMaintPage) {
  window.location.replace('index.html');
}

// Exploit & Corrupted page guards
const _path = window.location.pathname;
if (_path.endsWith('exploit.html') && !EXPLOIT_ENABLED) {
  window.location.replace('404.html');
}
if (_path.endsWith('corrupted.html') && !CORRUPTED_ENABLED) {
  window.location.replace('404.html');
}

// Theme anwenden
if (GLOBAL_THEME !== "default") {
  document.documentElement.setAttribute('data-theme', GLOBAL_THEME);
}

// Theme Greeting Banner
const _THEME_GREETINGS = {
  winter:    "Happy Winter ❄️",
  christmas: "Merry Christmas 🎄",
  halloween: "Happy Halloween 🎃",
  newyear:   "Happy New Year 🎆",
  valentine: "Happy Valentine's Day ❤️",
  sunset:    "Enjoy the Sunset 🌅",
};

document.addEventListener('DOMContentLoaded', () => {
  if (_THEME_GREETINGS[GLOBAL_THEME]) {
    const banner = document.createElement('div');
    banner.id = 'theme-greeting';
    banner.textContent = _THEME_GREETINGS[GLOBAL_THEME];
    banner.style.cssText = `
      position: fixed;
      top: 72px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 995;
      font-family: 'Orbitron', monospace;
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .35em;
      text-transform: uppercase;
      color: var(--white);
      background: linear-gradient(90deg, rgba(139,42,255,.18), rgba(255,45,155,.18));
      border: 1px solid var(--border);
      backdrop-filter: blur(10px);
      padding: 8px 28px;
      border-radius: 30px;
      white-space: nowrap;
      animation: greeting-fade 1s ease both;
      pointer-events: none;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes greeting-fade {
        from { opacity:0; transform: translateX(-50%) translateY(-8px); }
        to   { opacity:1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(banner);
  }
});
const _THEME_EMOJIS = {
  winter:    { emojis: ['❄️','❄️','❄️','🌨️','❄️'], count: 35 },
  christmas: { emojis: ['❄️','🎄','🎅','⭐','🎁','❄️'], count: 28 },
  halloween: { emojis: ['🎃','🕷️','💀','🦇','👻','🕸️'], count: 25 },
  valentine: { emojis: ['❤️','💕','💖','💗','🌹','💝'], count: 28 },
};

document.addEventListener('DOMContentLoaded', () => {
  if (_THEME_EMOJIS[GLOBAL_THEME]) {
    const { emojis, count } = _THEME_EMOJIS[GLOBAL_THEME];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.classList.add('theme-particle');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const size = Math.random() * 16 + 12;
      el.style.cssText = `left:${Math.random()*100}%;top:-60px;font-size:${size}px;animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*14}s;`;
      document.body.appendChild(el);
    }
  }
});
