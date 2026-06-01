const app = document.getElementById('app');

const STORAGE_KEY = 'bonefaunaOriginsArchiveV03';
const LORE_KEY = 'bonefaunaOriginsLoreV03';

const species = [
  { name: 'Proto-Raptor', classification: 'Predator', traits: ['Adaptive', 'Watchful', 'Pack-Bonded'], silhouette: 'raptor' },
  { name: 'Ashhorn Whelp', classification: 'Predator', traits: ['Resilient', 'Territorial', 'Heat-Touched'], silhouette: 'hornbeast' },
  { name: 'Mireback Hatchling', classification: 'Amphibian', traits: ['Patient', 'Camouflaged', 'Wetland-Born'], silhouette: 'amphibian' },
  { name: 'Glassjaw Strider', classification: 'Grazer', traits: ['Curious', 'Fast', 'Fragile-Boned'], silhouette: 'strider' },
  { name: 'Duskwick Grazer', classification: 'Grazer', traits: ['Gentle', 'Nocturnal', 'Social'], silhouette: 'grazer' },
  { name: 'Cindertail Serpent', classification: 'Reptile', traits: ['Heat-Seeking', 'Silent', 'Burrowing'], silhouette: 'serpent' },
  { name: 'Thornwing Fledgling', classification: 'Avian', traits: ['Alert', 'Gliding', 'Bright-Eyed'], silhouette: 'avian' },
  { name: 'Shellroot Beetle', classification: 'Insectoid', traits: ['Armored', 'Stubborn', 'Root-Fed'], silhouette: 'beetle' },
  { name: 'Blackwater Coil', classification: 'Aquatic', traits: ['Abyssal', 'Pressure-Born', 'Silent'], silhouette: 'aquatic' },
  { name: 'Elderhorn Titan', classification: 'Titan', traits: ['Ancient', 'Massive', 'World-Scarred'], silhouette: 'titan' }
];

const rarityTable = [
  { name: 'Common', weight: 58, note: 'Baseline archive recovery.' },
  { name: 'Uncommon', weight: 25, note: 'Unusual morphology detected.' },
  { name: 'Rare', weight: 12, note: 'Rare behavioral markers present.' },
  { name: 'Ancient', weight: 4, note: 'Pre-collapse genetic echoes detected.' },
  { name: 'Mythic', weight: 0.9, note: 'Archive anomaly: myth-class specimen.' },
  { name: 'Genesis', weight: 0.1, note: 'The archive recognizes this specimen.' }
];

const loreFragments = [
  { id: 'FRAGMENT-01', text: 'The first beasts were not born. They were recovered.' },
  { id: 'FRAGMENT-02', text: 'Before the First Migration, the Titans crossed the Hollow Lands.' },
  { id: 'FRAGMENT-03', text: 'Some fossils remember ecosystems that never survived long enough to become history.' },
  { id: 'FRAGMENT-04', text: 'The Cradle did not create life. It selected what the world had forgotten.' },
  { id: 'FRAGMENT-05', text: 'Predators arrived last, as if the archive feared what balance required.' },
  { id: 'FRAGMENT-06', text: 'Every shell, horn, feather, and fang is a record of pressure.' },
  { id: 'FRAGMENT-07', text: 'The oldest entries are not numbered. They are sealed.' },
  { id: 'FRAGMENT-08', text: 'When the archive dreams, new species appear in the dark.' }
];

