// Run: node tests/dashboard-options-check.cjs (no packages required).
const assert = require('node:assert/strict');
const {transition, renderScreen, trendData, recordsByDate, reloadSavedRecords, saveRecord, THEME_STORAGE_KEY, readStoredTheme, persistTheme} = require('../prototype/app.js');

assert.equal(THEME_STORAGE_KEY, 'vms-serviceability-theme-v1');
assert.equal(readStoredTheme({getItem: () => 'dark'}), 'dark');
assert.equal(readStoredTheme({getItem: () => 'light'}), 'light');
assert.equal(readStoredTheme({getItem: () => 'sepia'}), 'light');
assert.equal(readStoredTheme({getItem: () => null}), 'light');
assert.equal(readStoredTheme({getItem: () => {throw new Error('blocked');}}), 'light');
let persistedTheme;
persistTheme({setItem: (key, value) => {persistedTheme = [key, value];}}, 'dark');
assert.deepEqual(persistedTheme, [THEME_STORAGE_KEY, 'dark']);
assert.doesNotThrow(() => persistTheme({setItem: () => {throw new Error('blocked');}}, 'dark'));

const base = {screen: 'dashboard', theme: 'light', unit: 'All', date: '2026-10-22', selectedCategory: 'all', designOption: '1'};
const selected = transition(base, {type: 'select-category', category: 'suv'});
assert.deepEqual(selected, base, 'card bodies do not select or change Fleet Overview');
assert.deepEqual(transition(base, {type: 'select-category', category: 'invalid'}), base);
const circular = transition(selected, {type: 'set-design', option: '2'});
assert.equal(circular.designOption, '2');
const option3 = transition(selected, {type: 'set-design', option: '3'});
assert.equal(option3.designOption, '3');
assert.deepEqual(transition(base, {type: 'set-design', option: '5'}), base);
for (const designState of [circular, option3]) {
  for (const action of [{type: 'navigate', screen: 'sedan'}, {type: 'set-unit', unit: 'Unit C'}, {type: 'set-date', date: '2026-10-20'}, {type: 'set-filter', filter: 'mission'}, {type: 'toggle-theme'}]) {
    const result = transition(designState, action);
    assert.equal(result.selectedCategory, 'all');
    assert.equal(result.designOption, designState.designOption);
  }
}

assert.deepEqual(trendData('All', 'suv', '2026-10-22'), [
  {date: '2026-10-20', percent: 56}, {date: '2026-10-21', percent: 67}, {date: '2026-10-22', percent: 63},
]);
assert.deepEqual(trendData('Unit C', 'suv', '2026-10-21'), [{date: '2026-10-20', percent: 64}, {date: '2026-10-21', percent: 55}]);
assert.deepEqual(trendData('All', 'all', '2026-10-20'), [{date: '2026-10-20', percent: 61}]);
assert.deepEqual(Object.keys(recordsByDate), ['2026-10-20', '2026-10-21', '2026-10-22']);

