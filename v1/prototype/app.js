'use strict';

// Literal values transcribed from the supplied references, including their differences.
const fleet = {
  all: {
    title: 'All Vehicles', percent: '70%', total: '84 / 120', available: '84',
    mission: '24', missionPercent: '20%', unavailable: '12', unavailablePercent: '10%',
    footer: 'Showing 120 vehicles', pages: 5,
    rows: [
      ['Sedan', 'AB-1234', 'Toyota Camry', '2024', 'Available', '09:15', '—'],
      ['SUV', 'XY-7781', 'Toyota RAV4', '2023', 'Available', '09:10', '—'],
      ['People Mover', 'LM-5502', 'Toyota Hiace', '2024', 'Available', '09:05', '—'],
      ['Sedan', 'CD-5678', 'Honda Accord', '2023', 'Available', '08:50', '—'],
      ['SUV', 'GH-3456', 'Toyota Corolla Cross', '2024', 'Available', '08:45', '—'],
      ['People Mover', 'PQ-9876', 'Nissan Urvan', '2023', 'On Mission', '08:20', 'Mission #M-1025'],
      ['Sedan', 'KL-2345', 'Honda Civic', '2024', 'On Mission', '08:18', 'Mission #M-1023'],
      ['SUV', 'MN-6789', 'Mitsubishi Montero', '2023', 'On Mission', '07:55', 'Mission #M-1021'],
      ['People Mover', 'OP-1357', 'Nissan Serena', '2023', 'Not Available', '07:10', 'Under Maintenance'],
      ['SUV', 'QR-2468', 'Ford Everest', '2024', 'Not Available', '06:40', 'Inspection Due'],
    ],
  },
  sedan: {
    title: 'Sedan', percent: '75%', total: '30 / 40', available: '30',
    mission: '7', missionPercent: '18%', unavailable: '3', unavailablePercent: '8%',
    footer: 'Showing 40 sedan vehicles', pages: 4,
    rows: [
      ['Sedan', 'AB-1234', 'Toyota Camry', '2024', 'Available', '09:15', '—'],
      ['Sedan', 'CD-5678', 'Honda Accord', '2023', 'Available', '09:50', '—'],
      ['Sedan', 'EF-9012', 'Nissan Altima', '2024', 'Available', '08:32', '—'],
      ['Sedan', 'GH-3456', 'Toyota Corolla', '2023', 'Available', '09:20', '—'],
      ['Sedan', 'IJ-7890', 'Kia K5', '2024', 'Available', '08:15', '—'],
      ['Sedan', 'KL-2345', 'Honda Civic', '2023', 'On Mission', '07:45', 'Mission AM-1023'],
      ['Sedan', 'MN-6789', 'Toyota Corolla', '2024', 'On Mission', '07:20', 'Mission AM-1021'],
      ['Sedan', 'OP-1357', 'Nissan Sentra', '2023', 'Not Available', '06:50', 'Under Maintenance'],
      ['Sedan', 'QR-2468', 'Honda Accord', '2024', 'Not Available', '06:40', 'Inspection Due'],
    ],
  },
  suv: {
    title: 'SUV', percent: '63%', total: '30 / 48', available: '30',
    mission: '11', missionPercent: '23%', unavailable: '7', unavailablePercent: '15%',
    footer: 'Showing 48 SUV vehicles', pages: 5,
    rows: [
      ['SUV', 'SX-1024', 'Toyota RAV4', '2024', 'Available', '09:40', '—'],
      ['SUV', 'UV-3187', 'Honda CR-V', '2023', 'Available', '09:12', '—'],
      ['SUV', 'TR-8240', 'Nissan X-Trail', '2024', 'Available', '08:58', '—'],
      ['SUV', 'KL-6672', 'Mazda CX-5', '2023', 'Available', '08:45', '—'],
      ['SUV', 'BF-1190', 'Hyundai Tucson', '2024', 'Available', '08:20', '—'],
      ['SUV', 'PQ-3056', 'Mitsubishi Outlander', '2023', 'On Mission', '07:55', 'Mission #M-2041'],
      ['SUV', 'LR-7891', 'Ford Everest', '2024', 'On Mission', '07:42', 'Mission #M-2038'],
      ['SUV', 'ZT-5508', 'Chevrolet Trailblazer', '2023', 'On Mission', '07:18', 'Mission #M-2036'],
      ['SUV', 'KD-9914', 'Isuzu MU-X', '2023', 'Not Available', '06:50', 'Under Maintenance'],
    ],
  },
  'people-movers': {
    title: 'People Movers', percent: '75%', total: '24 / 32', available: '24',
    mission: '6', missionPercent: '19%', unavailable: '2', unavailablePercent: '6%',
    footer: 'Showing 32 People Mover vehicles', pages: 4,
    rows: [
      ['People Mover', 'PM-1001', 'Toyota Hiace', '2024', 'Available', '09:25', '—'],
      ['People Mover', 'PM-1002', 'Toyota Hiace', '2024', 'Available', '09:10', '—'],
      ['People Mover', 'PM-1003', 'Hyundai Staria', '2023', 'Available', '08:55', '—'],
      ['People Mover', 'PM-1004', 'Toyota Hiace', '2024', 'Available', '08:40', '—'],
      ['People Mover', 'PM-1005', 'Nissan NV350', '2023', 'Available', '08:35', '—'],
      ['People Mover', 'PM-1006', 'Hyundai Staria', '2024', 'On Mission', '08:20', 'Airport Transfer #A-458'],
      ['People Mover', 'PM-1007', 'Toyota Hiace', '2023', 'On Mission', '07:50', 'Shuttle #S-220'],
      ['People Mover', 'PM-1008', 'Hyundai Staria', '2024', 'On Mission', '07:35', 'Tour Group #T-116'],
      ['People Mover', 'PM-1009', 'Toyota Hiace', '2023', 'Not Available', '06:50', 'Under Maintenance'],
      ['People Mover', 'PM-1010', 'Nissan NV350', '2024', 'Not Available', '06:30', 'Accident Repair'],
    ],
  },
};

