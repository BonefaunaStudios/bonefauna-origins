const app = document.getElementById('app');

const STORAGE_KEY = 'bonefaunaOriginsArchiveV051';
const LEGACY_STORAGE_KEYS = ['bonefaunaOriginsArchiveV043', 'bonefaunaOriginsArchiveV04', 'bonefaunaOriginsArchiveV03'];
const LORE_KEY = 'bonefaunaOriginsLoreV051';
const LEGACY_LORE_KEYS = ['bonefaunaOriginsLoreV043', 'bonefaunaOriginsLoreV04', 'bonefaunaOriginsLoreV03'];
const ACHIEVEMENTS_KEY = 'bonefaunaOriginsAchievementsV051';
const LEGACY_ACHIEVEMENT_KEYS = ['bonefaunaOriginsAchievementsV043', 'bonefaunaOriginsAchievementsV04'];

const classifications = ['Predator', 'Grazer', 'Avian', 'Aquatic', 'Insectoid', 'Reptile', 'Amphibian', 'Titan'];

const eggTypes = {
  wild: {
    label: 'Wild Egg',
    description: 'Balanced recovery across the full archive.',
    classes: classifications,
    rarityBias: 1
  },
  deep: {
    label: 'Deep Egg',
    description: 'Higher chance for aquatic, amphibian, and reptile recoveries.',
    classes: ['Aquatic', 'Amphibian', 'Reptile'],
    rarityBias: 1.04
  },
  sky: {
    label: 'Sky Egg',
    description: 'Higher chance for avian and fast-moving grazer recoveries.',
    classes: ['Avian', 'Grazer'],
    rarityBias: 1.02
  },
  ancient: {
    label: 'Ancient Egg',
    description: 'Higher chance for titan and rare archive signals.',
    classes: ['Titan', 'Predator', 'Reptile'],
    rarityBias: 1.18
  }
};

const classEffects = {
  Predator: 'effect-predator',
  Grazer: 'effect-grazer',
  Avian: 'effect-avian',
  Aquatic: 'effect-aquatic',
  Insectoid: 'effect-insectoid',
  Reptile: 'effect-reptile',
  Amphibian: 'effect-amphibian',
  Titan: 'effect-titan'
};


const silhouetteFiles = {
  Predator_Raptor: 'Predator_Raptor.svg',
  Predator_Stalker: 'Predator_Stalker.svg',
  Predator_Saber: 'Predator_Saber.svg',

  Grazer_Hornback: 'Grazer_Hornback.svg',
  Grazer_Longneck: 'Grazer_Longneck.svg',
  Grazer_Herdrunner: 'Grazer_Herdrunner.svg',

  Avian_Glider: 'Avian_Glider.svg',
  Avian_Skyhunter: 'Avian_Skyhunter.svg',

  Aquatic_Coil: 'Aquatic_Coil.svg',
  Aquatic_Leviathan: 'Aquatic_Leviathan.svg',

  Insectoid_Beetle: 'Insectoid_Beetle.svg',

  Reptile_Crocodilian: 'Reptile_Crocodilian.svg',
  Reptile_Frilled: 'Reptile_Frilled.svg',
  Reptile_Spined: 'Reptile_Spined.svg',

  Amphibian_Mireback: 'Amphibian_Mireback.svg',
  Amphibian_BogLeaper: 'Amphibian_BogLeaper.svg',

  Titan_Colossus: 'Titan_Colossus.svg',
  Titan_Worldwalker: 'Titan_Worldwalker.svg'
};

