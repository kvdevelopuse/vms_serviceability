// Uses an already-installed Playwright; set VMS_QA_MODULE_ROOT and, if needed, VMS_BROWSER_EXECUTABLE.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {createRequire} = require('node:module');
const {pathToFileURL} = require('node:url');
const qaRequire = createRequire(path.resolve(process.env.VMS_QA_MODULE_ROOT || '.', 'package.json'));
const {chromium} = qaRequire('playwright');
const root = path.resolve(__dirname, '..');
const artifacts = path.join(root, '.rollback/dashboard-ui-work');
fs.mkdirSync(artifacts, {recursive: true});
const types = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jsx': 'text/plain', '.md': 'text/plain'};
const server = http.createServer((request, response) => {
  const filename = path.resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
  if (!filename.startsWith(root + path.sep)) {response.writeHead(403).end(); return;}
  fs.readFile(filename, (error, bytes) => {
    if (error) {response.writeHead(404).end(); return;}
    response.writeHead(200, {'Content-Type': types[path.extname(filename)] || 'application/octet-stream'}).end(bytes);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless: true, ...(process.env.VMS_BROWSER_EXECUTABLE ? {executablePath: process.env.VMS_BROWSER_EXECUTABLE} : {})});
    const page = await browser.newPage({viewport: {width: 1920, height: 1080}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const origin = `http://127.0.0.1:${server.address().port}`;
    if (!process.argv.includes('--options-only')) {
      await page.goto(`${origin}/tests/ui-refinements-check.html`);
      await page.waitForFunction(() => document.body.dataset.result !== 'running', null, {timeout: 60000});
      const result = await page.locator('#result').textContent();
      assert.match(result, /^PASS:/, result);
      console.log(result);
    }
    if (process.argv.includes('--legacy-only')) return;
    await page.goto(`${origin}/prototype/index.html`);
    assert.equal(await page.locator('[name="dashboard-design"]').count(), 2);
    assert.equal(await page.locator('[name="dashboard-design"][value="3"]').count(), 0);
    const card = category => page.locator(`.category-${category}`);
    const arrow = category => page.locator(`.category-${category} .round-arrow`);
    const assertRingCenters = async () => {
      const centers = await page.locator('.service-ring').evaluateAll(rings => rings.map(ring => {
        const circle=ring.getBoundingClientRect();
        const label=ring.querySelector('.service-ring-content').getBoundingClientRect();
        return {dx:Math.abs((circle.left+circle.right-label.left-label.right)/2),dy:Math.abs((circle.top+circle.bottom-label.top-label.bottom)/2)};
      }));
      assert.ok(centers.length>0 && centers.every(center=>center.dx<.5 && center.dy<.5), `ring labels must be centered: ${JSON.stringify(centers)}`);
    };
    const design = async option => {
      await page.locator(`[name="dashboard-design"][value="${option}"]`).check();
      assert.equal(await page.locator('html').getAttribute('data-design'), option);
    };
    const assertOverview = async () => {
      assert.equal(await page.locator('.card-select, .category-card.is-selected').count(), 0);
      assert.match(await page.locator('.donut').getAttribute('aria-label'), /120 total vehicles: 84 available, 24 on mission, 12 not available/);
      assert.match(await page.locator('.insights-panel').innerText(), /30 of 48 vehicles available/);
      assert.equal((await page.locator('.overview-heading p').innerText()).trim(), 'All Vehicles (120 Total)');
      assert.equal((await page.locator('#overview-title').innerText()).trim(), 'Fleet Overview');
      assert.equal(await page.locator('.overview .period').count(), 0);
      assert.equal((await page.locator('#status-title').innerText()).trim(), 'Fleet Status');
      assert.equal((await page.locator('.trend-current').innerText()).trim(), '70%');
      assert.equal(await page.locator('.insight-arrow').count(), 3);
      assert.equal(await page.locator('.trend-chart circle').count(), 3);
      assert.equal(await page.locator('.category-card').evaluateAll(cards => cards.every(card => !/Available\s*\/\s*Total/.test(card.textContent))), true);
    };
    for (const theme of ['light', 'dark']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('#theme-toggle').click();
      for (const option of ['1', '2']) {
        const option2Design = option !== '3';
        const option1LightFill = option === '1' && theme === 'light';
        await design(option);
        for (const category of ['all','sedan','suv','people-movers']) {
          await card(category).click();
          assert.equal(new URL(page.url()).hash, '');
          await assertOverview();
        }
        assert.equal(await page.locator('.count-ring').count(), 0);
        assert.equal(await page.locator('.service-ring').count(), option2Design ? (option1LightFill ? 0 : 4) : 0);
        assert.equal(await page.locator('.option2-stat').count(), option2Design ? 8 : 0);
        if (option2Design) {
          if (!option1LightFill) await assertRingCenters();
          const backgrounds = await page.locator('.category-card').evaluateAll(cards => cards.map(card => getComputedStyle(card).backgroundColor));
          const expected = theme==='light' ? ['rgb(239, 248, 255)','rgb(255, 248, 235)','rgb(246, 242, 255)','rgb(238, 252, 247)'] : ['rgb(19, 45, 66)','rgb(56, 41, 24)','rgb(43, 35, 68)','rgb(21, 54, 46)'];
          if (option1LightFill) {
            const fills = await page.locator('.category-card').evaluateAll(cards => cards.map(card => getComputedStyle(card).backgroundImage));
            const colors = ['239, 248, 255', '255, 248, 235', '246, 242, 255', '238, 252, 247'];
            const percents = [70, 75, 63, 75];
            fills.forEach((fill, index) => assert.match(fill, new RegExp(`linear-gradient\\(to right, rgb\\(${colors[index]}\\) 0px, rgb\\(${colors[index]}\\) ${percents[index]}%, rgb\\(255, 255, 255\\) ${percents[index]}%, rgb\\(255, 255, 255\\) 100%\\)`)));
          } else {
            assert.equal(new Set(backgrounds).size, 4, 'reference design uses a distinct tint for every category');
            assert.deepEqual(backgrounds, expected);
          }
          if (!option1LightFill) {
            const ringStyle = await page.locator('.service-ring').first().evaluate(node => ({image: getComputedStyle(node).backgroundImage, radius: getComputedStyle(node).borderRadius}));
            assert.match(ringStyle.image, /conic-gradient/);
            assert.equal(ringStyle.radius, '50%');
          }
        } else {
          const background = await page.locator('.category-sedan').evaluate(node => getComputedStyle(node).backgroundImage);
          assert.match(background, /linear-gradient/);
          if (theme === 'light') assert.ok(background.includes('rgb(158, 229, 210)') && background.includes('rgb(233, 241, 249)'), background);
        }
      }
    }

    if (process.argv.includes('--landing-only')) {
      assert.deepEqual(errors, []);
      console.log('PASS: landing cards in all designs/themes, including all Option 1 light card fills.');
      return;
    }

    if (process.argv.includes('--option1-detail-fill-only')) {
      if (await page.locator('html').getAttribute('data-theme') !== 'light') await page.locator('#theme-toggle').click();
      await design('1');
      const colors = {all:'239, 248, 255', sedan:'255, 248, 235', suv:'246, 242, 255', 'people-movers':'238, 252, 247'};
      const percents = {all:70, sedan:75, suv:63, 'people-movers':75};
      for (const category of Object.keys(percents)) {
        await arrow(category).click();
        await page.waitForSelector(`.detail-${category}`);
        assert.equal(await page.locator('.summary-main .service-ring').count(), 0);
        assert.equal((await page.locator('.summary-main .service-percent').innerText()).trim(), `${percents[category]}%`);
        assert.equal(await page.locator('.summary-grid > .option1-fill').count(), 1);
        const fill = await page.locator('.summary-main').evaluate(card => getComputedStyle(card).backgroundImage);
        assert.match(fill, new RegExp(`linear-gradient\\(to right, rgb\\(${colors[category]}\\) 0px, rgb\\(${colors[category]}\\) ${percents[category]}%, rgb\\(255, 255, 255\\) ${percents[category]}%, rgb\\(255, 255, 255\\) 100%\\)`));
        assert.equal(await page.locator('.summary-stat').evaluateAll(cards => cards.every(card => getComputedStyle(card).backgroundImage === 'none')), true);
        await page.locator('.back-button').click();
        await page.waitForSelector('.dashboard');
      }
      assert.deepEqual(errors, []);
      console.log('PASS: Option 1 light detail Serviceability card fill; all other detail cards unchanged.');
      return;
    }

    await design('2');

    // Card bodies are static; only the separate arrows navigate.
    await card('suv').click();
    await card('sedan').click();
    await assertOverview();
    await page.locator('#unit-filter').selectOption('Unit C');
    await page.locator('#dashboard-date').fill('2026-10-21');
    assert.match(await page.locator('.donut').getAttribute('aria-label'), /29 total vehicles: 20 available, 7 on mission, 2 not available/);
    assert.equal(await page.locator('.trend-chart circle').count(), 2);
    await arrow('suv').focus();
    await page.keyboard.press('Enter');
    await page.waitForSelector('.detail-suv');
    assert.equal(await page.locator('html').getAttribute('data-design'), '2');
    assert.equal(await page.locator('#detail-unit').inputValue(), 'Unit C');
    assert.equal(await page.locator('.service-ring').count(), 1);
    assert.equal(await page.locator('.option2-stat').count(), 1);
    assert.equal(await page.locator('.summary-grid > *').count(), 4);
    assert.equal(await page.locator('.available-stat').count(), 1);
    assert.equal(await page.locator('.status-field').count(), 0);
    assert.equal(await page.locator('.summary-main').getAttribute('data-summary-filter'), 'all');
    assert.doesNotMatch(await page.locator('.summary-grid').innerText(), /Available\s*\/\s*Total/);
    await page.locator('[data-summary-filter="mission"]').click();
    assert.equal(await page.locator('.summary-filter.active').evaluate(node=>getComputedStyle(node).outlineOffset), '-3px', 'all selection edges must remain within the detail clip');
    assert.equal(await page.locator('tbody tr').count(), 4);
    await page.locator('.back-button').click();
    await page.waitForSelector('.dashboard');
    assert.equal(await page.locator('.category-card.is-selected').count(), 0);
    assert.equal(await page.locator('#dashboard-date').inputValue(), '2026-10-21');
    await page.goBack();
    await page.waitForSelector('.detail-suv');
    await page.goForward();
    await page.waitForSelector('.dashboard');
    assert.equal(await page.locator('.category-card.is-selected').count(), 0);
    await page.locator('#dashboard-date').fill('2026-10-20');
    assert.equal(await page.locator('.trend-chart circle').count(), 1);
    assert.doesNotMatch(await page.locator('.trend-chart').textContent(), /21-Oct|22-Oct/);

    await page.locator('#unit-filter').selectOption('All');
    await page.locator('#dashboard-date').fill('2026-10-22');
    for (const option of ['1', '2']) {
      const option2Design = option !== '3';
      await design(option);
      for (const category of ['all', 'sedan', 'suv', 'people-movers']) {
        await arrow(category).click();
        await page.waitForSelector(`.detail-${category}`);
        assert.equal(await page.locator('.summary-filter').count(), option2Design ? 4 : 3);
        assert.equal(await page.locator('.available-stat').count(), option2Design ? 1 : 0);
        assert.equal(await page.locator('.service-ring').count(), option2Design ? 1 : 0);
        assert.equal(await page.locator('.summary-main').getAttribute('data-summary-filter'), option2Design ? 'all' : 'serviceability');
        assert.equal(await page.locator('.status-field').count(), option2Design ? 0 : 1);
        if (option2Design) {
          await assertRingCenters();
          const serviceabilityCenter = await page.locator('.summary-main').evaluate(card => {
            const cardBox = card.getBoundingClientRect();
            const ringBox = card.querySelector('.service-ring').getBoundingClientRect();
            const percentageBox = card.querySelector('.service-ring-content strong').getBoundingClientRect();
            const cardCenter = (cardBox.top + cardBox.bottom) / 2;
            const ringCenter = (ringBox.top + ringBox.bottom) / 2;
            return {ring: Math.abs(ringCenter - cardCenter), percentage: Math.abs((percentageBox.top + percentageBox.bottom) / 2 - ringCenter)};
          });
          assert.ok(serviceabilityCenter.ring < .5 && serviceabilityCenter.percentage < .5, `Serviceability ring and percentage must share the card midline: ${JSON.stringify(serviceabilityCenter)}`);
          const statusCenters = await page.locator('.summary-stat').evaluateAll(cards => cards.map(card => {
            const cardBox = card.getBoundingClientRect();
            const centerOffset = node => {
              const box = node.getBoundingClientRect();
              return Math.abs((box.top + box.bottom - cardBox.top - cardBox.bottom) / 2);
            };
            return {count: centerOffset(card.querySelector('strong')), percentage: centerOffset(card.querySelector(':scope > b'))};
          }));
          assert.ok(statusCenters.every(center => center.count < .5 && center.percentage < .5), `Status values must sit on each card midline: ${JSON.stringify(statusCenters)}`);
        }
        await page.locator('.back-button').click();
        await page.waitForSelector('.dashboard');
      }
    }

    // Header/card layout must remain contained under both options, including small screens.
    if (await page.locator('html').getAttribute('data-theme') !== 'light') await page.locator('#theme-toggle').click();
    for (const [width, height] of [[1920,1080], [1366,768], [800,900], [390,844], [320,740]]) {
      await page.setViewportSize({width, height});
      for (const option of ['1', '2']) {
        await design(option);
        const geometry = await page.evaluate(() => {
          const box = selector => {const b = document.querySelector(selector).getBoundingClientRect(); return {left:b.left,right:b.right,top:b.top,bottom:b.bottom,x:(b.left+b.right)/2,y:(b.top+b.bottom)/2};};
          return {heading:box('h1'), options:box('.design-options'), date:box('.dashboard-header-date'), overview:box('.overview'), width:innerWidth, cards:[...document.querySelectorAll('.category-card')].map(card => {
            const c = card.getBoundingClientRect();
            return {bottom:c.bottom,contained:getComputedStyle(card).overflow==='hidden' && [...card.querySelectorAll('.category-numbers, .category-label, .service-ring')].every(child => {const b=child.getBoundingClientRect(); return b.left>=c.left-1 && b.right<=c.right+1 && b.top>=c.top-1 && b.bottom<=c.bottom+1;})};
          })};
        });
        assert.ok(geometry.heading.right <= geometry.options.left + 1, `heading overlaps options at ${width}/${option}: ${JSON.stringify(geometry)}`);
        assert.ok(geometry.options.right <= geometry.date.left + 1, `options overlap date at ${width}/${option}: ${JSON.stringify(geometry)}`);
        assert.ok(Math.abs(geometry.options.x - geometry.width / 2) < 2, `options not centered at ${width}/${option}`);
        assert.ok(Math.abs(geometry.heading.y - geometry.options.y) < 2 && Math.abs(geometry.date.y - geometry.options.y) < 2, 'heading/options/date must share one row');
        assert.ok(geometry.cards.every(card=>card.contained), `card content overflow at ${width}/${option}`);
        assert.ok(Math.max(...geometry.cards.map(card=>card.bottom)) < geometry.overview.top, `card artwork overlaps Fleet Overview at ${width}/${option}`);
        await page.screenshot({path:path.join(artifacts, `dashboard-${width}-option-${option}.png`)});
      }
    }
    await page.setViewportSize({width:1920,height:1080});
    await page.emulateMedia({reducedMotion:'reduce'});
    await arrow('suv').click();
    await page.waitForSelector('.detail-suv');
    assert.equal(await page.locator('main').evaluate(node => node.getAnimations().length), 0, 'reduced motion must disable slides');
    await page.screenshot({path:path.join(artifacts, 'detail-circular.png')});
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.locator('.back-button').click();
    await page.waitForSelector('.dashboard');
    assert.ok(await page.locator('main').evaluate(node => node.getAnimations().some(animation => animation.effect.getTiming().duration === 260)), 'route transition should slide');

    await page.goto(pathToFileURL(path.join(root, 'prototype/index.html')).href);
    await card('suv').click();
    assert.match(await page.locator('.donut').getAttribute('aria-label'), /120 total vehicles/);
    await design('2');
    await arrow('suv').click();
    await page.waitForSelector('.detail-suv');
    assert.equal(await page.locator('.service-ring').count(), 1);
    assert.deepEqual(errors, []);
    console.log('PASS: real browser card/arrow/keyboard interactions; both designs/themes; header geometry; real snapshots; detail filters; back/forward; reduced motion; file operation.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => {console.error(error); process.exitCode=1;});