const icons = {
  car: '<path d="m5 10 2-5h10l2 5M4 10h16v8H4zM7 18v2m10-2v2M4 13h3m10 0h3M8 10h8"/>',
  grid: '<path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" fill="currentColor" stroke="none"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="m14 5-7 7 7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M4 9h16m-9 5-3 6m5-6 3 6"/>',
  wrench: '<path d="M15 3a6 6 0 0 0-7 7L3 16a3 3 0 0 0 4 4l6-6a6 6 0 0 0 7-7l-4 4-3-3z"/>',
  bars: '<path d="M4 16v5m8-12v12m8-19v19" stroke-width="5"/>',
  pin: '<path d="M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  filters: '<path d="M6 3v18M18 3v18M3 8h6m6 8h6M3 17h6m6-10h6"/>',
  reset: '<path d="M19 7a8 8 0 1 0 1 8M20 3v5h-5"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v5m8-5v5M4 11h16m-11 4h1m4 0h1m-6 3h1"/>',
  moon: '<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
};

function icon(name, className = '') {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.car}</svg>`;
}

function screenFromHash(hash) {
  const screen = hash.replace(/^#/, '');
  return Object.hasOwn(fleet, screen) ? screen : 'dashboard';
}

function transition(state, action) {
  if (action.type === 'toggle-theme') {
    return {...state, theme: state.theme === 'light' ? 'dark' : 'light'};
  }
  if (action.type === 'navigate') {
    return {...state, screen: Object.hasOwn(fleet, action.screen) ? action.screen : 'dashboard'};
  }
  return state;
}

function header(screen, theme) {
  const dashboard = screen === 'dashboard';
  const avatar = dashboard || screen === 'sedan';
  return `<header class="page-header ${dashboard ? 'dashboard-header' : 'detail-header'}">
    <div class="heading-group">${dashboard ? '<p class="eyebrow">FLEET MANAGEMENT</p>' : '<a class="back-button" href="#dashboard" aria-label="Back to dashboard">' + icon('back') + '</a>'}
      <div><h1 tabindex="-1">${dashboard ? 'Vehicle Serviceability' : fleet[screen].title}</h1>
      ${dashboard ? '<p class="formula">Available vehicles / Total vehicles × 100 = Serviceability %</p>' : ''}</div>
    </div>
    <div class="header-tools">
      <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode" aria-pressed="${theme === 'dark'}">${icon(theme === 'light' ? 'moon' : 'sun')}<span>${theme === 'light' ? 'Dark' : 'Light'} Mode</span></button>
      <div class="identity"><div class="person">${avatar ? '<span class="avatar" aria-hidden="true">JD</span>' : ''}<strong>John Doe</strong>${avatar ? icon('down') : ''}</div>
      <div class="date">${avatar ? icon('calendar') : ''}<span>Tue, 22 Oct 2026${avatar ? '&nbsp; ' : ' '}10:30 AM</span></div></div>
    </div>
  </header>`;
}

// The supplied full images are used as CSS sprites for their vehicle illustrations.
function vehicleArt(kind, theme, className = '') {
  const source = className ? kind : 'dashboard';
  return `<span class="vehicle-art vehicle-${kind} ${className}" role="img" aria-label="${kind === 'all' ? 'Fleet of vehicles' : kind === 'people-movers' ? 'People mover' : kind === 'sedan' ? 'Sedan' : 'SUV'}"><img src="assets/${source}-${theme}.png" alt="" draggable="false"></span>`;
}

function dashboard(theme) {
  const cards = Object.entries(fleet).map(([key, data]) => `<a href="#${key}" class="category-card category-${key}" aria-label="Open ${data.title}">
      <div class="category-numbers"><div><strong class="service-percent">${data.percent}</strong><span>Serviceability</span></div><div class="category-total"><strong>${data.total}</strong><span>Available / Total</span></div></div>
      ${vehicleArt(key, theme)}
      <div class="category-label">${icon(key === 'all' ? 'grid' : 'car')}<h2>${data.title}</h2><span class="round-arrow">${icon('arrow')}</span></div>
    </a>`).join('');
  return `<section class="category-grid" aria-label="Vehicle categories">${cards}</section>
    <section class="overview" aria-labelledby="overview-title">
      <div class="overview-heading">${icon('bars')}<div><h2 id="overview-title">Fleet Overview</h2><p>Serviceability across all vehicle types</p></div></div>
      <div class="overview-grid">
        <section class="overview-panel trend-panel" aria-labelledby="trend-title"><div class="panel-heading"><h3 id="trend-title">Serviceability Trend</h3><span class="period" aria-label="Trend period: Last 30 Days">Last 30 Days ${icon('down')}</span></div>
          ${trendChart()}
        </section>
        <section class="overview-panel status-panel" aria-labelledby="status-title"><h3 id="status-title">Vehicles by Status</h3><div class="status-breakdown"><div class="donut" role="img" aria-label="120 total vehicles: 84 available, 24 on mission, 12 not available"><div><strong>120</strong><span>Total Vehicles</span></div></div><dl class="status-legend">
          <div><dt><i class="legend-dot available-dot"></i>Available</dt><dd>84</dd><dd>70%</dd></div><div><dt><i class="legend-dot mission-dot"></i>On Mission</dt><dd>24</dd><dd>20%</dd></div><div><dt><i class="legend-dot unavailable-dot"></i>Not Available</dt><dd>12</dd><dd>10%</dd></div>
        </dl></div></section>
        <section class="overview-panel insights-panel" aria-labelledby="insights-title"><h3 id="insights-title">${icon('pin')}Key Insights</h3>
          <div class="insight"><span class="status-icon available-icon">${icon('check')}</span><div><strong>Serviceability at 70%</strong><p>84 of 120 vehicles available</p></div></div>
          <div class="insight"><span class="status-icon mission-icon">${icon('wheel')}</span><div><strong>24 vehicles on mission</strong><p>20% of total fleet</p></div></div>
          <div class="insight"><span class="status-icon unavailable-icon">${icon('wrench')}</span><div><strong>12 vehicles not available</strong><p>10% of total fleet</p></div></div>
        </section>
      </div>
    </section>`;
}

function trendChart() {
  // Fixed visual trace from the reference, not an invented underlying time-series dataset.
  return `<svg class="trend-chart" viewBox="0 0 640 242" role="img" aria-label="Illustrated serviceability trend from 1 October to 22 October, ending at 70%">
    <defs><linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#168bff" stop-opacity=".35"/><stop offset="1" stop-color="#168bff" stop-opacity=".06"/></linearGradient></defs>
    <g class="chart-grid"><path d="M80 24H615M80 69H615M80 114H615M80 159H615M80 204H615M80 24V204M200 24V204M320 24V204M440 24V204M560 24V204"/></g>
    <g class="chart-labels"><text x="59" y="30" text-anchor="end">100%</text><text x="59" y="75" text-anchor="end">75%</text><text x="59" y="120" text-anchor="end">50%</text><text x="59" y="165" text-anchor="end">25%</text><text x="59" y="210" text-anchor="end">0%</text><text x="80" y="237" text-anchor="middle">1 Oct</text><text x="200" y="237" text-anchor="middle">7 Oct</text><text x="320" y="237" text-anchor="middle">13 Oct</text><text x="440" y="237" text-anchor="middle">19 Oct</text><text x="594" y="237" text-anchor="middle">22 Oct</text></g>
    <path d="M80 150 140 128 200 125 260 96 320 128 380 108 440 113 500 81 560 92 614 78V204H80Z" fill="url(#trend-fill)"/>
    <path d="M80 150 140 128 200 125 260 96 320 128 380 108 440 113 500 81 560 92 614 78" fill="none" stroke="#0787ff" stroke-width="4" stroke-linejoin="round"/>
    <g fill="#0787ff"><circle cx="80" cy="150" r="7"/><circle cx="140" cy="128" r="7"/><circle cx="200" cy="125" r="7"/><circle cx="260" cy="96" r="7"/><circle cx="320" cy="128" r="7"/><circle cx="380" cy="108" r="7"/><circle cx="440" cy="113" r="7"/><circle cx="500" cy="81" r="7"/><circle cx="560" cy="92" r="7"/></g>
    <circle cx="614" cy="78" r="11" fill="var(--surface)" stroke="#0787ff" stroke-width="3"/><circle cx="614" cy="78" r="6" fill="#0787ff"/>
    <rect x="580" y="25" width="55" height="32" rx="6" fill="#0787ff"/><text x="607" y="48" text-anchor="middle" fill="white" font-size="24" font-weight="700">70%</text>
  </svg>`;
}

function summary(screen, theme) {
  const data = fleet[screen];
  return `<section class="summary-grid" aria-label="${data.title} serviceability summary">
    <div class="summary-main"><div class="summary-percent">${screen === 'sedan' ? '<span class="summary-car">' + icon('car') + '</span>' : ''}<div><strong>${data.percent}</strong><span>Serviceability</span></div></div>
    ${screen === 'all' || screen === 'people-movers' ? vehicleArt(screen, theme, 'summary-art') : ''}
    <div class="summary-total"><strong>${data.total}</strong><span>Available / Total</span></div></div>
    <div class="summary-stat available-stat"><span class="status-icon available-icon">${icon(screen === 'sedan' ? 'check' : 'car')}</span><div><strong>${data.available}</strong><span>Available</span></div><b>${data.percent}</b></div>
    <div class="summary-stat mission-stat"><span class="status-icon mission-icon">${icon('wheel')}</span><div><strong>${data.mission}</strong><span>On Mission</span></div><b>${data.missionPercent}</b></div>
    <div class="summary-stat unavailable-stat"><span class="status-icon unavailable-icon">${icon('wrench')}</span><div><strong>${data.unavailable}</strong><span>Not Available</span></div><b>${data.unavailablePercent}</b></div>
  </section>`;
}

function toolbar(screen) {
  return `<div class="table-toolbar" aria-label="Filter controls shown in reference; presentation only">
    <div class="static-field search-field"><span>Search by plate number, model or VIN...</span>${icon('search')}</div>
    <div class="static-field status-field"><span>${screen === 'sedan' ? 'All Statuses' : 'All Status'}</span>${icon('down')}</div>
    ${screen === 'sedan' ? '<span class="clear-filters">' + icon('reset') + 'Clear Filters</span>' : '<span class="static-field filter-field">' + icon('filters') + '</span>'}
  </div>`;
}

function vehicleTable(screen, theme) {
  const data = fleet[screen];
  const rows = data.rows.map((row, index) => {
    const [type, plate, model, sourceYear, status, time, assignment] = row;
    const year = screen === 'sedan' && theme === 'dark' && plate === 'MN-6789' ? '2023' : sourceYear;
    const statusClass = status === 'Available' ? 'available' : status === 'On Mission' ? 'mission' : 'unavailable';
    return `<tr data-plate="${plate}"><td>${index + 1}</td>${screen === 'all' ? '<td>' + type + '</td>' : ''}${screen === 'people-movers' ? '<td class="thumbnail-cell">' + vehicleArt('people-movers', theme, 'row-art') + '</td>' : ''}<td>${plate}</td><td>${model}</td><td>${year}</td><td><span class="status-badge ${statusClass}"><i></i>${status}</span></td><td>22 Oct 2026 ${time}</td><td>${assignment}</td><td><span class="row-menu" aria-hidden="true">⋮</span></td></tr>`;
  }).join('');
  return `<div class="table-scroll"><table><caption class="visually-hidden">${data.title}: visible records from the supplied reference</caption><thead><tr><th scope="col">#</th>${screen === 'all' ? '<th scope="col">Vehicle Type</th>' : ''}${screen === 'people-movers' ? '<th scope="col"><span class="visually-hidden">Vehicle</span></th>' : ''}<th scope="col">Plate Number</th><th scope="col">Model</th><th scope="col">Year</th><th scope="col">Status</th><th scope="col">${screen === 'sedan' ? 'Last' : 'Last Updated'}</th><th scope="col">Current Assignment</th><th scope="col">Actions</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="table-footer"><p>${data.footer}</p><div class="pagination" role="img" aria-label="Reference pagination, page 1 selected; additional page records not supplied"><span class="page-arrow">${icon('back')}</span><span class="page-number current">1</span>${Array.from({length: data.pages - 1}, (_, i) => '<span class="page-number">' + (i + 2) + '</span>').join('')}<span class="page-arrow next-page">${icon('back')}</span><span class="page-size">10 / page ${icon('down')}</span></div></div>`;
}