const species = [
  { name: 'Proto-Raptor', classification: 'Predator', traits: ['Adaptive', 'Watchful', 'Pack-Bonded'], silhouette: 'Predator_Raptor', note: 'A fast pursuit predator reconstructed from fragmented limb and tail records.' },
  { name: 'Nightglass Stalker', classification: 'Predator', traits: ['Patient', 'Low-Slung', 'Ambush-Born'], silhouette: 'Predator_Stalker', note: 'Its anatomy suggests stillness was as important as speed.' },
  { name: 'Ashfang Saber', classification: 'Predator', traits: ['Dominant', 'Heavy-Jawed', 'Territorial'], silhouette: 'Predator_Saber', note: 'Recovered jaw profiles show extreme specialization for close-range takedowns.' },

  { name: 'Hornback Grazer', classification: 'Grazer', traits: ['Protective', 'Social', 'Resilient'], silhouette: 'Grazer_Hornback', note: 'A herd defender, built around pressure, mass, and warning display.' },
  { name: 'Duskwick Longneck', classification: 'Grazer', traits: ['Enduring', 'High-Browser', 'Gentle'], silhouette: 'Grazer_Longneck', note: 'Its browsing posture implies a canopy layer that may no longer exist.' },
  { name: 'Glassjaw Herdrunner', classification: 'Grazer', traits: ['Migratory', 'Alert', 'Fast'], silhouette: 'Grazer_Herdrunner', note: 'A lightweight grazer shaped by distance and constant movement.' },

  { name: 'Thornwing Glider', classification: 'Avian', traits: ['Gliding', 'Far-Sighted', 'Wind-Born'], silhouette: 'Avian_Glider', note: 'Recovered wing spans suggest long-distance movement between archive biomes.' },
  { name: 'Hookbeak Skyhunter', classification: 'Avian', traits: ['Precise', 'Predatory', 'Watchful'], silhouette: 'Avian_Skyhunter', note: 'Aerial predator records remain unusually intact compared with other avian classes.' },

  { name: 'Blackwater Coil', classification: 'Aquatic', traits: ['Abyssal', 'Pressure-Born', 'Silent'], silhouette: 'Aquatic_Coil', note: 'Its recovery signature is usually found near drowned archive layers.' },
  { name: 'Pale Leviathan', classification: 'Aquatic', traits: ['Colossal', 'Deepwater', 'Ancient'], silhouette: 'Aquatic_Leviathan', note: 'The archive marks this creature as marine, but its scale estimates remain unstable.' },

  { name: 'Shellroot Beetle', classification: 'Insectoid', traits: ['Armored', 'Stubborn', 'Root-Fed'], silhouette: 'Insectoid_Beetle', note: 'Its carapace appears in multiple archive layers, suggesting long evolutionary persistence.' },

  { name: 'Mirejaw Crocodilian', classification: 'Reptile', traits: ['Heavy-Bodied', 'Patient', 'Semi-Aquatic'], silhouette: 'Reptile_Crocodilian', note: 'A shoreline ambush reptile recovered from wetland sediment records.' },
  { name: 'Cinderfrill Reptile', classification: 'Reptile', traits: ['Display-Born', 'Heat-Seeking', 'Defensive'], silhouette: 'Reptile_Frilled', note: 'The frill appears defensive, but signal behavior cannot be ruled out.' },
  { name: 'Spineback Saurian', classification: 'Reptile', traits: ['Spined', 'Sun-Drawn', 'Territorial'], silhouette: 'Reptile_Spined', note: 'Dorsal spines indicate either temperature control or threat display.' },

  { name: 'Mireback Hatchling', classification: 'Amphibian', traits: ['Patient', 'Camouflaged', 'Wetland-Born'], silhouette: 'Amphibian_Mireback', note: 'Soft-body archive recovery is rare; this specimen may be an unusually stable reconstruction.' },
  { name: 'Bog Leaper', classification: 'Amphibian', traits: ['Spring-Limbed', 'Nocturnal', 'Rain-Called'], silhouette: 'Amphibian_BogLeaper', note: 'Leg ratios suggest explosive movement through dense wetland cover.' },

  { name: 'Elderhorn Colossus', classification: 'Titan', traits: ['Ancient', 'Massive', 'World-Scarred'], silhouette: 'Titan_Colossus', note: 'A titan-class recovery. Size estimates exceed normal archive confidence limits.' },
  { name: 'Worldwalker Titan', classification: 'Titan', traits: ['Monumental', 'Slow-Blooded', 'Myth-Scale'], silhouette: 'Titan_Worldwalker', note: 'Some records describe this class as terrain before they describe it as fauna.' }
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
  { id: 'FRAGMENT-08', text: 'When the archive dreams, new species appear in the dark.' },
  { id: 'FRAGMENT-09', text: 'Some classifications were invented after the creatures had already escaped them.' },
  { id: 'FRAGMENT-10', text: 'A Genesis signal does not mean origin. It means recognition.' }
];

