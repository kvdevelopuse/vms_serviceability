// Run: node tests/prototype-check.cjs (no packages required).
// Verifies fixed data reconciliation, retained state, rendered controls and local dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'prototype');
const {
  transition, renderScreen, screenFromHash, dashboardScale,
  vehicleRecords, recordsByDate, supportedDates, aggregateFor, recordsFor,
  formatDate, percentageStyle,
} = require('../prototype/app.js');

assert.equal(vehicleRecords.length, 120);
assert.equal(new Set(vehicleRecords.map(record => record.id)).size, 120);
assert.equal(new Set(vehicleRecords.map(record => record.plate)).size, 120);
for (const plate of ['AB-1234', 'CD-5678', 'EF-9012', 'IJ-7890', 'XY-7781', 'SX-1024', 'UV-3187', 'TR-8240', 'KL-6672', 'BF-1190', 'PQ-3056', 'LR-7891', 'ZT-5508', 'KD-9914', 'LM-5502', 'PQ-9876', 'PM-1001', 'PM-1002', 'PM-1003', 'PM-1004', 'PM-1005', 'PM-1006', 'PM-1007', 'PM-1008', 'PM-1009', 'PM-1010']) {
  assert.ok(vehicleRecords.some(record => record.plate === plate), `retained legacy plate ${plate}`);
}

const expected = {
  'Unit A': {all: [24, 7, 3, 34, 71], sedan: [9, 2, 1, 12, 75], suv: [9, 3, 2, 14, 64], 'people-movers': [6, 2, 0, 8, 75]},
  'Unit B': {all: [22, 6, 4, 32, 69], sedan: [8, 2, 1, 11, 73], suv: [8, 3, 2, 13, 62], 'people-movers': [6, 1, 1, 8, 75]},
  'Unit C': {all: [21, 6, 2, 29, 72], sedan: [7, 2, 0, 9, 78], suv: [7, 3, 1, 11, 64], 'people-movers': [7, 1, 1, 9, 78]},
  'Unit D': {all: [17, 5, 3, 25, 68], sedan: [6, 1, 1, 8, 75], suv: [6, 2, 2, 10, 60], 'people-movers': [5, 2, 0, 7, 71]},
  All: {all: [84, 24, 12, 120, 70], sedan: [30, 7, 3, 40, 75], suv: [30, 11, 7, 48, 63], 'people-movers': [24, 6, 2, 32, 75]},
};

assert.deepEqual(supportedDates, ['2026-10-20', '2026-10-21', '2026-10-22']);
assert.equal(formatDate('2026-09-05'), '05-Sep-2026');
assert.equal(percentageStyle(0), '--percentage:0%');
assert.equal(percentageStyle(100), '--percentage:100%');
for (const date of supportedDates) assert.equal(recordsByDate[date].length, 120, `${date} record count`);

for (const [unit, screens] of Object.entries(expected)) {
  for (const [screen, values] of Object.entries(screens)) {
    const result = aggregateFor(unit, screen, '2026-10-22');
    assert.deepEqual([result.available, result.mission, result.unavailable, result.total, result.percent], values, `${unit}/${screen}`);
    assert.equal(recordsFor(unit, screen, '2026-10-22').length, values[3], `${unit}/${screen} records`);
  }
}

assert.deepEqual(aggregateFor('All', 'all', '2026-10-21'), {available: 80, mission: 26, unavailable: 14, total: 120, percent: 67});
assert.deepEqual(aggregateFor('All', 'all', '2026-10-20'), {available: 73, mission: 30, unavailable: 17, total: 120, percent: 61});
for (const date of supportedDates) {
  for (const screen of ['all', 'sedan', 'suv', 'people-movers']) {
    const all = aggregateFor('All', screen, date);
    const unitSums = ['Unit A', 'Unit B', 'Unit C', 'Unit D'].map(unit => aggregateFor(unit, screen, date));
    assert.deepEqual(
      ['available', 'mission', 'unavailable', 'total'].map(key => unitSums.reduce((sum, aggregate) => sum + aggregate[key], 0)),
      [all.available, all.mission, all.unavailable, all.total],
      `${date}/${screen} Unit reconciliation`,
    );
  }
}