const silhouettes = {
  raptor: `<svg viewBox="0 0 360 220" role="img" aria-label="predator silhouette"><path d="M64 134 C105 72 184 62 238 91 C264 105 291 123 330 105 C317 135 281 150 239 135 C215 154 176 160 133 150 L99 190 L73 195 L105 142 C88 142 73 139 64 134 Z"/><path d="M233 88 C256 51 303 45 336 66 C298 68 276 83 260 108 Z"/><path d="M134 149 L123 211 L101 213 L114 150 Z"/><path d="M188 151 L211 210 L189 216 L169 154 Z"/><path d="M71 130 C42 119 23 101 10 78 C48 91 82 99 115 113 Z"/><circle cx="274" cy="83" r="5"/></svg>`,
  hornbeast: `<svg viewBox="0 0 360 220" role="img" aria-label="horned predator silhouette"><path d="M56 129 C77 80 132 58 194 75 C241 88 274 120 283 158 C241 181 156 180 91 156 C70 148 57 140 56 129 Z"/><path d="M257 94 C284 46 330 41 352 73 C316 70 292 92 274 124 Z"/><path d="M258 98 C285 88 319 97 350 128 C316 124 288 128 266 145 Z"/><path d="M94 153 L82 211 L58 214 L70 150 Z"/><path d="M218 162 L236 212 L212 215 L197 165 Z"/><path d="M147 164 L139 213 L116 215 L124 162 Z"/><circle cx="268" cy="112" r="7"/></svg>`,
  amphibian: `<svg viewBox="0 0 360 220" role="img" aria-label="amphibian silhouette"><path d="M64 139 C72 83 128 61 190 82 C238 99 276 132 303 167 C257 182 164 180 91 160 C75 156 66 148 64 139 Z"/><path d="M96 154 C63 164 39 183 16 207 C51 201 87 191 123 165 Z"/><path d="M244 156 C276 171 305 188 344 206 C319 174 286 149 252 139 Z"/><path d="M171 82 C204 43 256 43 290 79 C245 73 213 86 190 107 Z"/><circle cx="210" cy="95" r="7"/></svg>`,
  strider: `<svg viewBox="0 0 360 220" role="img" aria-label="long-legged grazer silhouette"><path d="M73 121 C118 80 185 74 236 99 C259 110 278 122 303 117 C292 143 260 153 228 139 C193 157 134 155 84 133 Z"/><path d="M251 92 C270 58 313 49 344 70 C307 72 284 86 264 108 Z"/><path d="M120 145 L96 215 L72 216 L103 144 Z"/><path d="M178 148 L195 215 L171 216 L157 149 Z"/><path d="M211 143 L258 209 L236 216 L194 147 Z"/><path d="M81 126 C51 129 27 119 8 99 C44 100 78 103 110 114 Z"/></svg>`,
  grazer: `<svg viewBox="0 0 360 220" role="img" aria-label="grazer silhouette"><path d="M50 130 C78 77 139 58 205 77 C262 94 302 131 320 173 C270 191 160 188 82 158 C61 150 50 140 50 130 Z"/><path d="M276 80 C307 36 342 42 356 70 C326 65 302 84 284 116 Z"/><path d="M267 86 C289 58 310 45 334 45 C316 72 300 96 287 126 Z"/><path d="M89 154 L78 215 L53 218 L65 150 Z"/><path d="M231 164 L249 216 L224 218 L206 166 Z"/><path d="M146 166 L136 216 L112 218 L123 164 Z"/></svg>`,
  serpent: `<svg viewBox="0 0 360 220" role="img" aria-label="serpent silhouette"><path d="M20 145 C56 101 113 100 151 129 C180 151 213 154 238 127 C262 101 232 75 198 97 C225 47 296 58 314 107 C329 150 286 193 228 186 C178 180 148 142 104 134 C71 128 45 142 20 169 Z"/><path d="M311 105 C330 90 348 91 358 110 C340 108 324 116 312 132 Z"/><circle cx="318" cy="108" r="6"/></svg>`,
  avian: `<svg viewBox="0 0 360 220" role="img" aria-label="avian silhouette"><path d="M147 125 C174 83 225 75 270 101 C240 115 207 126 175 144 Z"/><path d="M169 126 C128 78 72 58 10 68 C70 108 114 140 155 170 Z"/><path d="M190 132 C244 98 299 78 356 82 C312 121 262 151 206 170 Z"/><path d="M172 143 L162 207 L139 211 L151 150 Z"/><path d="M199 146 L223 206 L201 214 L180 152 Z"/><path d="M260 99 L334 82 L271 123 Z"/></svg>`,
  beetle: `<svg viewBox="0 0 360 220" role="img" aria-label="insectoid silhouette"><path d="M68 128 C72 77 116 53 184 55 C251 58 296 88 304 139 C277 176 216 190 146 174 C98 163 72 147 68 128 Z"/><path d="M184 56 C196 91 194 137 180 177"/><path d="M82 115 L23 87 M80 139 L18 151 M105 163 L54 207"/><path d="M291 116 L348 88 M292 140 L354 153 M267 163 L318 208"/><path d="M140 59 C118 31 81 31 54 53"/><path d="M225 59 C247 31 284 31 311 53"/></svg>`,
  aquatic: `<svg viewBox="0 0 360 220" role="img" aria-label="aquatic silhouette"><path d="M42 122 C92 67 177 62 252 95 C285 110 315 135 350 156 C307 165 275 155 244 137 C194 164 116 159 58 132 Z"/><path d="M78 122 L20 76 L40 137 Z"/><path d="M176 82 L199 37 L207 94 Z"/><path d="M181 151 L205 202 L213 144 Z"/><circle cx="278" cy="106" r="6"/></svg>`,
  titan: `<svg viewBox="0 0 360 220" role="img" aria-label="titan silhouette"><path d="M35 132 C61 63 135 37 222 55 C293 70 337 116 353 174 C288 199 164 201 70 162 C47 152 35 142 35 132 Z"/><path d="M238 52 C260 22 302 13 340 37 C301 39 270 56 248 83 Z"/><path d="M258 61 C295 30 330 31 356 57 C319 56 291 72 268 101 Z"/><path d="M80 158 L69 219 L38 219 L52 151 Z"/><path d="M169 176 L163 219 L132 219 L138 173 Z"/><path d="M266 171 L289 219 L256 219 L234 173 Z"/><circle cx="274" cy="82" r="8"/></svg>`
};