const corruptionMessages = [
  ['Archive signal lost', 'Record corrupted'],
  ['Fragment checksum failed', 'Recovery pending'],
  ['Biological record incomplete', 'Data layer damaged'],
  ['Transmission buried', 'Signal occluded'],
  ['Memory strand severed', 'Archive sealed'],
  ['Specimen context missing', 'Record unstable'],
  ['Recovery trace unreadable', 'Signal dormant'],
  ['Cradle imprint fractured', 'Access denied'],
  ['Field note dissolved', 'Memory layer collapsed'],
  ['Archive residue detected', 'Fragment locked']
];

const achievementDefinitions = [
  { id: 'FIRST_DISCOVERY', title: 'First Recovery', description: 'Recover your first archive specimen.', test: ({ archive }) => archive.length >= 1 },
  { id: 'TEN_DISCOVERIES', title: 'Field Archivist', description: 'Recover 10 archive specimens.', test: ({ archive }) => archive.length >= 10 },
  { id: 'TWENTY_FIVE_DISCOVERIES', title: 'Archive Custodian', description: 'Recover 25 archive specimens.', test: ({ archive }) => archive.length >= 25 },
  { id: 'FIRST_PREDATOR', title: 'Predator Signal', description: 'Recover a Predator specimen.', test: ({ archive }) => archive.some(e => e.classification === 'Predator') },
  { id: 'FIRST_GRAZER', title: 'Herd Echo', description: 'Recover a Grazer specimen.', test: ({ archive }) => archive.some(e => e.classification === 'Grazer') },
  { id: 'FIRST_TITAN', title: 'Titan Trace', description: 'Recover a Titan specimen.', test: ({ archive }) => archive.some(e => e.classification === 'Titan') },
  { id: 'ALL_CLASSES', title: 'Ecosystem Outline', description: 'Recover at least one specimen from every classification.', test: ({ classesFound }) => classesFound.length >= classifications.length },
  { id: 'FIRST_MYTHIC', title: 'Myth-Class Recovery', description: 'Recover a Mythic specimen.', test: ({ archive }) => archive.some(e => e.rarity === 'Mythic') },
  { id: 'FIRST_GENESIS', title: 'Genesis Recognition', description: 'Recover a Genesis specimen.', test: ({ archive }) => archive.some(e => e.rarity === 'Genesis') },
  { id: 'ALL_LORE', title: 'Recovered Memory', description: 'Recover every lore fragment.', test: ({ lore }) => lore.length >= loreFragments.length }
];

let lastEntry = null;
let activeArchiveFilter = 'All';

function safeJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}

function migrateList(targetKey, legacyKeys) {
  if (localStorage.getItem(targetKey)) return;
  for (const key of legacyKeys) {
    const value = localStorage.getItem(key);
    if (value) {
      localStorage.setItem(targetKey, value);
      return;
    }
  }
}

function migrateIfNeeded() {
  migrateList(STORAGE_KEY, LEGACY_STORAGE_KEYS);
  migrateList(LORE_KEY, LEGACY_LORE_KEYS);
  migrateList(ACHIEVEMENTS_KEY, LEGACY_ACHIEVEMENT_KEYS);
}

function getArchive() {
  migrateIfNeeded();
  const entries = safeJson(STORAGE_KEY, []);
  return entries.filter(e => e && e.id && e.name);
}

