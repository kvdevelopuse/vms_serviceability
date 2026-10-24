// DOM behavior check using an existing jsdom installation (no layout/native browser claims).
// Set VMS_QA_MODULE_ROOT to the existing QA package directory containing jsdom.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');
const qaRequire = createRequire(path.resolve(process.env.VMS_QA_MODULE_ROOT || '.', 'package.json'));
const {JSDOM, VirtualConsole} = qaRequire('jsdom');
const root = path.resolve(__dirname, '../prototype');
// This asserts the actual computed wrapping policy, not layout geometry.
const {renderScreen} = require('../prototype/app.js');
const headerStyleFixture = new JSDOM(`<html data-theme="light" data-design="2"><body>${renderScreen({screen:'dashboard',theme:'light',unit:'All',date:'2026-10-22',designOption:'2'})}</body></html>`, {virtualConsole: new VirtualConsole()});
const stylesheet = headerStyleFixture.window.document.createElement('style');
stylesheet.textContent = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
headerStyleFixture.window.document.head.append(stylesheet);
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('h1')).overflowWrap, 'anywhere', 'long heading words must wrap inside narrow header columns');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.category-label')).position, 'static', 'Option 2 arrow must be positioned against the full card, not the title row');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.round-arrow')).position, 'absolute');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.trend-current')).color, 'rgb(7, 95, 70)');
assert.ok(headerStyleFixture.window.document.querySelector('.overview-heading .icon-overview-bars svg'), 'Option 2 needs the reference four-bar Fleet Overview mark');
assert.ok(headerStyleFixture.window.document.querySelector('#trend-title .icon-trend svg'), 'Option 2 needs the reference connected-point trend mark');
assert.ok(headerStyleFixture.window.document.querySelector('.trend-delta .icon-trend-up svg'), 'positive change needs the reference direction arrow');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('#trend-title')).display, 'flex');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.trend-delta')).display, 'flex');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.trend-direction')).borderRadius, '50%');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.trend-direction')).backgroundColor, 'rgb(218, 248, 237)');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.donut-wrap')).position, 'relative');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.status-legend > div')).background, 'var(--surface-soft)');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.insight-serviceability')).background, 'rgb(255, 237, 240)');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.insight-mission')).background, 'rgb(235, 245, 255)');
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.insight-unavailable')).background, 'rgb(255, 247, 229)');
const option1Fixture = new JSDOM(`<html data-theme="light" data-design="1"><body>${renderScreen({screen:'dashboard',theme:'light',unit:'All',date:'2026-10-22',designOption:'1'})}</body></html>`, {virtualConsole:new VirtualConsole()});
const option1Style = option1Fixture.window.document.createElement('style');
option1Style.textContent = stylesheet.textContent;
option1Fixture.window.document.head.append(option1Style);
assert.equal(option1Fixture.window.getComputedStyle(option1Fixture.window.document.querySelector('.category-card')).overflow, 'hidden', 'vehicle artwork must stay inside every card');
assert.equal(option1Fixture.window.document.querySelectorAll('.card-select, .category-card.is-selected').length, 0, 'cards have no selection control or selection border state');
option1Fixture.window.close();
for (const theme of ['light', 'dark']) {
  for (const screen of ['dashboard', 'suv']) {
    const fixtures = ['1', '2'].map(designOption => {
      const fixture = new JSDOM(`<html data-theme="${theme}" data-design="${designOption}"><body>${renderScreen({screen,theme,unit:'All',date:'2026-10-22',designOption})}</body></html>`, {virtualConsole:new VirtualConsole()});
      const style = fixture.window.document.createElement('style');
      style.textContent = stylesheet.textContent;
      fixture.window.document.head.append(style);
      return fixture;
    });
    const selector = screen === 'dashboard' ? '.category-suv' : '.summary-main';
    const properties = ['background', 'border', 'display', 'gridTemplateColumns', 'minHeight'];
    const computed = fixtures.map(fixture => fixture.window.getComputedStyle(fixture.window.document.querySelector(selector)));
    for (const property of properties) assert.equal(computed[1][property], computed[0][property], `Option 1 ${theme}/${screen} ${property} matches Option 2`);
    fixtures.forEach(fixture => fixture.window.close());
  }
}
headerStyleFixture.window.document.body.insertAdjacentHTML('beforeend', renderScreen({screen:'suv',theme:'light',unit:'All',date:'2026-10-22',statusFilter:'mission'}));
assert.equal(headerStyleFixture.window.getComputedStyle(headerStyleFixture.window.document.querySelector('.summary-filter.active')).outlineOffset, '-3px', 'selection outline must stay inside the detail overflow clip');
for (const ring of headerStyleFixture.window.document.querySelectorAll('.service-ring')) {
  const label = headerStyleFixture.window.getComputedStyle(ring.querySelector('.service-ring-content'));
  assert.equal(ring.querySelector('.service-ring-content').textContent.trim(), ring.getAttribute('aria-label').split(' ')[0]);
  assert.equal(label.position, 'absolute', 'ring labels need an independent full-size centering layer');
  assert.equal(label.display, 'grid');
  assert.equal(label.placeItems, 'center');
  assert.equal(label.textAlign, 'center');
  assert.equal(label.width, '100%');
  assert.equal(label.height, '100%');
}
headerStyleFixture.window.close();
for (const theme of ['light', 'dark']) {
  for (const screen of ['dashboard', 'all', 'sedan', 'suv', 'people-movers']) {
    const fixture = new JSDOM(`<html data-theme="${theme}" data-design="2"><body>${renderScreen({screen,theme,unit:'All',date:'2026-10-22',designOption:'2'})}</body></html>`, {virtualConsole:new VirtualConsole()});
    const style = fixture.window.document.createElement('style');
    style.textContent = stylesheet.textContent;
    fixture.window.document.head.append(style);
    for (const label of fixture.window.document.querySelectorAll('.service-ring-content')) {
      const computed = fixture.window.getComputedStyle(label);
      assert.equal(label.textContent.trim(), label.parentElement.getAttribute('aria-label').split(' ')[0]);
      assert.equal(computed.position, 'absolute', `${theme}/${screen} centered label layer`);
      assert.equal(computed.placeItems, 'center');
      assert.equal(computed.width, '100%');
      assert.equal(computed.height, '100%');
      assert.equal(computed.textAlign, 'center');
    }
    const card = fixture.window.document.querySelector(screen==='dashboard' ? '.category-sedan' : '.summary-main');
    // jsdom retains var() references; the real-browser journey checks resolved colors.
    const palette=fixture.window.getComputedStyle(card);
    const expectedSurface = screen === 'dashboard' ? (theme==='light' ? '#fff8eb' : '#382918') : ({all:theme==='light' ? '#eff8ff' : '#132d42',sedan:theme==='light' ? '#fff8eb' : '#382918',suv:theme==='light' ? '#f6f2ff' : '#2b2344','people-movers':theme==='light' ? '#eefcf7' : '#15362e'}[screen]);
    const surface = palette.getPropertyValue('--option2-surface').trim() || fixture.window.getComputedStyle(fixture.window.document.documentElement).getPropertyValue('--option2-surface').trim();
    assert.equal(surface, expectedSurface);
    assert.equal(fixture.window.getComputedStyle(card).background, 'var(--option2-surface)', `${theme}/${screen} landing/detail card color parity`);
    if (screen==='dashboard') assert.equal(fixture.window.document.querySelectorAll('.category-card.is-selected, .card-select').length, 0);
    if (screen!=='dashboard') {
      const summaryCards = [...fixture.window.document.querySelectorAll('.summary-grid > *')];
      assert.equal(summaryCards.length, 4);
      for (const summaryCard of summaryCards) {
        const summaryStyle = fixture.window.getComputedStyle(summaryCard);
        assert.equal(summaryStyle.height, '156px', `${theme}/${screen} reference card height`);
        assert.equal(summaryStyle.minHeight, '156px', `${theme}/${screen} reference card minimum height`);
        assert.equal(summaryStyle.borderTopWidth, summaryCard.classList.contains('active') ? '2px' : '1px', `${theme}/${screen} selected/unselected border width`);
      }
      const detailRingStyle = fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-main .service-ring'));
      assert.equal(detailRingStyle.width, '124px');
      assert.equal(detailRingStyle.height, '124px');
      assert.equal(detailRingStyle.marginTop, '0px', `${theme}/${screen} ring vertical centering`);
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-main .service-ring-content strong')).fontSize, '28px');
      assert.equal(fixture.window.document.querySelector('.summary-main .service-ring-content small'), null);
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-total .option2-stat strong')).fontSize, '28px');
      assert.equal(fixture.window.document.querySelector('.summary-total .option2-stat small'), null);
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-grid')).gridTemplateColumns, '2fr repeat(3, minmax(0, 1fr))');
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-main .vehicle-art')).gridRow, 'auto');
      const progressStyle = fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-main > .summary-percent'));
      assert.equal(progressStyle.alignSelf, 'stretch');
      assert.equal(progressStyle.justifyContent, 'center');
      assert.equal(progressStyle.justifySelf, 'center');
      const totalStyle = fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-main > .summary-total'));
      assert.equal(totalStyle.alignSelf, 'center');
      assert.equal(totalStyle.justifySelf, 'center');
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.mission-stat strong')).color, theme === 'light' ? 'rgb(240, 145, 0)' : 'rgb(255, 190, 92)');
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-stat .status-icon')).width, '76px');
      for (const statusCard of fixture.window.document.querySelectorAll('.summary-stat')) {
        assert.equal(fixture.window.getComputedStyle(statusCard).gridTemplateColumns, '76px max-content max-content');
        assert.equal(fixture.window.getComputedStyle(statusCard.querySelector(':scope > div')).display, 'contents');
        assert.equal(fixture.window.getComputedStyle(statusCard.querySelector(':scope > div > span')).gridRow, '1');
        const isAvailable = statusCard.classList.contains('available-stat');
        assert.equal(fixture.window.getComputedStyle(statusCard.querySelector('strong')).gridRow, '1 / 3');
        const percentage = fixture.window.getComputedStyle(statusCard.querySelector(':scope > b'));
        assert.equal(percentage.gridRow, '1 / 3');
        const count = fixture.window.getComputedStyle(statusCard.querySelector('strong'));
        assert.equal(percentage.fontSize, count.fontSize);
        assert.equal(percentage.fontSize, '22px');
        assert.equal(percentage.lineHeight, count.lineHeight);
        assert.equal(percentage.lineHeight, '1');
        assert.equal(percentage.fontWeight, '400');
        assert.equal(count.fontWeight, '400');
        if (isAvailable) {
          assert.equal(count.textAlign, 'center');
          assert.equal(percentage.textAlign, 'center');
          const labelTransform = fixture.window.getComputedStyle(statusCard.querySelector(':scope > div > span')).transform;
          assert.equal(labelTransform, 'translateY(-6px)');
          assert.equal(fixture.window.getComputedStyle(statusCard.querySelector('.status-icon')).transform, labelTransform);
          assert.equal(count.transform, 'none');
          assert.equal(percentage.transform, 'none');
        }
        assert.equal(percentage.paddingLeft, '14px');
        assert.equal(percentage.backgroundSize, '1px 70%');
        assert.equal(fixture.window.getComputedStyle(statusCard.querySelector(':scope > div > span')).transform, 'translateY(-6px)');
      }
      if (theme === 'light') {
        const ringStyle = fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-main .service-ring'));
        const ringColor = ringStyle.getPropertyValue('--option2-ring').trim() || fixture.window.getComputedStyle(fixture.window.document.documentElement).getPropertyValue('--option2-ring').trim();
        assert.equal(ringColor, screen === 'suv' ? '#ff3d4f' : '#08a875');
        const rows = fixture.window.document.querySelectorAll('tbody tr');
        assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('thead')).backgroundColor, 'rgb(232, 228, 223)');
        assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.table-panel')).getPropertyValue('--border').trim(), '#eff0f0');
        assert.equal(fixture.window.getComputedStyle(rows[0]).backgroundColor, 'rgb(250, 249, 248)');
        assert.equal(fixture.window.getComputedStyle(rows[1]).backgroundColor, 'rgb(255, 255, 255)');
        assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.available-stat')).backgroundColor, 'rgb(242, 250, 244)');
        assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.mission-stat')).backgroundColor, 'rgb(255, 249, 238)');
        assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.unavailable-stat')).backgroundColor, 'rgb(254, 240, 241)');
      }
      for (const designOption of ['1','2','3']) {
        const option2Design = designOption !== '3';
        fixture.window.document.documentElement.dataset.design=designOption;
        const statusFilters = option2Design ? ['all','available','mission','unavailable'] : ['serviceability','mission','unavailable'];
        for (const statusFilter of statusFilters) {
          fixture.window.document.body.innerHTML=renderScreen({screen,theme,unit:'All',date:'2026-10-22',designOption,statusFilter});
          const activeStyle = fixture.window.getComputedStyle(fixture.window.document.querySelector('.summary-filter.active'));
          assert.equal(activeStyle.outlineOffset, '-3px', `${screen}/${theme}/${designOption}/${statusFilter} all selection edges stay in bounds`);
          if (option2Design) {
            assert.equal(activeStyle.borderTopWidth, '2px');
            assert.equal(activeStyle.borderTopColor, theme === 'light' ? 'rgb(8, 124, 255)' : 'rgb(42, 178, 223)');
          }
        }
      }
    }
    fixture.window.close();
  }
}
const errors = [];
const consoleOutput = new VirtualConsole();
consoleOutput.on('jsdomError', error => errors.push(error.message));
const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {url: 'https://prototype.test/index.html', runScripts:'outside-only', pretendToBeVisual:true, virtualConsole:consoleOutput});
const {window} = dom;
// jsdom has no layout/animations/native modal implementation. Emulate reduced motion
// and modal open/close only, so the application's own delegated handlers can run.
window.matchMedia = () => ({matches:true});
window.scrollTo = () => {};
window.HTMLDialogElement.prototype.showModal = function () {this.open = true;};
window.HTMLDialogElement.prototype.close = function () {this.open = false; this.dispatchEvent(new window.Event('close'));};
window.eval(fs.readFileSync(path.join(root, 'app.js'), 'utf8'));
const doc = window.document;
const query = selector => {const node = doc.querySelector(selector); assert.ok(node, `missing ${selector}`); return node;};
const click = selector => query(selector).click();
const change = (selector, value) => {const node=query(selector); node.value=value; node.dispatchEvent(new window.Event('change', {bubbles:true}));};
const navigate = async selector => {
  const target = query(selector).closest('a').hash.slice(1);
  click(selector);
  const deadline = Date.now() + 1500;
  while (doc.documentElement.dataset.screen !== target && Date.now() < deadline) await new Promise(resolve => window.setTimeout(resolve, 5));
  assert.equal(doc.documentElement.dataset.screen, target, `navigation to ${target}, URL ${window.location.hash}`);
};
(async () => {
  try {
    assert.equal(doc.querySelectorAll('.card-select, .category-card.is-selected').length, 0);
    assert.equal(doc.documentElement.dataset.design, '1');
    const immutable = JSON.stringify(window.prototypeApi.recordsByDate);
    for (const theme of ['light', 'dark']) {
      if (doc.documentElement.dataset.theme !== theme) click('#theme-toggle');
      for (const option of ['1', '2', '3']) {
        const option2Design = option !== '3';
        change('[name="dashboard-design"][value="' + option + '"]', option);
        assert.equal(doc.documentElement.dataset.design, option);
        for (const category of ['all','sedan','suv','people-movers']) {
          click(`.category-${category}`);
          assert.equal(window.location.hash, '');
          assert.equal(query('.donut').getAttribute('aria-label'), '120 total vehicles: 84 available, 24 on mission, 12 not available');
          assert.equal(query('.overview-heading p').textContent, 'All Vehicles (120 Total)');
          assert.equal(query('#overview-title').textContent, 'Fleet Overview');
          assert.equal(doc.querySelectorAll('.overview .period').length, 0);
          assert.equal(query('#status-title').textContent.trim(), 'Fleet Status');
          assert.equal(query('.trend-current').textContent, '70%');
          assert.equal(query('.status-share-mission').textContent, '20%');
          assert.equal(query('.status-share-unavailable').textContent, '10%');
          assert.equal(doc.querySelectorAll('.count-ring').length, 0);
          assert.equal(doc.querySelectorAll('.service-ring').length, option2Design ? 4 : 0);
          assert.equal(doc.querySelectorAll('.option2-stat').length, option2Design ? 8 : 0);
        }
      }
    }
    await navigate('.category-suv .round-arrow .icon');
    assert.equal(doc.documentElement.dataset.design, '3');
    assert.equal(doc.querySelectorAll('.summary-filter').length, 3);
    assert.equal(doc.querySelectorAll('.service-ring, .option2-stat').length, 0);
    await navigate('.back-button');
    change('[name="dashboard-design"][value="2"]', '2');
    click('.category-sedan');
    change('#unit-filter', 'Unit C');
    change('#dashboard-date', '2026-10-21');
    assert.equal(query('.donut').getAttribute('aria-label'), '29 total vehicles: 20 available, 7 on mission, 2 not available');
    assert.equal(doc.querySelectorAll('.trend-chart circle').length, 2);
    assert.equal(query('.trend-chart').getAttribute('aria-label'), 'All Vehicles serviceability trend for Unit C from 20-Oct-2026 to 21-Oct-2026, ending at 69%');
    await navigate('.category-suv .round-arrow .icon');
    assert.equal(window.location.hash, '#suv');
    assert.equal(query('#detail-unit').value, 'Unit C');
    assert.equal(doc.documentElement.dataset.design, '2');
    assert.equal(doc.querySelectorAll('.service-ring').length, 1);
    assert.equal(doc.querySelectorAll('.option2-stat').length, 1);
    assert.equal(doc.querySelectorAll('.summary-grid > *').length, 4);
    assert.equal(doc.querySelectorAll('.available-stat').length, 1);
    assert.equal(doc.querySelectorAll('.status-field').length, 0);
    assert.equal(query('.summary-main').dataset.summaryFilter, 'all');
    assert.equal(query('.summary-main').getAttribute('aria-pressed'), 'true');
    assert.doesNotMatch(query('.summary-main').textContent, /Available\s*\/\s*Total/);
    assert.ok([...doc.querySelectorAll('th')].some(cell => cell.textContent === 'Current Assignment'));
    click('[data-summary-filter="mission"]');
    assert.equal(doc.querySelectorAll('tbody tr').length, 4);
    assert.ok([...doc.querySelectorAll('th')].some(cell => cell.textContent === 'Current Assignment'));
    query('[data-summary-filter="available"]').dispatchEvent(new window.KeyboardEvent('keydown', {key:' ',bubbles:true}));
    assert.equal(doc.querySelectorAll('tbody tr').length, 6);
    assert.equal(query('[data-summary-filter="available"]').getAttribute('aria-pressed'), 'true');
    assert.equal([...doc.querySelectorAll('th')].some(cell => cell.textContent === 'Current Assignment'), false);
    click('[data-summary-filter="unavailable"]');
    assert.equal([...doc.querySelectorAll('th')].some(cell => cell.textContent === 'Current Assignment'), false);
    click('[data-summary-filter="all"]');
    assert.equal(doc.querySelectorAll('tbody tr').length, 10);
    assert.ok([...doc.querySelectorAll('th')].some(cell => cell.textContent === 'Current Assignment'));
    await navigate('.back-button');
    assert.equal(doc.querySelectorAll('.category-card.is-selected').length, 0);
    assert.equal(query('#dashboard-date').value, '2026-10-21');
    assert.equal(query('#unit-filter').value, 'Unit C');
    change('#dashboard-date', '2026-10-20');
    assert.equal(doc.querySelectorAll('.trend-chart circle').length, 1);
    assert.doesNotMatch(query('.trend-chart').textContent, /21-Oct|22-Oct/);
    change('#unit-filter', 'All');
    change('#dashboard-date', '2026-10-22');
    for (const option of ['1', '2', '3']) {
      const option2Design = option !== '3';
      change(`[name="dashboard-design"][value="${option}"]`, option);
      for (const category of ['all', 'sedan', 'suv', 'people-movers']) {
        await navigate(`.category-${category} .round-arrow`);
        assert.equal(query('h1').textContent, {all:'All Vehicles', sedan:'Sedan', suv:'SUV', 'people-movers':'People Movers'}[category]);
        assert.equal(doc.querySelectorAll('.summary-filter').length, option2Design ? 4 : 3);
        assert.equal(doc.querySelectorAll('.available-stat').length, option2Design ? 1 : 0);
        assert.equal(doc.querySelectorAll('.service-ring').length, option2Design ? 1 : 0);
        assert.equal(query('.summary-main').dataset.summaryFilter, option2Design ? 'all' : 'serviceability');
        assert.equal(doc.querySelectorAll('.status-field').length, option2Design ? 0 : 1);
        assert.equal(doc.querySelectorAll('.status-badge i').length, option2Design && category !== 'all' ? 0 : doc.querySelectorAll('tbody tr').length);
        assert.equal([...doc.querySelectorAll('.status-badge i')].every(mark => mark.textContent === (option2Design ? '✓' : '')), true);
        assert.equal(doc.querySelectorAll('.vehicle-type-cell').length, option2Design && category === 'all' ? doc.querySelectorAll('tbody tr').length : 0);
        assert.doesNotMatch(query('.summary-grid').textContent, /Available\s*\/\s*Total/);
        await navigate('.back-button');
      }
    }
    await navigate('.category-all .round-arrow');
    click('[data-page-action="next"]');
    assert.equal(query('.page-status').textContent, 'Page 2 of 12');
    assert.equal(doc.querySelectorAll('tbody tr').length, 10);
    click('[data-page-action="previous"]');
    const row = query('tbody tr');
    const editedId = row.dataset.recordId;
    row.dispatchEvent(new window.MouseEvent('dblclick', {bubbles:true}));
    const dialog = query('dialog[open]');
    assert.equal(dialog.querySelector('[name="status"]').disabled, true);
    click('[data-action="modify"]');
    dialog.querySelector('[name="reason"]').value = 'Discard me';
    click('[data-action="cancel"]');
    assert.equal(query('dialog [name="reason"]').value, '');
    click('[data-action="modify"]');
    query('dialog [name="status"]').value = 'Non-Serviceable';
    query('dialog [name="reason"]').value = 'Dashboard DOM check';
    click('[data-action="save"]');
    assert.equal(query('.summary-percent').textContent, '69%');
    assert.equal(JSON.parse(window.localStorage.getItem(window.prototypeApi.STORAGE_KEY)).edits[`2026-10-22|${editedId}`].reason, 'Dashboard DOM check');
    click('[data-action="close"]');
    await navigate('.back-button');
    assert.match(query('.donut').getAttribute('aria-label'), /120 total vehicles: 83 available, 24 on mission, 13 not available/);
    assert.match(query('.trend-chart').getAttribute('aria-label'), /ending at 69%/);
    assert.equal(JSON.stringify(window.prototypeApi.recordsByDate), immutable);
    assert.deepEqual(errors, []);
    console.log('PASS: actual app DOM events; both themes/options; card/arrow isolation; Unit/date retention; snapshot trends; detail filtering/pagination; popup save/cancel and storage. Layout and native browser animation/keyboard behavior are not covered.');
  } finally {window.close();}
})().catch(error => {console.error(error); process.exitCode=1;});