function getArchive() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveArchive(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-60)));
}

function getLore() {
  try { return JSON.parse(localStorage.getItem(LORE_KEY) || '[]'); }
  catch { return []; }
}

function saveLore(entries) {
  localStorage.setItem(LORE_KEY, JSON.stringify([...new Set(entries)]));
}

function randomSeed() {
  return Math.floor(Math.random() * 900000 + 100000);
}

function pickRarity() {
  const total = rarityTable.reduce((sum, r) => sum + r.weight, 0);
  let roll = Math.random() * total;
  for (const rarity of rarityTable) {
    roll -= rarity.weight;
    if (roll <= 0) return rarity;
  }
  return rarityTable[0];
}

function maybeLore(rarity) {
  const chance = {
    Common: 0.04,
    Uncommon: 0.08,
    Rare: 0.22,
    Ancient: 0.55,
    Mythic: 0.85,
    Genesis: 1
  }[rarity.name] || 0.05;

  if (Math.random() > chance) return null;
  return loreFragments[Math.floor(Math.random() * loreFragments.length)];
}

function pickCreature() {
  const seed = randomSeed();
  const creature = species[seed % species.length];
  const rarity = pickRarity();
  const lore = maybeLore(rarity);
  return {
    ...creature,
    seed,
    id: `BFA-${seed}`,
    rarity: rarity.name,
    rarityNote: rarity.note,
    lore
  };
}

function statBar() {
  const archive = getArchive();
  const lore = getLore();
  return `
    <div class="archive-stats">
      <span>Discoveries <strong>${archive.length}</strong></span>
      <span>Lore <strong>${lore.length}/${loreFragments.length}</strong></span>
    </div>
  `;
}

function setPanel(html, extraClass = '') {
  app.className = `screen ${extraClass}`;
  app.innerHTML = `<div class="mist"></div>${statBar()}<section class="panel">${html}</section>`;
}

function navButtons() {
  return `
    <div class="links">
      <button class="link-button" id="archivesBtn">Archives</button>
      <button class="link-button" id="loreBtn">Lore Fragments</button>
      <button class="link-button" id="journalBtn">Studio Journal</button>
      <button class="link-button" id="aboutBtn">About Bonefauna</button>
      <a class="link-button" href="https://www.youtube.com/@BonefaunaStudios" target="_blank" rel="noopener noreferrer">YouTube</a>
    </div>
    <p class="footer-link"><a href="https://github.com/BonefaunaStudios" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="https://bonefaunastudios.itch.io" target="_blank" rel="noopener noreferrer">itch.io</a></p>
  `;
}

function bindNav() {
  document.getElementById('archivesBtn')?.addEventListener('click', showArchives);
  document.getElementById('loreBtn')?.addEventListener('click', showLore);
  document.getElementById('journalBtn')?.addEventListener('click', showJournal);
  document.getElementById('aboutBtn')?.addEventListener('click', showAbout);
}

function showIncubation() {
  setPanel(`
    <div class="egg crack">
      <span class="shard shard-a"></span>
      <span class="shard shard-b"></span>
      <span class="shard shard-c"></span>
    </div>
    <p class="eyebrow">Incubation event detected</p>
    <h1>Awakening...</h1>
    <p class="tagline">The archive remembers what the world forgot.</p>
  `, 'incubating');
  setTimeout(showCreature, 1150);
}