let state = {screen: 'dashboard', theme: 'light', unit: 'All', date: '2026-10-22', activeRecordId: null};
state = transition(state, {type: 'set-unit', unit: 'Unit C'});
state = transition(state, {type: 'set-date', date: '2026-10-21'});
state = transition(state, {type: 'navigate', screen: 'suv'});
state = transition(state, {type: 'toggle-theme'});
assert.deepEqual(state, {screen: 'suv', theme: 'dark', unit: 'Unit C', date: '2026-10-21', activeRecordId: null});
assert.deepEqual(transition(state, {type: 'set-date', date: ''}), state, 'empty date retains previous selection');
assert.deepEqual(transition(state, {type: 'set-date', date: '2026-12-31'}), state, 'unsupported date retains previous selection');

const dashboard = renderScreen({screen: 'dashboard', theme: 'light', unit: 'All', date: '2026-10-22', activeRecordId: null});
assert.match(dashboard, /id="unit-filter"/);
assert.match(dashboard, /class="date-display">22-Oct-2026/);
assert.match(dashboard, /id="dashboard-date" type="date" min="2026-10-20" max="2026-10-22" value="2026-10-22"/);
assert.match(dashboard, /class="category-card category-all" style="--serviceability:70%"/);
assert.ok(dashboard.includes('84 / 120'));
for (const screen of ['all', 'sedan', 'suv', 'people-movers']) {
  assert.ok(dashboard.includes(`<a class="round-arrow" href="#${screen}"`));
  assert.ok(!dashboard.includes(`<a href="#${screen}" class="category-card`));
}

for (const screen of ['all', 'sedan', 'suv', 'people-movers']) {
  const html = renderScreen({screen, theme: 'dark', unit: 'Unit C', date: '2026-10-21', activeRecordId: null});
  assert.match(html, /id="detail-unit" disabled/);
  assert.match(html, /data-date="2026-10-21"/);
  assert.match(html, /21-Oct-2026/);
  assert.equal((html.match(/class="[^"]*percentage-card[^"]*"/g) || []).length, 4);
  assert.doesNotMatch(html, />Actions</);
  assert.equal((html.match(/<tr data-record-id=/g) || []).length, Math.min(10, recordsFor('Unit C', screen, '2026-10-21').length));
  assert.equal((html.match(/<th scope="col">/g) || []).length, screen === 'all' ? 8 : 7);
  if (screen === 'suv') assert.match(renderScreen({screen, theme: 'light', unit: 'All', date: '2026-10-22'}), /Available<\/span><\/div><b>62%<\/b>/);
}

const firstRecord = recordsFor('Unit A', 'sedan', '2026-10-21')[0];
const dialog = renderScreen({screen: 'sedan', theme: 'light', unit: 'Unit A', date: '2026-10-21', activeRecordId: firstRecord.id});
assert.match(dialog, /<dialog class="record-dialog"/);
for (const label of ['Status:', 'Discovered Date:', 'Location:', 'Deployed:', 'Reason for Non-Serviceability:']) assert.ok(dialog.includes(label));
assert.match(dialog, /<textarea name="reason" rows="5" disabled>/);
assert.match(dialog, /data-action="modify">Modify/);
assert.match(dialog, /data-action="close">Close/);
assert.match(dialog, /data-action="save" hidden>Save/);
assert.match(dialog, /data-action="cancel" hidden>Cancel/);

for (const [contentWidth, contentHeight, width, height] of [[1920,1100,1920,1080],[1366,1250,1366,768],[390,1600,390,844]]) {
  const scale = dashboardScale(contentWidth, contentHeight, width, height);
  assert.ok(contentWidth * scale <= width + .001 && contentHeight * scale <= height + .001);
  assert.ok(scale > 0 && scale <= 1);
}

assert.equal(screenFromHash('#suv'), 'suv');
assert.equal(screenFromHash('#not-a-screen'), 'dashboard');
assert.equal(screenFromHash(''), 'dashboard');

const entry = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(!/type=["']module/.test(entry), 'classic scripts support direct file opening');
for (const match of entry.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  assert.ok(!/^https?:\/\//.test(match[1]), 'no remote runtime dependencies');
  assert.ok(fs.existsSync(path.join(root, match[1])), `local dependency exists: ${match[1]}`);
}

console.log('PASS: three reconciled date snapshots; formatted dates; retained state; editable dialog contract; proportional detail cards; local dependencies.');
