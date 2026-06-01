const app = document.getElementById('app');
const ARCHIVE_KEY = 'bonefaunaOriginsArchiveV02';
const FRAGMENT_KEY = 'bonefaunaOriginsFragmentsV02';

const species = [
  { name: 'Proto-Raptor', classification: 'Predator', traits: ['Adaptive', 'Watchful', 'Pack-Bonded'], silhouette: 'raptor' },
  { name: 'Ashhorn Whelp', classification: 'Titan-Kin', traits: ['Resilient', 'Territorial', 'Heat-Touched'], silhouette: 'hornbeast' },
  { name: 'Mireback Hatchling', classification: 'Amphibian', traits: ['Patient', 'Camouflaged', 'Wetland-Born'], silhouette: 'amphibian' },
  { name: 'Glassjaw Strider', classification: 'Strider', traits: ['Curious', 'Fast', 'Fragile-Boned'], silhouette: 'strider' },
  { name: 'Duskwick Grazer', classification: 'Grazer', traits: ['Gentle', 'Nocturnal', 'Social'], silhouette: 'grazer' },
  { name: 'Cindertail Serpent', classification: 'Reptile', traits: ['Heat-Seeking', 'Silent', 'Burrowing'], silhouette: 'serpent' },
  { name: 'Thornwing Fledgling', classification: 'Avian', traits: ['Alert', 'Gliding', 'Bright-Eyed'], silhouette: 'avian' },
  { name: 'Shellroot Beetle', classification: 'Insectoid', traits: ['Armored', 'Stubborn', 'Root-Fed'], silhouette: 'beetle' }
];

const rarities = [
  { name: 'Common', weight: 58, note: 'Baseline archive recovery.' },
  { name: 'Uncommon', weight: 24, note: 'Unusual morphology detected.' },
  { name: 'Rare', weight: 11, note: 'Fragmented lineage signal recovered.' },
  { name: 'Ancient', weight: 5, note: 'Pre-collapse genetic echo detected.' },
  { name: 'Mythic', weight: 1.7, note: 'Archive integrity unstable around specimen.' },
  { name: 'Genesis', weight: 0.3, note: 'The archive recognizes this specimen.' }
];

const loreFragments = [
  'The first beasts emerged beneath the Cradle, unnamed and unfinished.',
  'Some fossils remember worlds that never existed.',
  'The Archives predate written history and outlast every extinction.',
  'The Titans vanished before the First Migration. Their bones still hum.',
  'Not every specimen was born. Some were assembled by pressure, time, and error.',
  'A living ecosystem is only a memory that learned to defend itself.'
];

const links = [
  ['Archives', 'archive'],
  ['Lore Fragments', 'lore'],
  ['Studio Journal', 'journal'],
  ['GitHub', 'https://github.com/BonefaunaStudios'],
  ['YouTube', 'https://www.youtube.com/@BonefaunaStudios']
];