function saveArchive(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-160)));
}

function getLore() {
  migrateIfNeeded();
  return [...new Set(safeJson(LORE_KEY, []))];
}

function saveLore(entries) {
  localStorage.setItem(LORE_KEY, JSON.stringify([...new Set(entries)]));
}

function getAchievements() {
  migrateIfNeeded();
  return [...new Set(safeJson(ACHIEVEMENTS_KEY, []))];
}

function saveAchievements(entries) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify([...new Set(entries)]));
}

function randomSeed() {
  return Math.floor(Math.random() * 900000 + 100000);
}

function randomBetween(min, max, decimals = 2) {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function pickFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createVisualVariation(specimen, rarity) {
  const rareBoost = ['Rare', 'Ancient', 'Mythic', 'Genesis'].includes(rarity.name) ? 1 : 0;
  const classHue = {
    Predator: -8,
    Grazer: 10,
    Avian: 18,
    Aquatic: -20,
    Insectoid: 28,
    Reptile: 6,
    Amphibian: -12,
    Titan: 0
  }[specimen.classification] || 0;

  return {
    hue: Math.round(classHue + randomBetween(-10, 10, 0)),
    sepia: randomBetween(0.22, 0.52 + rareBoost * 0.12),
    brightness: randomBetween(0.94, 1.12 + rareBoost * 0.08),
    contrast: randomBetween(0.96, 1.18),
    scale: randomBetween(0.96, 1.05),
    rotate: randomBetween(-2.2, 2.2),
    scan: randomBetween(0.85, 1.25)
  };
}

function visualStyle(visual = {}) {
  const hue = visual.hue ?? 0;
  const sepia = visual.sepia ?? 0.35;
  const brightness = visual.brightness ?? 1;
  const contrast = visual.contrast ?? 1.05;
  const scale = visual.scale ?? 1;
  const rotate = visual.rotate ?? 0;
  const scan = visual.scan ?? 1;
  return `--bf-hue:${hue}deg;--bf-sepia:${sepia};--bf-brightness:${brightness};--bf-contrast:${contrast};--bf-scale:${scale};--bf-rotate:${rotate}deg;--bf-scan-speed:${scan}s;`;
}

function silhouettePath(key) {
  const filename = silhouetteFiles[key];
  if (!filename) return '';
  return `assets/silhouettes/${filename}`;
}

function uniqueValues(entries, key) {
  return [...new Set(entries.map(e => e[key]).filter(Boolean))];
}

function completionStats() {
  const archive = getArchive();
  const lore = getLore();
  const achievements = getAchievements();
  const speciesFound = uniqueValues(archive, 'name');
  const classesFound = uniqueValues(archive, 'classification').filter(c => classifications.includes(c));
  return { archive, lore, achievements, speciesFound, classesFound };
}

function evaluateAchievements() {
  const stats = completionStats();
  const current = new Set(stats.achievements);
  let changed = false;
  for (const achievement of achievementDefinitions) {
    if (!current.has(achievement.id) && achievement.test(stats)) {
      current.add(achievement.id);
      changed = true;
    }
  }
  if (changed) saveAchievements([...current]);
  return [...current];
}

function pickRarity(rarityBias = 1) {
  const total = rarityTable.reduce((sum, r) => sum + r.weight, 0);
  let roll = Math.random() * total / Math.max(0.75, rarityBias);
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
  const unlocked = getLore();
  const remaining = loreFragments.filter(f => !unlocked.includes(f.id));
  const pool = remaining.length ? remaining : loreFragments;
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickCreature(eggType = 'wild') {
  const egg = eggTypes[eggType] || eggTypes.wild;
  const seed = randomSeed();
  const pool = species.filter(s => egg.classes.includes(s.classification));
  const creature = pool.length ? pool[seed % pool.length] : species[seed % species.length];
  const rarity = pickRarity(egg.rarityBias || 1);
  const lore = maybeLore(rarity);
  const visual = createVisualVariation(creature, rarity);
  return {
    ...creature,
    seed,
    id: `BFA-${seed}`,
    rarity: rarity.name,
    rarityNote: rarity.note,
    lore,
    eggType,
    eggLabel: egg.label,
    visual,
    discoveredAt: new Date().toISOString()
  };
}

function statBar() {
  evaluateAchievements();
  const { archive, lore, achievements, speciesFound, classesFound } = completionStats();
  return `
    <div class="archive-stats" aria-label="Archive progress">
      <span>Discoveries <strong>${archive.length}</strong></span>
      <span>Species <strong>${speciesFound.length}/${species.length}</strong></span>
      <span>Classes <strong>${classesFound.length}/${classifications.length}</strong></span>
      <span>Lore <strong>${lore.length}/${loreFragments.length}</strong></span>
      <span>Achievements <strong>${achievements.length}/${achievementDefinitions.length}</strong></span>
    </div>
  `;
}

function setPanel(html, extraClass = '') {
  app.className = `screen ${extraClass}`;
  app.innerHTML = `<div class="mist"></div>${statBar()}<section class="panel">${html}</section>`;
  window.scrollTo({ top: 0, behavior: 'instant' });
  hydrateInlineSilhouettes();
}

async function hydrateInlineSilhouettes() {
  const targets = [...document.querySelectorAll('[data-silhouette-src]')];
  for (const target of targets) {
    const src = target.dataset.silhouetteSrc;
    try {
      const response = await fetch(src, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Missing silhouette: ${src}`);
      const svgText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) throw new Error(`Invalid SVG: ${src}`);
      svg.classList.add('bf-svg');
      svg.setAttribute('aria-hidden', 'true');
      svg.querySelectorAll('script, foreignObject').forEach(node => node.remove());
      target.innerHTML = '';
      target.appendChild(document.importNode(svg, true));
    } catch (error) {
      target.innerHTML = `<img src="${src}" alt="" loading="eager">`;
    }
  }
}

function creatureImage(entry, extra = '') {
  const path = silhouettePath(entry.silhouette);
  const effect = classEffects[entry.classification] || '';
  const style = visualStyle(entry.visual);
  return `
    <div class="creature rarity-${String(entry.rarity || 'Common').toLowerCase()} ${effect} ${extra}" style="${style}" aria-label="${entry.name} silhouette">
      ${path ? `<div class="svg-stage" data-silhouette-src="${path}"></div>` : `<div class="missing-silhouette">Missing silhouette</div>`}
      <span class="scan-lines"></span>
      <span class="class-effect"></span>
    </div>
  `;
}

function revealOverlay(entry) {
  const rarity = String(entry.rarity || 'Common').toLowerCase();
  if (!['rare', 'ancient', 'mythic', 'genesis'].includes(rarity)) return '';
  const label = rarity === 'genesis' ? 'Genesis Signal Recognized' :
                rarity === 'mythic' ? 'Myth-Class Archive Event' :
                rarity === 'ancient' ? 'Ancient Recovery Echo' :
                'Rare Signal Stabilized';
  return `<div class="reveal-event reveal-${rarity}"><span>${label}</span></div>`;
}

function navButtons() {
  return `
    <div class="links">
      <button class="link-button" id="archivesBtn">Archives</button>
      <button class="link-button" id="loreBtn">Lore Fragments</button>
      <button class="link-button" id="achievementsBtn">Achievements</button>
      <button class="link-button" id="journalBtn">Studio Journal</button>
      <button class="link-button" id="aboutBtn">About Bonefauna</button>
      <a class="link-button" href="https://www.youtube.com/@BonefaunaStudios" target="_blank" rel="noopener noreferrer">YouTube</a>
    </div>
    <p class="footer-link"><a href="https://github.com/BonefaunaStudios" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="https://bonefaunastudios.itch.io" target="_blank" rel="noopener noreferrer">itch.io</a></p>
  `;
}

function bindNav() {
  document.getElementById('archivesBtn')?.addEventListener('click', () => showArchives(activeArchiveFilter));
  document.getElementById('loreBtn')?.addEventListener('click', showLore);
  document.getElementById('achievementsBtn')?.addEventListener('click', showAchievements);
  document.getElementById('journalBtn')?.addEventListener('click', showJournal);
  document.getElementById('aboutBtn')?.addEventListener('click', showAbout);
}

function hatch(eggType = 'wild') {
  showIncubation(eggType);
}

function showIncubation(eggType = 'wild') {
  const egg = eggTypes[eggType] || eggTypes.wild;
  setPanel(`
    <div class="egg crack egg-${eggType}">
      <span class="shard shard-a"></span>
      <span class="shard shard-b"></span>
      <span class="shard shard-c"></span>
      <span class="flash"></span>
    </div>
    <p class="eyebrow">Incubation event detected · ${egg.label}</p>
    <h1>Scanning...</h1>
    <p class="tagline">${egg.description}</p>
    <div class="scan-status">
      <span>Static purge</span>
      <span>Signal lock</span>
      <span>Specimen reconstruction</span>
    </div>
  `, `incubating egg-${eggType}`);
  setTimeout(() => showCreature(eggType), 1450);
}

function showCreature(eggType = 'wild') {
  const c = pickCreature(eggType);
  const entry = {
    id: c.id,
    name: c.name,
    classification: c.classification,
    rarity: c.rarity,
    rarityNote: c.rarityNote,
    traits: c.traits,
    silhouette: c.silhouette,
    note: c.note,
    discoveredAt: c.discoveredAt,
    loreId: c.lore ? c.lore.id : null,
    eggType: c.eggType,
    eggLabel: c.eggLabel,
    visual: c.visual
  };

  const archive = getArchive();
  archive.push(entry);
  saveArchive(archive);

  if (c.lore) {
    const lore = getLore();
    lore.push(c.lore.id);
    saveLore(lore);
  }

  const before = new Set(getAchievements());
  const after = evaluateAchievements();
  const newAchievements = after.filter(id => !before.has(id));

  lastEntry = entry;
  renderSpecimen(entry, newAchievements);
}

function renderSpecimen(entry, newAchievements = []) {
  setPanel(`
    ${revealOverlay(entry)}
    ${creatureImage(entry)}
    <p class="eyebrow">Archive Entry ${entry.id}</p>
    <div class="card rarity-card rarity-${entry.rarity.toLowerCase()}">
      <h2>${entry.name}</h2>
      <p class="traits">${entry.traits.join(' • ')}</p>
      <div class="meta-grid">
        <div><span>Classification</span><strong>${entry.classification}</strong></div>
        <div><span>Rarity</span><strong>${entry.rarity}</strong></div>
        <div><span>Egg Type</span><strong>${entry.eggLabel || eggTypes[entry.eggType]?.label || 'Wild Egg'}</strong></div>
      </div>
      <p class="small">${entry.rarityNote || 'Archive note unavailable.'}</p>
      <p class="small">${entry.note || 'Specimen notes remain incomplete.'}</p>
      ${entry.loreId ? loreBlock(entry.loreId) : ''}
      ${newAchievements.length ? `<div class="achievement-pop"><span>Archive Milestone</span><p>${newAchievements.map(id => achievementDefinitions.find(a => a.id === id)?.title).filter(Boolean).join(' • ')}</p></div>` : ''}
    </div>
    ${navButtons()}
    <button class="primary" id="hatchAgainBtn">Hatch Again</button>
  `, 'reveal');

  document.getElementById('hatchAgainBtn').addEventListener('click', showIncubation);
  bindNav();
}

function loreBlock(loreId) {
  const lore = loreFragments.find(f => f.id === loreId);
  if (!lore) return '';
  return `<div class="fragment"><span>${lore.id}</span><p>${lore.text}</p></div>`;
}

function showLatestOrIntro() {
  if (lastEntry) return renderSpecimen(lastEntry);
  const latest = getArchive().slice(-1)[0];
  if (latest) {
    lastEntry = latest;
    return renderSpecimen(latest);
  }
  return showIntro();
}

function eggSelectionButtons() {
  return `
    <div class="egg-choice-grid">
      ${Object.entries(eggTypes).map(([key, egg]) => `
        <button class="egg-choice egg-choice-${key}" data-egg-type="${key}">
          <strong>${egg.label}</strong>
          <span>${egg.description}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function bindEggChoices() {
  document.querySelectorAll('[data-egg-type]').forEach(button => {
    button.addEventListener('click', () => hatch(button.dataset.eggType));
  });
}

function showIntro() {
  app.className = 'screen intro';
  app.innerHTML = `
    <div class="mist"></div>
    ${statBar()}
    <section class="panel">
      <div class="brand-mark">B</div>
      <p class="eyebrow">Bonefauna Studios presents</p>
      <h1>Bonefauna: Origins</h1>
      <p class="tagline">Creature systems. Strange worlds.</p>
      ${eggSelectionButtons()}
      <button id="startBtn" class="primary">Touch the Wild Egg</button>
    </section>
  `;
  document.getElementById('startBtn').addEventListener('click', () => hatch('wild'));
  bindEggChoices();
}

function formatDate(value) {
  try { return new Date(value).toLocaleString(); }
  catch { return 'Unknown recovery time'; }
}

function showSpecimenDetail(entryId) {
  const entry = getArchive().find(e => e.id === entryId);
  if (!entry) return showArchives(activeArchiveFilter);
  lastEntry = entry;
  setPanel(`
    <p class="eyebrow">Archive Entry ${entry.id}</p>
    ${creatureImage(entry, 'detail-creature')}
    <div class="card rarity-card rarity-${entry.rarity.toLowerCase()}">
      <h2>${entry.name}</h2>
      <p class="traits">${entry.traits.join(' • ')}</p>
      <div class="meta-grid detail-meta">
        <div><span>Classification</span><strong>${entry.classification}</strong></div>
        <div><span>Rarity</span><strong>${entry.rarity}</strong></div>
        <div><span>Recovered</span><strong>${formatDate(entry.discoveredAt)}</strong></div>
        <div><span>Silhouette</span><strong>${String(entry.silhouette || '').replaceAll('_', ' ')}</strong></div>
        <div><span>Egg Type</span><strong>${entry.eggLabel || eggTypes[entry.eggType]?.label || 'Wild Egg'}</strong></div>
      </div>
      <p class="small">${entry.rarityNote || 'Archive note unavailable.'}</p>
      <p class="small">${entry.note || 'Specimen notes remain incomplete.'}</p>
      ${entry.loreId ? loreBlock(entry.loreId) : ''}
    </div>
    <div class="links">
      <button class="link-button" id="archivesBackBtn">Back to Archives</button>
      <button class="link-button" id="hatchAgainBtn">Hatch Again</button>
    </div>
  `, 'detail-screen');
  document.getElementById('archivesBackBtn').addEventListener('click', () => showArchives(activeArchiveFilter));
  document.getElementById('hatchAgainBtn').addEventListener('click', showIncubation);
}

function classificationChecklist(activeFilter = 'All') {
  const { classesFound } = completionStats();
  const allActive = activeFilter === 'All';
  return `
    <div class="completion-grid">
      <button class="completion-pill ${allActive ? 'active' : ''}" data-filter-class="All">All</button>
      ${classifications.map(c => {
        const found = classesFound.includes(c);
        const active = activeFilter === c;
        return `<button class="completion-pill ${found ? 'found' : ''} ${active ? 'active' : ''}" data-filter-class="${c}">${found ? '✓' : '?'} ${c}</button>`;
      }).join('')}
    </div>
  `;
}

function showArchives(filterClass = 'All') {
  activeArchiveFilter = filterClass || 'All';
  const archive = getArchive().slice().reverse();
  const filtered = activeArchiveFilter === 'All' ? archive : archive.filter(e => e.classification === activeArchiveFilter);
  setPanel(`
    <p class="eyebrow">Recovered Specimens</p>
    <h1>Archives</h1>
    ${classificationChecklist(activeArchiveFilter)}
    <div class="archive-list">
      ${filtered.length ? filtered.map(e => `
        <button class="archive-entry rarity-row rarity-${String(e.rarity || 'Common').toLowerCase()}" data-entry-id="${e.id}">
          <strong>${e.id}</strong>
          <span>${e.name}</span>
          <small>${e.classification} • ${e.rarity}</small>
        </button>
      `).join('') : `<p class="small">No ${activeArchiveFilter === 'All' ? '' : activeArchiveFilter + ' '}specimens recovered yet.</p>`}
    </div>
    <div class="links">
      <button class="link-button" id="backBtn">Return</button>
      <button class="link-button danger" id="clearBtn">Clear Archive</button>
    </div>
  `, 'archive-screen');

  document.querySelectorAll('[data-filter-class]').forEach(button => {
    button.addEventListener('click', () => showArchives(button.dataset.filterClass));
  });
  document.querySelectorAll('[data-entry-id]').forEach(button => {
    button.addEventListener('click', () => showSpecimenDetail(button.dataset.entryId));
  });
  document.getElementById('backBtn').addEventListener('click', showLatestOrIntro);
  document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Clear local Bonefauna archive discoveries on this device?')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LORE_KEY);
      localStorage.removeItem(ACHIEVEMENTS_KEY);
      activeArchiveFilter = 'All';
      lastEntry = null;
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
      ${loreFragments.map((f, index) => {
        const unlockedFragment = unlocked.includes(f.id);
        const corrupted = corruptionMessages[index % corruptionMessages.length];
        return `
          <article class="archive-entry ${unlockedFragment ? '' : 'locked'}">
            <strong>${f.id}</strong>
            <span>${unlockedFragment ? f.text : corrupted[0]}</span>
            <small>${unlockedFragment ? 'Recovered' : corrupted[1]}</small>
          </article>
        `;
      }).join('')}
    </div>
    <button class="primary" id="backBtn">Return</button>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showLatestOrIntro);
}

function showAchievements() {
  evaluateAchievements();
  const unlocked = getAchievements();
  setPanel(`
    <p class="eyebrow">Archive Milestones</p>
    <h1>Achievements</h1>
    <div class="archive-list achievement-list">
      ${achievementDefinitions.map(a => `
        <article class="archive-entry ${unlocked.includes(a.id) ? '' : 'locked'}">
          <strong>${unlocked.includes(a.id) ? 'Recovered' : 'Sealed'}</strong>
          <span>${a.title}</span>
          <small>${a.description}</small>
        </article>
      `).join('')}
    </div>
    <button class="primary" id="backBtn">Return</button>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showLatestOrIntro);
}

function showJournal() {
  setPanel(`
    <p class="eyebrow">Studio Journal</p>
    <h1>Field Notes</h1>
    <div class="card text-card">
      <p><strong>June 2026:</strong> Bonefauna Origins began as a playable archive portal for Bonefauna Studios.</p>
      <p><strong>v0.4.3:</strong> Archive filtering, completion logic, specimen navigation, and silhouette filename mapping were stabilized.</p>
      <p>The current goal is not to promote unfinished projects, but to establish the atmosphere of the studio: creatures, ecosystems, extinction, emergence, and discovery.</p>
    </div>
    <button class="primary" id="backBtn">Return</button>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showLatestOrIntro);
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
  document.getElementById('backBtn').addEventListener('click', showLatestOrIntro);
}

document.getElementById('startBtn')?.addEventListener('click', () => hatch('wild'));
showIntro();
