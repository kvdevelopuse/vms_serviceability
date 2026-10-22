// Run: node tests/prototype-check.cjs (no packages required).
// Catches wrong navigation destinations, lost themes and invented/missing visible rows.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'prototype');
assert.ok(fs.existsSync(path.join(root, 'index.html')), 'prototype/index.html must exist');
const { transition, renderScreen, screenFromHash } = require('../prototype/app.js');

for (const theme of ['light', 'dark']) {
  for (const [screen, title, total, count, plate] of [
    ['all', 'All Vehicles', '84 / 120', 10, 'AB-1234'],
    ['sedan', 'Sedan', '30 / 40', 9, 'MN-6789'],
    ['suv', 'SUV', '30 / 48', 9, 'SX-1024'],
    ['people-movers', 'People Movers', '24 / 32', 10, 'PM-1010'],
  ]) {
    const state = transition({screen: 'dashboard', theme}, {type: 'navigate', screen});
    assert.deepEqual(state, {screen, theme});
    const html = renderScreen(state);
    assert.ok(html.includes(`<h1 tabindex="-1">${title}</h1>`), `${screen}: correct heading`);
    assert.ok(html.includes(total), `${screen}: literal total`);
    assert.ok(html.includes('<span>Available / Total</span>'), `${screen}: summary ratio label retained`);
    assert.ok(html.includes(plate), `${screen}: source records`);
    for (const image of html.matchAll(/<img src="([^"]+)"/g)) {
      assert.ok(fs.existsSync(path.join(root, image[1])), `illustration exists: ${image[1]}`);
    }
    assert.ok(!html.includes('vehicle-art'), `${screen}: updated details have no vehicle illustrations`);
    assert.ok(html.includes('<th scope="col">Last Updated</th>'), `${screen}: current column label`);
    assert.equal((html.match(/<th scope="col">/g) || []).length, screen === 'all' ? 9 : 8, `${screen}: only current reference columns`);
    assert.equal((html.match(/<tr data-plate=/g) || []).length, count, `${screen}: visible rows only`);
    const switched = transition(state, {type: 'toggle-theme'});
    assert.deepEqual(switched, {screen, theme: theme === 'light' ? 'dark' : 'light'});
    assert.deepEqual(transition(switched, {type: 'navigate', screen: 'dashboard'}), {...switched, screen: 'dashboard'});
    assert.ok(renderScreen(switched).includes(`<h1 tabindex="-1">${title}</h1>`));
  }
  const dashboard = renderScreen({screen: 'dashboard', theme});
  for (const screen of ['all', 'sedan', 'suv', 'people-movers']) {
    assert.ok(dashboard.includes(`href="#${screen}"`), `dashboard links to ${screen}`);
  }
  assert.ok(dashboard.includes('84 / 120'));
  assert.ok(dashboard.includes('63%'));
  assert.ok(dashboard.includes('12 vehicles not available'));
  assert.ok(!/fleet management/i.test(dashboard), 'requested heading removed');
  assert.ok(!/Available vehicles\s*\/\s*Total vehicles/i.test(dashboard), 'requested formula removed');
  const suv = renderScreen({screen:'suv', theme});
  assert.match(suv, /Available<\/span><\/div><b>62%<\/b>/, 'literal SUV availability is 62%; its serviceability remains 63%');
  assert.match(renderScreen({screen:'sedan', theme}), /data-plate="CD-5678"[^]*?22 Oct 2026 08:50/);
  assert.match(renderScreen({screen:'sedan', theme}), /data-plate="GH-3456"[^]*?22 Oct 2026 08:20/);
  assert.ok(renderScreen({screen:'sedan', theme}).includes('Mission #M-1023'));
}
assert.equal(screenFromHash('#suv'), 'suv');
assert.equal(screenFromHash('#not-a-screen'), 'dashboard');
assert.equal(screenFromHash(''), 'dashboard');
assert.deepEqual(transition({screen:'sedan', theme:'dark'}, {type:'navigate', screen:'invalid'}), {screen:'dashboard', theme:'dark'});

const lightSedan = renderScreen({screen:'sedan', theme:'light'});
const darkSedan = renderScreen({screen:'sedan', theme:'dark'});
assert.match(lightSedan, /data-plate="MN-6789"[^]*?<td>2024<\/td>/);
assert.match(darkSedan, /data-plate="MN-6789"[^]*?<td>2024<\/td>/);

// These source-image boundaries separate the vehicle pixels from baked-in UI.
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
function cropVariables(selector) {
  const start = css.indexOf(selector + ' {');
  assert.ok(start >= 0, `crop selector exists: ${selector}`);
  const block = css.slice(start, css.indexOf('}', start));
  return Object.fromEntries([...block.matchAll(/--crop-(\w+):\s*(\d+)/g)].map(m => [m[1], Number(m[2])]));
}
const baseCrop = cropVariables('.vehicle-art');
for (const kind of ['all', 'sedan', 'suv', 'people-movers']) {
  const crop = {...baseCrop, ...cropVariables('.vehicle-' + kind)};
  assert.ok(crop.y >= 337 && crop.y + crop.height <= 490, `${kind}: only the updated source illustration region`);
  assert.ok(crop.x >= 100 && crop.x + crop.width <= 1770, `${kind}: crop inside updated image bounds`);
}

const entry = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const theme of ['light', 'dark']) {
  const source = path.join(__dirname, '..', 'images', `Dashboard_${theme === 'light' ? 'Light' : 'Dark'}_1920x1080.png`);
  assert.deepEqual(fs.readFileSync(path.join(root, 'assets', `dashboard-${theme}.png`)), fs.readFileSync(source), `${theme}: runtime art must use the replacement image`);
}
assert.ok(!/type=["']module/.test(entry), 'classic scripts support direct file opening');
for (const match of entry.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  assert.ok(!/^https?:\/\//.test(match[1]), 'no remote runtime dependencies');
  assert.ok(fs.existsSync(path.join(root, match[1])), `local dependency exists: ${match[1]}`);
}
console.log('PASS: 10 view states; 8 category journeys; theme switches and returns; literal rows; route fallback; local entry dependencies.');
