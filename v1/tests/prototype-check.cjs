// Run: node tests/prototype-check.cjs (no packages required).
// Catches wrong navigation destinations, lost themes and invented/missing visible rows.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'prototype');
assert.ok(fs.existsSync(path.join(root, 'index.html')), 'prototype/index.html must exist');
const { transition, renderScreen, screenFromHash, dashboardScale } = require('../prototype/app.js');
const { createHash } = require('node:crypto');
const displayedText = require('./fixtures/displayed-text-sha256.json');
for (const theme of ['light', 'dark']) for (const screen of ['dashboard','all','sedan','suv','people-movers']) {
  const text = renderScreen({screen,theme}).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  assert.equal(createHash('sha256').update(text).digest('hex'), displayedText[`${screen}/${theme}`], `${screen}/${theme}: every displayed value remains unchanged`);
}
for (const [contentWidth, contentHeight, width, height] of [[1920,1100,1920,1080],[1366,1250,1366,768],[1200,900,1200,600],[390,1600,390,844],[900,600,1920,1080]]) {
  const scale = dashboardScale(contentWidth, contentHeight, width, height);
  assert.ok(contentWidth * scale <= width + .001 && contentHeight * scale <= height + .001, 'entire dashboard fits the viewport');
  assert.ok(scale > 0 && scale <= 1, 'no image upscaling');
}

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
  for (const kind of ['sedan','suv','people-movers']) {
    const file = `assets/vehicle-${kind}.png`;
    assert.ok(dashboard.includes(`src="${file}"`), `${kind}: standalone clear vehicle image`);
    assert.ok(fs.existsSync(path.join(root, file)), `${kind}: replacement image is bundled`);
  }
  assert.ok(!dashboard.includes('src="assets/dashboard-'), 'no screenshot crops');
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

const entry = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(!/type=["']module/.test(entry), 'classic scripts support direct file opening');
for (const match of entry.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  assert.ok(!/^https?:\/\//.test(match[1]), 'no remote runtime dependencies');
  assert.ok(fs.existsSync(path.join(root, match[1])), `local dependency exists: ${match[1]}`);
}
console.log('PASS: 10 view states; 8 category journeys; theme switches and returns; literal rows; route fallback; local entry dependencies.');
