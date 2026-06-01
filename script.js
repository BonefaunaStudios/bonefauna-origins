const app = document.getElementById('app');

const STORAGE_KEY = 'bonefaunaOriginsArchiveV04';
const LEGACY_STORAGE_KEY = 'bonefaunaOriginsArchiveV03';
const LORE_KEY = 'bonefaunaOriginsLoreV04';
const LEGACY_LORE_KEY = 'bonefaunaOriginsLoreV03';
const ACHIEVEMENTS_KEY = 'bonefaunaOriginsAchievementsV04';

const classifications = ['Predator', 'Grazer', 'Avian', 'Aquatic', 'Insectoid', 'Reptile', 'Amphibian', 'Titan'];

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

function safeJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}

function migrateIfNeeded() {
  if (!localStorage.getItem(STORAGE_KEY) && localStorage.getItem(LEGACY_STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, localStorage.getItem(LEGACY_STORAGE_KEY));
  }
  if (!localStorage.getItem(LORE_KEY) && localStorage.getItem(LEGACY_LORE_KEY)) {
    localStorage.setItem(LORE_KEY, localStorage.getItem(LEGACY_LORE_KEY));
  }
}

function getArchive() {
  migrateIfNeeded();
  return safeJson(STORAGE_KEY, []);
}

function saveArchive(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-120)));
}

function getLore() {
  migrateIfNeeded();
  return safeJson(LORE_KEY, []);
}

function saveLore(entries) {
  localStorage.setItem(LORE_KEY, JSON.stringify([...new Set(entries)]));
}

function getAchievements() {
  return safeJson(ACHIEVEMENTS_KEY, []);
}

function saveAchievements(entries) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify([...new Set(entries)]));
}

function randomSeed() {
  return Math.floor(Math.random() * 900000 + 100000);
}

function silhouettePath(key) {
  return `assets/silhouettes/${key}.svg`;
}

function uniqueValues(entries, key) {
  return [...new Set(entries.map(e => e[key]).filter(Boolean))];
}

function completionStats() {
  const archive = getArchive();
  const lore = getLore();
  const achievements = getAchievements();
  const speciesFound = uniqueValues(archive, 'name');
  const classesFound = uniqueValues(archive, 'classification');
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
    lore,
    discoveredAt: new Date().toISOString()
  };
}

