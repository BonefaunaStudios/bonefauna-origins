const app = document.getElementById('app');
const species = [
  { name: 'Proto-Raptor', traits: ['Adaptive', 'Watchful', 'Pack-Bonded'] },
  { name: 'Ashhorn Whelp', traits: ['Resilient', 'Territorial', 'Heat-Touched'] },
  { name: 'Mireback Hatchling', traits: ['Patient', 'Camouflaged', 'Wetland-Born'] },
  { name: 'Glassjaw Strider', traits: ['Curious', 'Fast', 'Fragile-Boned'] },
  { name: 'Duskwick Grazer', traits: ['Gentle', 'Nocturnal', 'Social'] }
];

const links = [
  ['Project Genesis', 'https://github.com/BonefaunaStudios'],
  ['GitHub', 'https://github.com/BonefaunaStudios'],
  ['itch.io', 'https://bonefaunastudios.itch.io'],
  ['YouTube', 'https://www.youtube.com/'],
  ['Discord', '#']
];

function pickCreature() {
  const seed = Math.floor(Math.random() * 900000 + 100000);
  const creature = species[seed % species.length];
  return { ...creature, seed };
}

function setPanel(html) {
  app.innerHTML = '<div class="mist"></div><section class="panel">' + html + '</section>';
}

document.getElementById('startBtn').addEventListener('click', () => {
  setPanel(`
    <div class="egg crack"></div>
    <p class="eyebrow">Incubation event detected</p>
    <h1>Awakening...</h1>
    <p class="tagline">The archive remembers what the world forgot.</p>
  `);
  setTimeout(showCreature, 1100);
});

function showCreature() {
  const c = pickCreature();
  setPanel(`
    <div class="creature" aria-label="newly hatched creature silhouette"></div>
    <p class="eyebrow">Species #${c.seed}</p>
    <div class="card">
      <h2>${c.name}</h2>
      <p class="traits">${c.traits.join(' • ')}</p>
      <p class="small">A first signal from the Bonefauna Archives. More systems coming soon.</p>
    </div>
    <div class="links">
      ${links.map(([label, url]) => `<a class="link-button" href="${url}">${label}</a>`).join('')}
    </div>
    <button class="primary" onclick="location.reload()">Hatch Again</button>
  `);
}