const silhouettes = {
  raptor: `
    <svg viewBox="0 0 360 220" role="img" aria-label="raptor silhouette">
      <path d="M76 126 C112 80 176 68 225 89 C254 101 281 121 314 113 C301 138 264 143 235 130 C215 143 187 151 153 145 L122 174 L95 180 L121 139 C101 137 86 132 76 126 Z" />
      <path d="M232 83 C255 52 292 47 318 63 C290 66 274 78 262 97 Z" />
      <path d="M153 143 L142 199 L123 204 L135 145 Z" />
      <path d="M190 144 L208 197 L190 203 L175 150 Z" />
      <path d="M80 124 C50 119 30 105 17 86 C54 96 82 100 107 111 Z" />
    </svg>`,
  hornbeast: `
    <svg viewBox="0 0 360 220" role="img" aria-label="horned beast silhouette">
      <path d="M67 125 C82 83 127 63 181 74 C226 83 258 111 267 147 C226 169 153 172 99 151 C82 145 70 136 67 125 Z" />
      <path d="M251 98 C275 55 322 48 345 74 C308 73 283 91 268 116 Z" />
      <path d="M261 105 C290 98 317 105 339 129 C305 125 282 127 263 139 Z" />
      <path d="M90 147 L78 200 L59 202 L69 144 Z" />
      <path d="M212 157 L226 201 L205 203 L193 162 Z" />
      <circle cx="259" cy="111" r="7" />
    </svg>`,
  amphibian: `
    <svg viewBox="0 0 360 220" role="img" aria-label="amphibian silhouette">
      <path d="M77 137 C83 87 130 66 184 83 C233 99 265 129 286 161 C245 172 170 171 106 157 C91 154 80 146 77 137 Z" />
      <path d="M104 151 C70 161 45 178 24 202 C55 196 86 189 119 164 Z" />
      <path d="M238 153 C267 168 292 184 324 200 C303 171 276 149 247 138 Z" />
      <path d="M178 80 C204 49 248 48 276 76 C238 72 211 82 191 100 Z" />
      <circle cx="206" cy="93" r="7" />
    </svg>`,
  strider: `
    <svg viewBox="0 0 360 220" role="img" aria-label="long-legged strider silhouette">
      <path d="M85 119 C124 82 184 75 229 98 C249 108 264 120 286 117 C276 139 249 146 223 137 C192 154 141 153 96 133 Z" />
      <path d="M245 93 C261 62 300 51 330 70 C297 72 278 84 260 105 Z" />
      <path d="M126 143 L105 207 L84 207 L111 142 Z" />
      <path d="M180 146 L194 208 L173 208 L161 148 Z" />
      <path d="M211 141 L251 202 L232 208 L195 146 Z" />
      <path d="M91 125 C59 127 36 118 17 100 C50 101 80 103 107 113 Z" />
    </svg>`,
  grazer: `
    <svg viewBox="0 0 360 220" role="img" aria-label="grazing creature silhouette">
      <path d="M63 129 C87 83 139 65 195 79 C249 93 285 125 302 164 C256 181 166 179 95 156 C74 149 62 140 63 129 Z" />
      <path d="M262 82 C288 42 326 40 345 68 C315 64 292 82 276 111 Z" />
      <path d="M258 89 C276 62 292 50 313 48 C299 70 287 91 276 117 Z" />
      <path d="M96 154 L88 202 L67 204 L76 148 Z" />
      <path d="M224 162 L236 204 L215 205 L202 164 Z" />
      <path d="M146 164 L139 204 L119 205 L126 162 Z" />
    </svg>`,
  serpent: `
    <svg viewBox="0 0 360 220" role="img" aria-label="serpent silhouette">
      <path d="M32 139 C64 105 111 102 145 128 C171 147 200 151 221 128 C243 105 218 82 190 99 C211 55 274 62 288 107 C300 146 263 183 214 177 C172 172 144 141 108 133 C78 126 55 138 32 162 Z" />
      <path d="M286 105 C315 87 339 91 352 111 C327 107 308 115 291 132 Z" />
      <circle cx="299" cy="108" r="6" />
    </svg>`,
  avian: `
    <svg viewBox="0 0 360 220" role="img" aria-label="winged creature silhouette">
      <path d="M149 125 C172 87 219 77 258 101 C232 114 204 123 175 141 Z" />
      <path d="M170 126 C132 84 80 64 22 72 C76 108 114 136 154 166 Z" />
      <path d="M189 132 C238 101 288 81 345 83 C303 119 257 147 205 166 Z" />
      <path d="M173 141 L164 195 L145 199 L155 148 Z" />
      <path d="M199 144 L218 194 L201 201 L182 151 Z" />
      <path d="M254 100 L316 85 L266 120 Z" />
    </svg>`,
  beetle: `
    <svg viewBox="0 0 360 220" role="img" aria-label="armored beetle silhouette">
      <path d="M82 126 C85 83 122 62 181 64 C239 66 278 91 285 134 C263 164 209 178 149 166 C110 158 86 144 82 126 Z" />
      <path d="M180 65 C190 94 190 132 178 168" />
      <path d="M91 116 L40 92 M91 137 L35 146 M111 157 L63 190" />
      <path d="M270 117 L322 94 M270 138 L326 150 M250 158 L295 192" />
      <path d="M142 68 C124 45 93 43 70 60" />
      <path d="M219 68 C237 45 268 43 291 60" />
    </svg>`
};

function getArchive() {
  try { return JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || []; }
  catch { return []; }
}

function saveArchive(entry) {
  const archive = getArchive();
  archive.unshift(entry);
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive.slice(0, 50)));
}

function getFragments() {
  try { return JSON.parse(localStorage.getItem(FRAGMENT_KEY)) || []; }
  catch { return []; }
}

function saveFragment(fragment) {
  const fragments = getFragments();
  if (!fragments.includes(fragment)) {
    fragments.unshift(fragment);
    localStorage.setItem(FRAGMENT_KEY, JSON.stringify(fragments));
  }
}

function pickWeighted(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[0];
}

function pickCreature() {
  const seed = Math.floor(Math.random() * 900000 + 100000);
  const creature = species[seed % species.length];
  const rarity = pickWeighted(rarities);
  const hasFragment = ['Ancient', 'Mythic', 'Genesis'].includes(rarity.name) || Math.random() < 0.08;
  const fragment = hasFragment ? loreFragments[Math.floor(Math.random() * loreFragments.length)] : null;
  return { ...creature, seed, rarity: rarity.name, rarityNote: rarity.note, fragment, discoveredAt: new Date().toISOString() };
}

function setPanel(html) {
  app.innerHTML = '<div class="mist"></div><section class="panel">' + html + '</section>';
}

