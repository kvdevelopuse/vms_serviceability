// Uses an existing QA toolchain; no runtime dependencies are added to the prototype.
// Set VMS_QA_MODULE_ROOT to a directory containing React, React DOM and TypeScript.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');
const vm = require('node:vm');
const qaRequire = createRequire(path.resolve(process.env.VMS_QA_MODULE_ROOT || '.', 'package.json'));
const ts = qaRequire('typescript');
const React = qaRequire('react');
const {renderToStaticMarkup} = qaRequire('react-dom/server');
const {JSDOM, VirtualConsole} = qaRequire('jsdom');
const source = fs.readFileSync(path.join(__dirname, '../react/VehicleServiceabilityComponents.jsx'), 'utf8');
const code = ts.transpileModule(source, {compilerOptions: {jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, esModuleInterop: true}}).outputText;
const moduleObject = {exports: {}};
vm.runInNewContext(code, {module: moduleObject, exports: moduleObject.exports, require: name => name.endsWith('.css') ? {} : qaRequire(name)});
const {FleetCard, DetailSummaryCards} = moduleObject.exports;

const renderings = new Map();
for (const designOption of ['1', '2', '3']) {
  const option2Design = designOption !== '3';
  const fleet = renderToStaticMarkup(React.createElement(FleetCard, {title: 'SUV', serviceability: 62, available: 30, total: 48, designOption, selected: true, onSelect() {}}));
  const detail = renderToStaticMarkup(React.createElement(DetailSummaryCards, {title: 'SUV', serviceability: 62, available: 30, total: 48, onMission: 11, notAvailable: 7, onMissionPercentage: 90, notAvailablePercentage: 90, designOption}));
  renderings.set(designOption, {fleet, detail});
  assert.doesNotMatch(fleet + detail, /Available\s*\/\s*Total/);
  if (!option2Design) {
    assert.match(fleet, /30 \/ 48/);
    assert.match(detail, /30 \/ 48/);
  }
  assert.match(fleet, /aria-pressed="true"/);
  assert.match(fleet, />63%</);
  assert.match(detail, />63%</);
  assert.match(detail, />23%</);
  assert.match(detail, />15%</);
  assert.doesNotMatch(detail, /vms-summary-card--available|>62%<|>90%</);
  assert.doesNotMatch(fleet + detail, /vms-count-ring/);
  assert.equal((fleet.match(/class="vms-service-ring(?: is-alert)?"/g) || []).length, option2Design ? 1 : 0);
  assert.equal((detail.match(/class="vms-service-ring(?: is-alert)?"/g) || []).length, option2Design ? 1 : 0);
  assert.equal((fleet.match(/class="vms-option2-stat /g) || []).length, option2Design ? 2 : 0);
  assert.equal((detail.match(/class="vms-option2-stat /g) || []).length, option2Design ? 2 : 0);
  if (option2Design) {
    assert.match(fleet, /class="vms-service-ring is-alert"[^>]*aria-label="63% serviceable"/);
    assert.match(fleet, /<span class="vms-service-ring__content"><strong>63%<\/strong><\/span>/);
    assert.doesNotMatch(fleet + detail, /<small>Serviceable<\/small>/);
    assert.match(detail, /<small>Unavailable<\/small>/);
    assert.match(fleet, /class="vms-option2-stat vms-option2-stat--available"[\s\S]*?<strong>30<\/strong><small>Available<\/small>/);
    assert.match(fleet, /class="vms-option2-stat vms-option2-stat--total"[\s\S]*?<strong>48<\/strong><small>Total<\/small>/);
  } else assert.match(detail, /<small>Not Available<\/small>/);
  assert.equal((detail.match(/class="vms-summary-card /g) || []).length, 2);
  if (option2Design) {
    for (const theme of ['light', 'dark']) {
      const fixture = new JSDOM(`<section class="vms-serviceability" data-theme="${theme}">${fleet}${detail}</section>`, {virtualConsole:new VirtualConsole()});
      const style = fixture.window.document.createElement('style');
      style.textContent = fs.readFileSync(path.join(__dirname,'../react/vehicle-serviceability.css'),'utf8');
      fixture.window.document.head.append(style);
      const palette=fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-serviceability'));
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-fleet-card')).getPropertyValue('--vms-option2-surface').trim(),theme==='light' ? '#f6f2ff' : '#2b2344');
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-fleet-card')).getPropertyValue('--vms-option2-accent').trim(),theme==='light' ? '#7b45f5' : '#ba9bff');
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-fleet-card')).background,'var(--vms-option2-surface)');
      assert.notEqual(fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-fleet-card')).outlineStyle,'solid');
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-serviceability-card')).background,'var(--vms-option2-surface)');
      for (const value of fixture.window.document.querySelectorAll('.vms-serviceability-card__percentage, .vms-serviceability-card__total')) {
        assert.equal(fixture.window.getComputedStyle(value).alignSelf, 'center');
        assert.equal(fixture.window.getComputedStyle(value).justifySelf, 'center');
      }
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-fleet-card__footer')).position, 'static');
      assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('.vms-fleet-card__footer button')).position, 'absolute');
      for (const card of fixture.window.document.querySelectorAll('.vms-summary-card')) {
        const count = fixture.window.getComputedStyle(card.querySelector('strong'));
        const valuePercent = fixture.window.getComputedStyle(card.querySelector(':scope > b'));
        assert.equal(valuePercent.fontSize, count.fontSize);
        assert.equal(valuePercent.fontSize, '1.75rem');
        assert.equal(valuePercent.lineHeight, count.lineHeight);
        assert.equal(valuePercent.lineHeight, '1');
        assert.equal(valuePercent.fontWeight, '400');
        assert.equal(valuePercent.backgroundSize, '1px 70%');
        assert.equal(fixture.window.getComputedStyle(card.querySelector('small')).transform, 'translateY(-4px)');
      }
      for (const label of fixture.window.document.querySelectorAll('.vms-service-ring__content')) {
        const computed = fixture.window.getComputedStyle(label);
        assert.equal(computed.position,'absolute');
        assert.equal(computed.display,'grid');
        assert.equal(computed.placeItems,'center');
        assert.equal(computed.width,'100%');
        assert.equal(computed.height,'100%');
        assert.equal(computed.textAlign,'center');
      }
      fixture.window.close();
    }
    assert.doesNotMatch(detail, /<small>Total<\/small>/);
    assert.match(fleet, /<small>Total<\/small>/);
  }
}
const normalizeDesign = html => html.replace(/data-design="[12]"/g, 'data-design="shared"');
assert.equal(normalizeDesign(renderings.get('1').fleet), normalizeDesign(renderings.get('2').fleet));
assert.equal(normalizeDesign(renderings.get('1').detail), normalizeDesign(renderings.get('2').detail));
for (const activeFilter of ['serviceability','mission','unavailable']) {
  const html=renderToStaticMarkup(React.createElement(DetailSummaryCards,{title:'SUV',available:30,total:48,onMission:11,notAvailable:7,activeFilter}));
  const fixture=new JSDOM(`<section class="vms-serviceability">${html}</section>`,{virtualConsole:new VirtualConsole()});
  const style=fixture.window.document.createElement('style');
  style.textContent=fs.readFileSync(path.join(__dirname,'../react/vehicle-serviceability.css'),'utf8');
  fixture.window.document.head.append(style);
  assert.equal(fixture.window.getComputedStyle(fixture.window.document.querySelector('[aria-pressed="true"]')).outlineOffset,'-3px','React selection edges must stay inside clipping ancestors');
  fixture.window.close();
}
let selected = 0;
let opened = 0;
let propagationStopped = false;
const element = FleetCard({title: 'SUV', serviceability: 63, onSelect: () => selected++, onOpen: () => opened++});
const controls = [];
function visit(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'button') controls.push(node);
  React.Children.forEach(node.props?.children, visit);
}
visit(element);
controls.find(control => control.props['aria-label'] === 'Select SUV').props.onClick();
assert.equal(selected, 1);
assert.equal(opened, 0);
controls.find(control => control.props['aria-label'] === 'Open SUV details').props.onClick({stopPropagation() {propagationStopped = true;}});
assert.equal(selected, 1);
assert.equal(opened, 1);
assert.equal(propagationStopped, true);
console.log('PASS: actual React card rendering; both designs; retained ratios; separate select/open callbacks.');