function renderScreen(state) {
  const screen = Object.hasOwn(fleet, state.screen) ? state.screen : 'dashboard';
  return header(screen, state.theme) + `<main class="${screen === 'dashboard' ? 'dashboard' : 'detail detail-' + screen}" id="main-content">${screen === 'dashboard' ? dashboard(state.theme) : summary(screen, state.theme) + '<section class="table-panel" aria-label="Vehicle records">' + toolbar(screen) + vehicleTable(screen, state.theme) + '</section>'}</main>`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {transition, renderScreen, screenFromHash};
}

if (typeof document !== 'undefined') {
  let state = {screen: screenFromHash(location.hash), theme: 'light'};
  const app = document.getElementById('app');
  function paint(focusHeading = false) {
    document.documentElement.dataset.theme = state.theme;
    document.title = `${state.screen === 'dashboard' ? 'Vehicle Serviceability' : fleet[state.screen].title} | Fleet Management`;
    app.innerHTML = renderScreen(state);
    if (focusHeading) {
      app.querySelector('h1').focus({preventScroll: true});
      window.scrollTo(0, 0);
    }
  }
  app.addEventListener('click', event => {
    if (event.target.closest('#theme-toggle')) {
      state = transition(state, {type: 'toggle-theme'});
      paint();
      document.getElementById('theme-toggle').focus({preventScroll: true});
    }
  });
  window.addEventListener('hashchange', () => {
    state = transition(state, {type: 'navigate', screen: screenFromHash(location.hash)});
    paint(true);
  });
  paint();
}