function showIntro() {
  setPanel(`
    <div class="brand-mark">B</div>
    <p class="eyebrow">Bonefauna Studios presents</p>
    <h1>Bonefauna: Origins</h1>
    <p class="tagline">Creature systems. Strange worlds.</p>
    <div class="archive-count">Archive Discoveries: ${getArchive().length}</div>
    <button id="startBtn" class="primary">Touch the Egg</button>
    <div class="links compact">
      <button class="link-button" data-view="archive">Archives</button>
      <button class="link-button" data-view="lore">Lore Fragments</button>
      <button class="link-button" data-view="journal">Studio Journal</button>
    </div>
  `);
  document.getElementById('startBtn').addEventListener('click', showIncubation);
  bindInternalButtons();
}

function showIncubation() {
  setPanel(`
    <div class="egg crack"></div>
    <p class="eyebrow">Incubation event detected</p>
    <h1>Awakening...</h1>
    <p class="tagline">The archive remembers what the world forgot.</p>
  `);
  setTimeout(showCreature, 950);
}

function showCreature() {
  const c = pickCreature();
  saveArchive(c);
  if (c.fragment) saveFragment(c.fragment);

  setPanel(`
    <div class="creature rarity-${c.rarity.toLowerCase()}" aria-label="newly hatched creature silhouette">${silhouettes[c.silhouette]}</div>
    <p class="eyebrow">Archive Entry BFA-${c.seed}</p>
    <div class="card">
      <h2>${c.name}</h2>
      <p class="traits">${c.traits.join(' • ')}</p>
      <div class="meta-grid">
        <div><span>Classification</span><strong>${c.classification}</strong></div>
        <div><span>Rarity</span><strong>${c.rarity}</strong></div>
      </div>
      <p class="small">${c.rarityNote}</p>
      ${c.fragment ? `<div class="fragment"><span>Archive Fragment</span><p>“${c.fragment}”</p></div>` : ''}
    </div>
    <div class="links">
      ${links.map(([label, target]) => target.startsWith('http')
        ? `<a class="link-button" href="${target}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : `<button class="link-button" data-view="${target}">${label}</button>`).join('')}
    </div>
    <button class="primary" id="hatchAgainBtn">Hatch Again</button>
  `);
  document.getElementById('hatchAgainBtn').addEventListener('click', showIncubation);
  bindInternalButtons();
}

function showArchive() {
  const archive = getArchive();
  const items = archive.length
    ? archive.map(entry => `
      <article class="archive-item">
        <strong>BFA-${entry.seed}</strong>
        <span>${entry.name}</span>
        <small>${entry.classification} • ${entry.rarity}</small>
      </article>`).join('')
    : '<p class="small">No specimens recovered yet. Touch the egg to begin the archive.</p>';

  setPanel(`
    <p class="eyebrow">Bonefauna Archives</p>
    <h1>Recovered Specimens</h1>
    <p class="tagline">Local archive records stored on this device.</p>
    <div class="archive-list">${items}</div>
    <button class="primary" id="backBtn">Return</button>
  `);
  document.getElementById('backBtn').addEventListener('click', showIntro);
}

function showLore() {
  const fragments = getFragments();
  const items = fragments.length
    ? fragments.map((fragment, index) => `<article class="fragment wide"><span>Archive Fragment ${String(index + 1).padStart(2, '0')}</span><p>“${fragment}”</p></article>`).join('')
    : '<p class="small">No lore fragments recovered yet. Ancient, Mythic, and Genesis specimens are more likely to reveal fragments.</p>';

  setPanel(`
    <p class="eyebrow">Recovered Lore</p>
    <h1>Lore Fragments</h1>
    <div class="archive-list">${items}</div>
    <button class="primary" id="backBtn">Return</button>
  `);
  document.getElementById('backBtn').addEventListener('click', showIntro);
}

function showJournal() {
  setPanel(`
    <p class="eyebrow">Studio Journal</p>
    <h1>Bonefauna Archives Online</h1>
    <div class="card journal-card">
      <p>The Bonefauna Archives are an early interactive landing experience for Bonefauna Studios.</p>
      <p>Rather than point visitors at unfinished projects, the archive introduces the studio through creature discovery, fossil records, classifications, rarities, and fragments of an emerging world.</p>
      <p class="small">Current build: v0.2 Archive Systems</p>
    </div>
    <div class="links">
      <a class="link-button" href="https://github.com/BonefaunaStudios" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a class="link-button" href="https://www.youtube.com/@BonefaunaStudios" target="_blank" rel="noopener noreferrer">YouTube</a>
      <a class="link-button" href="https://bonefaunastudios.itch.io" target="_blank" rel="noopener noreferrer">itch.io</a>
    </div>
    <button class="primary" id="backBtn">Return</button>
  `);
  document.getElementById('backBtn').addEventListener('click', showIntro);
}

function bindInternalButtons() {
  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      const view = button.getAttribute('data-view');
      if (view === 'archive') showArchive();
      if (view === 'lore') showLore();
      if (view === 'journal') showJournal();
    });
  });
}

showIntro();