function statBar() {
  const { archive, lore, achievements, speciesFound, classesFound } = completionStats();
  return `
    <div class="archive-stats">
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
}

function creatureImage(entry, extra = '') {
  return `<div class="creature rarity-${entry.rarity.toLowerCase()} ${extra}" aria-label="${entry.name} silhouette"><img src="${silhouettePath(entry.silhouette)}" alt="${entry.name} silhouette"></div>`;
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
  document.getElementById('archivesBtn')?.addEventListener('click', showArchives);
  document.getElementById('loreBtn')?.addEventListener('click', showLore);
  document.getElementById('achievementsBtn')?.addEventListener('click', showAchievements);
  document.getElementById('journalBtn')?.addEventListener('click', showJournal);
  document.getElementById('aboutBtn')?.addEventListener('click', showAbout);
}

function showIncubation() {
  setPanel(`
    <div class="egg crack">
      <span class="shard shard-a"></span>
      <span class="shard shard-b"></span>
      <span class="shard shard-c"></span>
      <span class="flash"></span>
    </div>
    <p class="eyebrow">Incubation event detected</p>
    <h1>Awakening...</h1>
    <p class="tagline">The archive remembers what the world forgot.</p>
  `, 'incubating');
  setTimeout(showCreature, 1250);
}

function showCreature() {
  const c = pickCreature();
  const archive = getArchive();
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
    loreId: c.lore ? c.lore.id : null
  };
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

  setPanel(`
    ${creatureImage(c)}
    <p class="eyebrow">Archive Entry ${c.id}</p>
    <div class="card rarity-card rarity-${c.rarity.toLowerCase()}">
      <h2>${c.name}</h2>
      <p class="traits">${c.traits.join(' • ')}</p>
      <div class="meta-grid">
        <div><span>Classification</span><strong>${c.classification}</strong></div>
        <div><span>Rarity</span><strong>${c.rarity}</strong></div>
      </div>
      <p class="small">${c.rarityNote}</p>
      <p class="small">${c.note}</p>
      ${c.lore ? `<div class="fragment"><span>${c.lore.id}</span><p>${c.lore.text}</p></div>` : ''}
      ${newAchievements.length ? `<div class="achievement-pop"><span>Archive Milestone</span><p>${newAchievements.map(id => achievementDefinitions.find(a => a.id === id)?.title).join(' • ')}</p></div>` : ''}
    </div>
    ${navButtons()}
    <button class="primary" id="hatchAgainBtn">Hatch Again</button>
  `, 'reveal');

  document.getElementById('hatchAgainBtn').addEventListener('click', showIncubation);
  bindNav();
}

function formatDate(value) {
  try { return new Date(value).toLocaleString(); }
  catch { return 'Unknown recovery time'; }
}

function showSpecimenDetail(entryId) {
  const entry = getArchive().find(e => e.id === entryId);
  if (!entry) return showArchives();
  const lore = loreFragments.find(f => f.id === entry.loreId);
  setPanel(`
    <p class="eyebrow">Archive Entry ${entry.id}</p>
    ${creatureImage(entry, 'detail-creature')}
    <div class="card rarity-card rarity-${entry.rarity.toLowerCase()}">
      <h2>${entry.name}</h2>
      <p class="traits">${entry.traits.join(' • ')}</p>
      <div class="meta-grid">
        <div><span>Classification</span><strong>${entry.classification}</strong></div>
        <div><span>Rarity</span><strong>${entry.rarity}</strong></div>
        <div><span>Recovered</span><strong>${formatDate(entry.discoveredAt)}</strong></div>
        <div><span>Silhouette</span><strong>${entry.silhouette.replaceAll('_', ' ')}</strong></div>
      </div>
      <p class="small">${entry.rarityNote || 'Archive note unavailable.'}</p>
      <p class="small">${entry.note || 'Specimen notes remain incomplete.'}</p>
      ${lore ? `<div class="fragment"><span>${lore.id}</span><p>${lore.text}</p></div>` : ''}
    </div>
    <div class="links">
      <button class="link-button" id="archivesBackBtn">Back to Archives</button>
      <button class="link-button" id="hatchAgainBtn">Hatch Again</button>
    </div>
  `, 'detail-screen');
  document.getElementById('archivesBackBtn').addEventListener('click', showArchives);
  document.getElementById('hatchAgainBtn').addEventListener('click', showIncubation);
}

function classificationChecklist() {
  const { classesFound } = completionStats();
  return `
    <div class="completion-grid">
      ${classifications.map(c => `<span class="completion-pill ${classesFound.includes(c) ? 'found' : ''}">${classesFound.includes(c) ? '✓' : '?'} ${c}</span>`).join('')}
    </div>
  `;
}

function showArchives() {
  const archive = getArchive().slice().reverse();
  setPanel(`
    <p class="eyebrow">Recovered Specimens</p>
    <h1>Archives</h1>
    ${classificationChecklist()}
    <div class="archive-list">
      ${archive.length ? archive.map(e => `
        <button class="archive-entry rarity-row rarity-${e.rarity.toLowerCase()}" data-entry-id="${e.id}">
          <strong>${e.id}</strong>
          <span>${e.name}</span>
          <small>${e.classification} • ${e.rarity}</small>
        </button>
      `).join('') : '<p class="small">No specimens recovered yet. Touch the fossil egg to begin.</p>'}
    </div>
    <div class="links">
      <button class="link-button" id="backBtn">Return</button>
      <button class="link-button danger" id="clearBtn">Clear Archive</button>
    </div>
  `, 'archive-screen');
  document.querySelectorAll('[data-entry-id]').forEach(button => {
    button.addEventListener('click', () => showSpecimenDetail(button.dataset.entryId));
  });
  document.getElementById('backBtn').addEventListener('click', showCreature);
  document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Clear local Bonefauna archive discoveries on this device?')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LORE_KEY);
      localStorage.removeItem(ACHIEVEMENTS_KEY);
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
          <span>${unlocked.includes(f.id) ? f.text : 'Archive signal lost'}</span>
          <small>${unlocked.includes(f.id) ? 'Recovered' : 'Record corrupted'}</small>
        </article>
      `).join('')}
    </div>
    <button class="primary" id="backBtn">Return</button>
  `, 'archive-screen');
  document.getElementById('backBtn').addEventListener('click', showCreature);
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
  document.getElementById('backBtn').addEventListener('click', showCreature);
}

function showJournal() {
  setPanel(`
    <p class="eyebrow">Studio Journal</p>
    <h1>Field Notes</h1>
    <div class="card text-card">
      <p><strong>June 2026:</strong> Bonefauna Origins began as a playable archive portal for Bonefauna Studios.</p>
      <p><strong>v0.4:</strong> The archive has gained completion tracking, milestone recovery, specimen detail pages, rarity presentation, and the first Bonefauna silhouette pack.</p>
      <p>The current goal is not to promote unfinished projects, but to establish the atmosphere of the studio: creatures, ecosystems, extinction, emergence, and discovery.</p>
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
