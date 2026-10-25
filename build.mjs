// Builds the SVG artwork for my GitHub profile README (github.com/harsh11067):
//   assets/hero.svg, assets/btn-*.svg, assets/flow.svg, assets/stack.svg, assets/eco/<name>.svg, assets/cards/<id>.svg
// Logos come from Simple Icons (CC0). The ecosystems Simple Icons doesn't have are real logos saved as
// assets/eco/<name>.png (from each project's GitHub org / site / CoinGecko listing), rounded to match.
//   node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const siMod = await import(require.resolve('simple-icons', { paths: ['../site'] }));
const si = siMod.siX ? siMod : siMod.default;          // CJS build when resolved this way
const OUT = new URL('./assets/', import.meta.url).pathname;
mkdirSync(OUT + 'cards', { recursive: true }); mkdirSync(OUT + 'eco', { recursive: true });

const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif`;
const MONO = `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const icon = slug => si['si' + slug.charAt(0).toUpperCase() + slug.slice(1)];
const lum = hex => { const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const write = (name, svg) => { writeFileSync(OUT + name, svg); console.log(name.padEnd(24), (svg.length / 1024).toFixed(1) + ' KB'); };

// ---------- hero ----------
const mascot = readFileSync(OUT + '_mascot.webp').toString('base64');
write('hero.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="880" height="240" viewBox="0 0 880 240" role="img" aria-label="Hello, I'm Kumar Harsh. AI and web3 builder.">
<defs>
  <radialGradient id="g1" cx="78%" cy="40%" r="55%"><stop offset="0" stop-color="#2f6bff" stop-opacity=".32"/><stop offset="1" stop-color="#2f6bff" stop-opacity="0"/></radialGradient>
  <radialGradient id="g2" cx="12%" cy="100%" r="60%"><stop offset="0" stop-color="#1fb37a" stop-opacity=".18"/><stop offset="1" stop-color="#1fb37a" stop-opacity="0"/></radialGradient>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1220"/><stop offset="1" stop-color="#070a12"/></linearGradient>
  <clipPath id="r"><rect width="880" height="240" rx="22"/></clipPath>
</defs>
<style>
  .t { font: 700 42px ${FONT}; fill: #f0f4fb; letter-spacing: -1px; }
  .s { font: 500 17px ${FONT}; fill: #a8b6cc; }
  .m { font: 600 14px ${MONO}; fill: #9ff5c6; }
  .d { font: 500 13px ${MONO}; fill: #5f7190; }
  .caret { animation: blink 1.1s steps(1) infinite; }
  .float { animation: float 5s ease-in-out infinite; transform-origin: 768px 120px; }
  @keyframes blink { 50% { opacity: 0; } }
  @keyframes float { 50% { transform: translateY(-6px) rotate(-1.5deg); } }
  @media (prefers-reduced-motion: reduce) { .caret, .float { animation: none; } }
</style>
<g clip-path="url(#r)">
  <rect width="880" height="240" fill="url(#bg)"/><rect width="880" height="240" fill="url(#g1)"/><rect width="880" height="240" fill="url(#g2)"/>
  <g stroke="#ffffff" stroke-opacity=".035">${Array.from({ length: 22 }, (_, i) => `<path d="M${i * 40} 0V240"/>`).join('')}${Array.from({ length: 6 }, (_, i) => `<path d="M0 ${i * 40}H880"/>`).join('')}</g>
  <text x="48" y="58" class="d">harsh_dev@kumarharsh:~$ whoami</text>
  <text x="48" y="112" class="t">Hello, I'm Kumar Harsh</text>
  <text x="48" y="146" class="s">AI + web3 builder · engineering student · hackathon regular</text>
  <rect x="48" y="170" width="290" height="36" rx="18" fill="#0f2a1f" stroke="#1f6b4b" stroke-opacity=".7"/>
  <text x="66" y="193" class="m">❯ irm kumarharsh.online | iex</text>
  <rect x="316" y="181" width="8" height="15" rx="1" fill="#9ff5c6" class="caret"/>
  <g class="float">
    <circle cx="768" cy="120" r="88" fill="#ffffff" fill-opacity=".03" stroke="#ffffff" stroke-opacity=".08"/>
    <image href="data:image/webp;base64,${mascot}" x="692" y="44" width="152" height="152"/>
  </g>
</g>
<rect x=".5" y=".5" width="879" height="239" rx="21.5" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
</svg>`);

// ---------- buttons ----------
const btn = (name, label, glyph, light) => {
  const w = Math.round(label.length * 8.6 + 64);
  write(`btn-${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="44" viewBox="0 0 ${w} 44" role="img" aria-label="${esc(label)}">
<rect x=".5" y=".5" width="${w - 1}" height="43" rx="21.5" fill="${light ? '#ffffff' : '#111827'}" stroke="${light ? '#ffffff' : '#2b3647'}"/>
<g transform="translate(18 12)" fill="${light ? '#0b1220' : '#e6edf3'}">${glyph}</g>
<text x="${w / 2 + 12}" y="28" text-anchor="middle" style="font: 650 15px ${FONT}; fill: ${light ? '#0b1220' : '#e6edf3'}">${esc(label)}</text>
</svg>`);
};
btn('portfolio', 'Portfolio', `<path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-3a15.6 15.6 0 0 0-1.4-4.1A8 8 0 0 1 16.9 6ZM10 2c.8 1.1 1.5 2.4 1.9 4H8.1C8.5 4.4 9.2 3.1 10 2ZM2.3 12a8.2 8.2 0 0 1 0-4h3.4a16.6 16.6 0 0 0 0 4H2.3Zm.8 2h3a15.6 15.6 0 0 0 1.4 4.1A8 8 0 0 1 3.1 14Zm3-8h-3a8 8 0 0 1 4.4-4.1A15.6 15.6 0 0 0 6.1 6ZM10 18c-.8-1.1-1.5-2.4-1.9-4h3.8c-.4 1.6-1.1 2.9-1.9 4Zm2.3-6H7.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4Zm.2 6.1c.6-1.3 1.1-2.6 1.4-4.1h3a8 8 0 0 1-4.4 4.1Zm1.8-6.1a16.6 16.6 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4Z"/>`, true);
btn('x', 'Twitter / X', `<path transform="scale(.83)" d="${icon('x').path}"/>`, false);
btn('email', 'Email', `<path d="M2 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v.4l8 5 8-5V5H2Zm16 2.8-7.5 4.7a1 1 0 0 1-1 0L2 7.8V15h16V7.8Z"/>`, false);

// ---------- core stack: a grid of dark rounded tiles, the skillicons look ----------
const STACK = ['typescript', 'javascript', 'python', 'rust', 'kotlin', 'solidity', 'cplusplus', 'html5',
  'react', 'nextdotjs', 'nodedotjs', 'express', 'hono', 'tailwindcss', 'threedotjs', 'vite',
  'pytorch', 'tensorflow', 'jetpackcompose', 'fastapi', 'mongodb', 'postgresql', 'supabase', 'docker',
  'git', 'github', 'vercel', 'linux', 'blender', 'gsap', 'shadcnui', 'pnpm',
  'c', 'expo', 'scikitlearn', 'pandas', 'streamlit', 'd3', 'webgl', 'mui'];
{
  const C = 8, S = 52, G = 10, W = C * (S + G) - G, rows = Math.ceil(STACK.length / C), H = rows * (S + G) - G;
  let tiles = '';
  STACK.forEach((slug, i) => {
    const ic = icon(slug); if (!ic) throw new Error('no icon ' + slug);
    const col = lum(ic.hex) < 0.22 ? 'ffffff' : ic.hex, x = (i % C) * (S + G), y = Math.floor(i / C) * (S + G);
    tiles += `<g transform="translate(${x} ${y})"><title>${esc(ic.title)}</title><rect width="${S}" height="${S}" rx="12" fill="#242938"/><g transform="translate(${S / 2 - 15} ${S / 2 - 15}) scale(1.25)" fill="#${col}"><path d="${ic.path}"/></g></g>`;
  });
  write('stack.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Core stack: ${STACK.map(s => icon(s).title).join(', ')}">${tiles}</svg>`);
}

// ---------- ecosystems: one rounded brand tile per logo (Simple Icons ones; the rest are real PNG logos) ----------
// light: logos that read better dark-on-colour
const ECO_SI = { ethereum: '#627eea', polygon: '#7b3fe4', sui: '#4da2ff', solana: 'grad', ipfs: '#65c2cb', neon: '#00e599:dark', supabase: '#1c1c1c:green',
  vercel: '#000000', render: '#ffffff:dark', intel: '#0071c5', wagmi: '#1b1b1b', ethers: '#2535a0', binance: '#f0b90b:dark', googlegemini: '#ffffff:gem',
  modelcontextprotocol: '#ffffff:dark', kaggle: '#20beff', claude: '#d97757' };
for (const [slug, style] of Object.entries(ECO_SI)) {
  const ic = icon(slug); if (!ic) throw new Error('no icon ' + slug);
  const [bg, mode] = style.split(':');
  const fill = mode === 'dark' ? '#111111' : mode === 'green' ? '#3ecf8e' : mode === 'gem' ? 'url(#gem)' : '#ffffff';
  const back = bg === 'grad' ? 'url(#sol)' : bg;
  write(`eco/${slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" role="img" aria-label="${esc(ic.title)}">
<defs><linearGradient id="sol" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#9945ff"/><stop offset="1" stop-color="#14f195"/></linearGradient><linearGradient id="gem" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c7cf4"/><stop offset=".5" stop-color="#8e6ae6"/><stop offset="1" stop-color="#e86a7c"/></linearGradient></defs>
<rect width="96" height="96" rx="20" fill="${back}"/><g transform="translate(24 24) scale(2)" fill="${fill}"><path d="${ic.path}"/></g></svg>`);
}

// ---------- how I build: idea to ship, with a pulse running along the line ----------
{
  const STEPS = [['💡', 'Imagine'], ['📚', 'Learn'], ['🔥', 'Commit'], ['📐', 'Design'], ['🎬', 'Direct'], ['🧪', 'Test'], ['🚀', 'Ship']];
  const W = 880, H = 118, step = (W - 80) / (STEPS.length - 1);
  let nodes = '';
  STEPS.forEach(([e, l], i) => {
    const x = 40 + i * step;
    nodes += `<g><circle cx="${x}" cy="44" r="25" fill="#0f1726" stroke="#2b4a7a"/><circle class="ring" style="animation-delay:${(i * 0.5).toFixed(1)}s" cx="${x}" cy="44" r="25" fill="none" stroke="#5fe08a" stroke-width="2"/><text x="${x}" y="52" text-anchor="middle" font-size="22">${e}</text><text x="${x}" y="98" text-anchor="middle" class="l">${l}</text></g>`;
  });
  write('flow.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="How I build: imagine, learn, commit, design, direct, test, ship">
<style>.l { font: 650 13px ${FONT}; fill: #c9d3e3; } .ring { opacity: 0; animation: ping 3.5s ease-out infinite; } .dot { animation: run 3.5s linear infinite; }
@keyframes ping { 0%, 100% { opacity: 0; } 4% { opacity: 1; } 18% { opacity: 0; } } @keyframes run { from { transform: translateX(0); } to { transform: translateX(${W - 80}px); } }
@media (prefers-reduced-motion: reduce) { .ring, .dot { animation: none; } }</style>
<path d="M40 44H${W - 40}" stroke="#2b4a7a" stroke-width="2" stroke-dasharray="4 6"/>
<circle class="dot" cx="40" cy="44" r="4" fill="#5fe08a"/>
${nodes}
</svg>`);
}

// ---------- selected projects: one card each ----------
const CARDS = [
  { id: 'helix', title: 'HELIX', tag: 'Conviction-native finance on Sui', ev: 'Sui Overflow 2026 · Agentic Web', badge: '🏆 Namespace winner · $45 · Top 100', accent: '#4da2ff', stack: ['Sui Move', 'DeepBook', 'Walrus', 'Seal', 'TEE'] },
  { id: 'skinnova', title: 'SkinNova', tag: 'Offline skin checks on your phone, in English & Hindi', ev: 'On-device AI · Android', badge: '🧠 Gemma 4 fine-tune, fully offline', accent: '#8b7cff', stack: ['Kotlin', 'Compose', 'Gemma 4', 'LiteRT', 'PyTorch'] },
  { id: 'mara', title: 'MARA', tag: 'A macro-aware research & execution agent', ev: 'AKINDO wave · SoSoValue track', badge: '🎯 Top 15 · USD pending', accent: '#ff7a59', stack: ['Next.js 15', 'Gemini', 'MCP', 'SoDEX', 'Solidity'] },
  { id: 'defimosaic', title: 'DeFi Mosaic', tag: 'A gamified trading universe on real markets', ev: 'Polygon hackathon · AKINDO', badge: '🏆 Winner · 278 USDC', accent: '#3ddc97', stack: ['Next.js 15', 'Solidity', 'Polygon', 'wagmi', 'Supabase'] }
];
for (const c of CARDS) {
  const W = 430, H = 196;
  let cx = 24, chips = '';
  for (const s of c.stack) { const w = Math.round(s.length * 6.6 + 18); if (cx + w > W - 20) break; chips += `<rect x="${cx}" y="150" width="${w}" height="24" rx="12" fill="#ffffff" fill-opacity=".06" stroke="#ffffff" stroke-opacity=".1"/><text x="${cx + w / 2}" y="166" text-anchor="middle" class="c">${esc(s)}</text>`; cx += w + 6; }
  const bw = Math.round([...c.badge].length * 6.9 + 22);
  write(`cards/${c.id}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.title)}: ${esc(c.tag)}">
<defs><radialGradient id="a" cx="92%" cy="0%" r="85%"><stop offset="0" stop-color="${c.accent}" stop-opacity=".34"/><stop offset="1" stop-color="${c.accent}" stop-opacity="0"/></radialGradient></defs>
<style>.t { font: 750 24px ${FONT}; fill: #f0f4fb; letter-spacing: -.4px; } .g { font: 500 14px ${FONT}; fill: #b9c4d6; } .e { font: 600 11.5px ${MONO}; fill: #7d8ba3; letter-spacing: .3px; } .b { font: 650 12px ${FONT}; fill: ${c.accent}; } .c { font: 600 11px ${FONT}; fill: #c9d3e3; }</style>
<rect width="${W}" height="${H}" rx="18" fill="#0b1018"/><rect width="${W}" height="${H}" rx="18" fill="url(#a)"/>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="17.5" fill="none" stroke="${c.accent}" stroke-opacity=".35"/>
<text x="24" y="38" class="e">${esc(c.ev.toUpperCase())}</text>
<text x="24" y="72" class="t">${esc(c.title)}</text>
<text x="${W - 24}" y="40" text-anchor="end" style="font: 600 18px ${FONT}; fill: ${c.accent}">↗</text>
<text x="24" y="98" class="g">${esc(c.tag)}</text>
<rect x="24" y="112" width="${bw}" height="26" rx="13" fill="${c.accent}" fill-opacity=".12" stroke="${c.accent}" stroke-opacity=".45"/>
<text x="${24 + bw / 2}" y="129" text-anchor="middle" class="b">${esc(c.badge)}</text>
${chips}
</svg>`);
}