function showCreature() {
  const c = pickCreature();
  const archive = getArchive();
  archive.push({
    id: c.id,
    name: c.name,
    classification: c.classification,
    rarity: c.rarity,
    traits: c.traits,
    silhouette: c.silhouette,
    discoveredAt: new Date().toISOString(),
    loreId: c.lore ? c.lore.id : null
  });
  saveArchive(archive);

  if (c.lore) {
    const lore = getLore();
    lore.push(c.lore.id);
    saveLore(lore);
  }

  setPanel(`
    <div class="creature rarity-${c.rarity.toLowerCase()}" aria-label="newly recovered creature silhouette">${silhouettes[c.silhouette]}</div>
    <p class="eyebrow">Archive Entry ${c.id}</p>
    <div class="card">
      <h2>${c.name}</h2>
      <p class="traits">${c.traits.join(' • ')}</p>
      <div class="meta-grid">
        <div><span>Classification</span><strong>${c.classification}</strong></div>
        <div><span>Rarity</span><strong>${c.rarity}</strong></div>
      </div>
      <p class="small">${c.rarityNote}</p>
      ${c.lore ? `<div class="fragment"><span>${c.lore.id}</span><p>${c.lore.text}</p></div>` : ''}
    </div>
    ${navButtons()}
    <button class="primary" id="hatchAgainBtn">Hatch Again</button>
  `, 'reveal');

  document.getElementById('hatchAgainBtn').addEventListener('click', showIncubation);
  bindNav();
}

function showArchives() {
  const archive = getArchive().slice().reverse();
  setPanel(`
    <p class="eyebrow">Recovered Specimens</p>
    <h1>Archives</h1>
    <div class="archive-list">
      ${archive.length ? archive.map(e => `
        <article class="archive-entry">
          <strong>${e.id}</strong>
          <span>${e.name}</span>
          <small>${e.classification} • ${e.rarity}</small>
        </article>
      `).join('') : '<p class="small">No specimens recovered yet. Touch the fossil egg to begin.</p>'}
    </div>
    <div class="links">
      <button class="link-button" id="backBtn">Return</button>
      <button class="link-button danger" id="clearBtn">Clear Archive</button>
    </div>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showCreature);
  document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Clear local Bonefauna archive discoveries on this device?')) {
      localStorage.removeItem(STORAGE_KEY);
      showArchives();
    }
  });
}

function showLore() {
  const unlocked = getLore();
  setPanel(`
    <p class="eyebrow">Recovered Archive Fragments</p>
    <h1>Lore Fragments</h1>
    <div class="archive-list">
      ${loreFragments.map(f => `
        <article class="archive-entry ${unlocked.includes(f.id) ? '' : 'locked'}">
          <strong>${f.id}</strong>
          <span>${unlocked.includes(f.id) ? f.text : 'Unrecovered fragment'}</span>
          <small>${unlocked.includes(f.id) ? 'Recovered' : 'Locked'}</small>
        </article>
      `).join('')}
    </div>
    <button class="primary" id="backBtn">Return</button>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showCreature);
}

function showJournal() {
  setPanel(`
    <p class="eyebrow">Studio Journal</p>
    <h1>Field Notes</h1>
    <div class="card text-card">
      <p><strong>June 2026:</strong> Bonefauna Origins began as a playable archive portal for Bonefauna Studios.</p>
      <p>The current goal is not to promote unfinished projects, but to establish the atmosphere of the studio: creatures, ecosystems, extinction, emergence, and discovery.</p>
      <p>Future updates will expand specimen types, improve silhouettes, and deepen the archive system.</p>
    </div>
    <button class="primary" id="backBtn">Return</button>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showCreature);
}

function showAbout() {
  setPanel(`
    <p class="eyebrow">About</p>
    <h1>Bonefauna Studios</h1>
    <div class="card text-card">
      <p>Bonefauna Studios explores creature evolution, ecosystems, extinction, emergence, and strange worlds through interactive simulations and games.</p>
      <p><em>Bonefauna: Origins</em> is a tiny playable archive experience: hatch fossil specimens, recover classifications, unlock fragments, and watch the studio world take shape one discovery at a time.</p>
    </div>
    <button class="primary" id="backBtn">Return</button>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showCreature);
}

document.getElementById('startBtn').addEventListener('click', showIncubation);