for (const theme of ['light', 'dark']) {
  for (const designOption of ['1', '2', '3', '4']) {
    const option2Design = designOption !== '4';
    const option1Fill = designOption === '1';
    const html = renderScreen({...selected, theme, designOption});
    assert.doesNotMatch(html, /Available\s*\/\s*Total/, 'remove labels, retain numeric ratios');
    if (!option2Design) {
      assert.ok(html.includes('84 / 120'));
      assert.ok(html.includes('30 / 48'));
    }
    assert.match(html, /name="dashboard-design" value="1"/);
    assert.match(html, /name="dashboard-design" value="2"/);
    assert.match(html, /name="dashboard-design" value="3"/);
    assert.doesNotMatch(html, /name="dashboard-design" value="4"|Option 4/);
    assert.doesNotMatch(html, /card-select|data-select-category|is-selected/);
    assert.match(html, /120 total vehicles: 84 available, 24 on mission, 12 not available/);
    assert.match(html, /30 of 48 vehicles available/);
    assert.match(html, /24 vehicles on mission/);
    assert.match(html, /12 vehicles unavailable/);
    assert.match(html, /All Vehicles serviceability trend/);
    assert.match(html, />Unavailable<\/dt>/);
    assert.match(html, /20-Oct-2026/);
    assert.doesNotMatch(html, /01-Oct-2026|Last 30 Days|Illustrated serviceability/);
    const overviewMarkup = html.slice(html.indexOf('<section class="overview"'));
    assert.match(overviewMarkup, /<h2 id="overview-title">Fleet Overview<\/h2>/);
    assert.doesNotMatch(overviewMarkup, /class="period"|icon-calendar/, 'Fleet Overview must not contain a date selector in either option');
    assert.equal((html.match(/class="count-ring"/g) || []).length, 0);
    assert.equal((html.match(/class="service-ring(?: is-alert)?"/g) || []).length, option2Design ? (option1Fill ? 0 : 4) : 0);
    assert.equal((html.match(/class="option2-stat /g) || []).length, option2Design ? 8 : 0);
    for (const [category, percent] of Object.entries({all:70, sedan:75, suv:63, 'people-movers':75})) {
      const categoryCard = html.match(new RegExp(`<article class="category-card category-${category}[\\s\\S]*?<\\/article>`))[0];
      if (option1Fill) {
        assert.match(categoryCard, new RegExp(`category-${category} option1-fill`));
        assert.match(categoryCard, new RegExp(`class="service-percent">${percent}%<\\/strong>`));
        assert.doesNotMatch(categoryCard, /class="service-ring/);
      } else if (option2Design) {
        assert.match(categoryCard, /class="service-ring(?: is-alert)?"/);
        assert.doesNotMatch(categoryCard, /option1-fill/);
      }
    }
    if (option2Design) {
      assert.match(html, /class="icon icon-overview-bars"[^>]*><svg[^>]*viewBox="0 0 32 28"/);
      assert.match(html, /<h3 id="trend-title"><span class="icon icon-trend"[^>]*><svg/);
      assert.match(html, /class="trend-delta is-positive"><span class="icon icon-trend-up trend-direction"[^>]*><svg[\s\S]*?<\/span>\+3%<\/b>/);
      if (!option1Fill) {
        assert.match(html, /class="service-ring is-alert"[^>]*aria-label="63% serviceable"/);
        assert.match(html, /<span class="service-ring-content"><strong>63%<\/strong><\/span>/);
      }
      assert.match(html, /class="option2-stat option2-stat-available"[\s\S]*?<strong>30<\/strong><small>Available<\/small>/);
      assert.match(html, /class="option2-stat option2-stat-total"[\s\S]*?<strong>48<\/strong><small>Total<\/small>/);
    }
    for (const screen of ['all', 'sedan', 'suv', 'people-movers']) {
      const detail = renderScreen({...circular, screen, theme, designOption});
      assert.doesNotMatch(detail, /Available\s*\/\s*Total/);
      assert.equal((detail.match(/data-summary-filter=/g) || []).length, option2Design ? 4 : 3);
      assert.equal((detail.match(/class="count-ring"/g) || []).length, 0);
      assert.equal((detail.match(/class="service-ring(?: is-alert)?"/g) || []).length, option2Design ? (option1Fill ? 0 : 1) : 0);
      assert.equal((detail.match(/class="option2-stat /g) || []).length, option2Design ? 1 : 0);
      if (option2Design) {
        if (option1Fill) {
          assert.match(detail, new RegExp(`class="summary-main percentage-card option1-fill[^"]*"[\\s\\S]*?class="service-percent">${{all:70, sedan:75, suv:63, 'people-movers':75}[screen]}%<\\/strong>`));
        } else {
          assert.match(detail, /class="summary-main percentage-card (?!option1-fill)/);
        }
        assert.match(detail, /class="summary-grid option2-detail-summary"/);
        assert.match(detail, /data-summary-filter="all"[^>]*aria-pressed="true"/);
        assert.match(detail, /class="summary-stat available-stat[^"]*" data-summary-filter="available"/);
        assert.match(detail, /class="option2-stat option2-stat-total"[\s\S]*?<strong>\d+<\/strong><\/span><\/span>/);
        assert.doesNotMatch(detail, /class="summary-total"[\s\S]*?<small>Total<\/small>/);
        assert.match(detail, /class="icon icon-detail-total"[^>]*><svg/);
        assert.match(detail, /class="icon icon-detail-available"[^>]*><svg/);
        assert.match(detail, /class="icon icon-detail-mission"[^>]*><svg/);
        assert.match(detail, /class="icon icon-detail-unavailable"[^>]*><svg/);
        assert.doesNotMatch(detail, /class="static-field status-field"/);
        assert.match(detail, /class="static-field search-field"><span class="icon icon-detail-search"[^>]*><svg/);
        assert.match(detail, /class="icon icon-sliders"[^>]*><svg/);
        assert.equal((detail.match(/<i aria-hidden="true">✓<\/i>/g) || []).length, 10);
        assert.equal((detail.match(/class="vehicle-type-cell"/g) || []).length, screen === 'all' ? 10 : 0);
        if (screen === 'all') {
          assert.match(detail, /class="icon icon-table-sedan"[^>]*><svg/);
          assert.match(detail, /class="icon icon-table-suv"[^>]*><svg/);
          assert.match(detail, /class="icon icon-table-people-movers"[^>]*><svg/);
        }
      } else {
        assert.doesNotMatch(detail, /data-summary-filter="available"|option2-detail-summary/);
        assert.match(detail, /data-summary-filter="serviceability"/);
        assert.match(detail, /class="static-field status-field"/);
        assert.doesNotMatch(detail, /vehicle-type-cell|<i aria-hidden="true">✓<\/i>/);
      }
    }
  }
}

const oldest = renderScreen({...selected, date: '2026-10-20'});
assert.doesNotMatch(oldest, /21-Oct-2026|22-Oct-2026/, 'single-date chart must not expose future snapshots');
assert.match(oldest, /ending at 61%/);
const all = renderScreen(base);
assert.match(all, /120 total vehicles: 84 available, 24 on mission, 12 not available/);
const allReferenceOverview = renderScreen({...base, designOption: '2'});
const normalizeSelectedRadio = html => html.replace(/<fieldset class="design-options">[\s\S]*?<\/fieldset>/, '<fieldset class="design-options">shared selection</fieldset>');
const normalizeOption1Cards = html => normalizeSelectedRadio(html).replace(/<article class="category-card category-(?:all|sedan|suv|people-movers)[\s\S]*?<\/article>/g, '<article class="category-card">shared card</article>');
assert.equal(normalizeOption1Cards(renderScreen({...base, designOption: '1'})), normalizeOption1Cards(allReferenceOverview));
assert.match(allReferenceOverview, /<h2 id="overview-title">Fleet Overview<\/h2><p role="status">All Vehicles \(120 Total\)<\/p>/);
assert.match(allReferenceOverview, /class="trend-current">70%<\/strong>/);
assert.match(allReferenceOverview, /class="trend-delta is-positive"><span class="icon icon-trend-up trend-direction"[^>]*>[\s\S]*?<\/span>\+3%<\/b><span>vs previous day \(67%\)<\/span>/);
assert.match(allReferenceOverview, /<h3 id="status-title">[^<]*Fleet Status<\/h3>/);
assert.match(allReferenceOverview, /class="status-share status-share-available">70%<\/span>/);
assert.match(allReferenceOverview, /class="status-share status-share-mission">20%<\/span>/);
assert.match(allReferenceOverview, /class="status-share status-share-unavailable">10%<\/span>/);
assert.match(allReferenceOverview, /SUV has the lowest serviceability/);
assert.match(allReferenceOverview, /63%<\/em> \(30 of 48 vehicles available\)/);
assert.equal((allReferenceOverview.match(/class="insight-arrow"/g) || []).length, 3);
assert.match(allReferenceOverview, /class="trend-area"[^>]*fill="url\(#trend-fill\)"/);
assert.match(allReferenceOverview, /class="trend-line"[^>]*stroke="var\(--trend-line\)"/);
assert.match(allReferenceOverview, /class="trend-points" fill="var\(--trend-line\)"/);

const allReferenceDetail = renderScreen({...base, screen: 'all', designOption: '2'});
const option1ReferenceDetail = renderScreen({...base, screen: 'all', designOption: '1'});
const normalizeDetailServiceabilityCard = html => html.replace(/    <div class="summary-main[\s\S]*?(?=\n    <div class="summary-stat available-stat)/, '    <div class="summary-main">shared card</div>');
assert.equal(normalizeDetailServiceabilityCard(option1ReferenceDetail), normalizeDetailServiceabilityCard(allReferenceDetail));
assert.match(option1ReferenceDetail, /class="summary-main percentage-card option1-fill[^"]*"[\s\S]*?class="service-percent">70%<\/strong>/);
assert.match(allReferenceDetail, /<h1[^>]*>All Vehicles<\/h1>/);
assert.match(allReferenceDetail, /<span>Unit:<\/span><input[^>]* value="All"/);
assert.match(allReferenceDetail, /<span>Dark Mode<\/span>/);
assert.match(allReferenceDetail, /<strong>John Doe<\/strong>/);
assert.match(allReferenceDetail, /22-Oct-2026/);
assert.match(allReferenceDetail, /<span class="service-ring-content"><strong>70%<\/strong><\/span>/);
assert.match(allReferenceDetail, /class="summary-total"[\s\S]*?<strong>120<\/strong><\/span><\/span>/);
assert.doesNotMatch(allReferenceDetail, /class="summary-total"[\s\S]*?<small>Total<\/small>/);
assert.match(allReferenceDetail, /<strong>84<\/strong><span>Available<\/span>/);
assert.match(allReferenceDetail, /<strong>24<\/strong><span>On Mission<\/span>/);
assert.match(allReferenceDetail, /<strong>12<\/strong><span>Unavailable<\/span>/);
assert.match(allReferenceDetail, /<span>Search by plate number, model or VIN\.\.\.<\/span>/);
assert.match(allReferenceDetail, /<th scope="col">#<\/th><th scope="col">Vehicle Type<\/th><th scope="col">Plate Number<\/th><th scope="col">Model<\/th><th scope="col">Year<\/th><th scope="col">Status<\/th><th scope="col">Last Updated<\/th><th scope="col">Current Assignment<\/th>/);
assert.match(allReferenceDetail, /<p>Showing 1 – 10 of 120 vehicles<\/p>/);
assert.match(allReferenceDetail, /<span>Previous<\/span>/);
assert.match(allReferenceDetail, /<span class="page-status" aria-live="polite">Page 1 of 12<\/span>/);
assert.match(allReferenceDetail, /<span>Next<\/span>/);
assert.match(allReferenceDetail, /<span class="page-size">10 \/ page /);

const sedanReferenceDetail = renderScreen({...base, screen: 'sedan', designOption: '2'});
assert.match(sedanReferenceDetail, /<th scope="col">Status<\/th><th scope="col">Last Updated<\/th>/);
const sedanOption3Detail = renderScreen({...base, screen: 'sedan', designOption: '4'});
assert.match(sedanOption3Detail, /<th scope="col">Status<\/th>/);
assert.match(sedanOption3Detail, /<span>Not Available<\/span>/);

const visibleStatuses = html => [...html.matchAll(/class="status-badge [^"]+"><i[^>]*>[\s\S]*?<\/i>([^<]+)<\/span>/g)].map(match => match[1]);
assert.deepEqual(visibleStatuses(renderScreen({...base, screen: 'all', designOption: '2', page: 9})), [
  'Available', 'Available', 'Available', 'Available', 'On Mission',
  'On Mission', 'On Mission', 'On Mission', 'On Mission', 'On Mission',
]);
assert.deepEqual(visibleStatuses(renderScreen({...base, screen: 'all', designOption: '2', page: 12})), Array(10).fill('Unavailable'));
for (const statusFilter of ['all', 'available', 'mission', 'unavailable']) {
  const detail = renderScreen({...base, screen: 'all', designOption: '2', statusFilter});
  assert.equal(/<th scope="col">Current Assignment<\/th>/.test(detail), statusFilter === 'all' || statusFilter === 'mission');
}
assert.doesNotMatch(renderScreen({...base, screen: 'all', designOption: '1', statusFilter: 'unavailable'}), /<th scope="col">Current Assignment<\/th>/);
assert.match(renderScreen({...base, screen: 'all', designOption: '4', statusFilter: 'unavailable'}), /<th scope="col">Current Assignment<\/th>/);

const suvReferenceOverview = renderScreen({...base, selectedCategory: 'suv', designOption: '2'});
assert.match(suvReferenceOverview, /<p role="status">All Vehicles \(120 Total\)<\/p>/);
assert.match(suvReferenceOverview, /class="trend-current">70%<\/strong>/);
assert.match(suvReferenceOverview, /SUV has the lowest serviceability/);
assert.match(suvReferenceOverview, /30 of 48 vehicles available/);

// Saved overlays affect the overall Fleet Overview without enabling card selection.
const original = JSON.stringify(recordsByDate);
reloadSavedRecords(null);
const availableSuv = recordsByDate['2026-10-22'].find(record => record.category === 'suv' && record.status === 'Available');
saveRecord('2026-10-22', availableSuv.id, {status: 'Non-Serviceable', discoveredDate: '2026-10-22', location: 'Inside Country', deployed: 'No', reason: 'Dashboard test'});
assert.equal(trendData('All', 'suv', '2026-10-22').at(-1).percent, 60);
assert.match(renderScreen({...base, selectedCategory: 'suv'}), /120 total vehicles: 83 available, 24 on mission, 13 not available/);
assert.equal(JSON.stringify(recordsByDate), original);
reloadSavedRecords(null);
console.log('PASS: card/design selection; real dated trends; category panels; both designs/themes; numeric ratios; saved overlays.');

for (const theme of ['light', 'dark']) for (const screen of ['dashboard', 'all', 'sedan', 'suv', 'people-movers']) {
  let option3 = renderScreen({...base, theme, screen, designOption: '3'});
  const option2 = renderScreen({...base, theme, screen, designOption: '2'});
  if (['sedan', 'suv', 'people-movers'].includes(screen)) {
    assert.match(option3, /<th scope="col">Status<\/th><th scope="col">Last Updated<\/th>/);
    assert.equal((option3.match(/class="status-badge /g) || []).length, 10);
    for (const statusFilter of ['available', 'mission', 'unavailable']) {
      assert.doesNotMatch(renderScreen({...base, theme, screen, designOption: '3', statusFilter}), /<th scope="col">Status<\/th>/);
    }
  }
  const normalize = html => html.replace(/(name="dashboard-design" value="[23]") checked/g, '$1');
  assert.equal(normalize(option3), normalize(option2), 'Options 2 and 3 share table behavior: ' + screen + '/' + theme);
}

for (const designOption of ['1', '2', '3']) for (const theme of ['light', 'dark']) for (const screen of ['sedan', 'suv', 'people-movers']) {
  const detail = renderScreen({...base, designOption, theme, screen, statusFilter: 'all'});
  assert.match(detail, /<th scope="col">Status<\/th><th scope="col">Last Updated<\/th>/);
  assert.equal((detail.match(/class="status-badge /g) || []).length, 10);
  for (const statusFilter of ['available', 'mission', 'unavailable']) assert.doesNotMatch(renderScreen({...base, designOption, theme, screen, statusFilter}), /<th scope="col">Status<\/th>/);
}
