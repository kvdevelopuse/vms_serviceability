'use strict';

// Literal values transcribed from the supplied references, including their differences.
const fleet = {
  all: {
    title: 'All Vehicles', percent: '70%', total: '84 / 120', available: '84',
    mission: '24', missionPercent: '20%', unavailable: '12', unavailablePercent: '10%',
    footer: 'Showing 120 vehicles', pages: 4,
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
      ['Sedan', 'CD-5678', 'Honda Accord', '2023', 'Available', '08:50', '—'],
      ['Sedan', 'EF-9012', 'Nissan Altima', '2024', 'Available', '08:32', '—'],
      ['Sedan', 'GH-3456', 'Toyota Corolla', '2023', 'Available', '08:20', '—'],
      ['Sedan', 'IJ-7890', 'Kia K5', '2024', 'Available', '08:15', '—'],
      ['Sedan', 'KL-2345', 'Honda Civic', '2023', 'On Mission', '07:45', 'Mission #M-1023'],
      ['Sedan', 'MN-6789', 'Toyota Corolla', '2024', 'On Mission', '07:20', 'Mission #M-1021'],
      ['Sedan', 'OP-1357', 'Nissan Sentra', '2023', 'Not Available', '06:50', 'Under Maintenance'],
      ['Sedan', 'QR-2468', 'Honda Accord', '2024', 'Not Available', '06:40', 'Inspection Due'],
    ],
  },
  suv: {
    title: 'SUV', percent: '63%', availablePercent: '62%', total: '30 / 48', available: '30',
    mission: '11', missionPercent: '23%', unavailable: '7', unavailablePercent: '15%',
    footer: 'Showing 48 suv vehicles', pages: 4,
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
    footer: 'Showing 32 people movers vehicles', pages: 4,
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

function icon(name) {
  const symbols = {car:'▰', grid:'▦', arrow:'→', back:'❮', down:'⌄', check:'✓', wheel:'◎', wrench:'🔧', bars:'▂▅▇', pin:'♧', search:'⌕', filters:'↟', calendar:'▦', moon:'◐', sun:'◐', close:'×'};
  return `<span class="icon icon-${name}" aria-hidden="true">${symbols[name] || ''}</span>`;
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
  return `<header class="page-header ${dashboard ? 'dashboard-header' : 'detail-header'}">
    <div class="heading-group">${dashboard ? '' : '<a class="back-button" href="#dashboard" aria-label="Back to dashboard">' + icon('back') + '</a>'}
      <h1 tabindex="-1">${dashboard ? 'Vehicle Serviceability' : fleet[screen].title}</h1>
    </div>
    <div class="header-tools">
      <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode" aria-pressed="${theme === 'dark'}">${icon(theme === 'light' ? 'moon' : 'sun')}<span>${theme === 'light' ? 'Dark' : 'Light'} Mode</span></button>
      <div class="identity"><div class="person"><span class="avatar" aria-hidden="true">JD</span><strong>John Doe</strong>${icon('down')}</div>
      <div class="date">${icon('calendar')}<span>Tue, 22 Oct 2026&nbsp; 10:30 AM</span></div></div>
    </div>
  </header>`;
}

// The supplied full images are used as CSS sprites for their vehicle illustrations.
function vehicleArt(kind, theme) {
  return `<span class="vehicle-art vehicle-${kind}" role="img" aria-label="${kind === 'all' ? 'Fleet of vehicles' : kind === 'people-movers' ? 'People mover' : kind === 'sedan' ? 'Sedan' : 'SUV'}"><img src="assets/dashboard-${theme}.png" alt="" draggable="false"></span>`;
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
          <div class="insight"><span class="status-icon unavailable-icon">${icon('close')}</span><div><strong>12 vehicles not available</strong><p>10% of total fleet</p></div></div>
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
    <path d="M80 139 145 125 212 120 280 99 347 114 414 102 481 105 548 83 614 80V204H80Z" fill="url(#trend-fill)"/>
    <path d="M80 139 145 125 212 120 280 99 347 114 414 102 481 105 548 83 614 80" fill="none" stroke="#0787ff" stroke-width="4" stroke-linejoin="round"/>
    <g fill="#0787ff" stroke="var(--surface)" stroke-width="2"><circle cx="80" cy="139" r="6"/><circle cx="145" cy="125" r="6"/><circle cx="212" cy="120" r="6"/><circle cx="280" cy="99" r="6"/><circle cx="347" cy="114" r="6"/><circle cx="414" cy="102" r="6"/><circle cx="481" cy="105" r="6"/><circle cx="548" cy="83" r="6"/><circle cx="614" cy="80" r="7"/></g>
    <rect x="580" y="25" width="55" height="32" rx="6" fill="#0787ff"/><text x="607" y="48" text-anchor="middle" fill="white" font-size="24" font-weight="700">70%</text>
  </svg>`;
}

function summary(screen) {
  const data = fleet[screen];
  return `<section class="summary-grid" aria-label="${data.title} serviceability summary">
    <div class="summary-main"><div class="summary-percent"><strong>${data.percent}</strong><span>Serviceability</span></div>
    <div class="summary-total"><strong>${data.total}</strong><span>Available / Total</span></div></div>
    <div class="summary-stat available-stat"><span class="status-icon available-icon">${icon('check')}</span><div><strong>${data.available}</strong><span>Available</span></div><b>${data.availablePercent || data.percent}</b></div>
    <div class="summary-stat mission-stat"><span class="status-icon mission-icon">${icon('wheel')}</span><div><strong>${data.mission}</strong><span>On Mission</span></div><b>${data.missionPercent}</b></div>
    <div class="summary-stat unavailable-stat"><span class="status-icon unavailable-icon">${icon('wrench')}</span><div><strong>${data.unavailable}</strong><span>Not Available</span></div><b>${data.unavailablePercent}</b></div>
  </section>`;
}

function toolbar() {
  return `<div class="table-toolbar" aria-label="Filter controls shown in reference; presentation only">
    <div class="static-field search-field"><span>Search by plate number, model or VIN...</span>${icon('search')}</div>
    <div class="static-field status-field"><span>All Status</span>${icon('down')}</div>
    <span class="static-field filter-field">${icon('filters')}</span>
  </div>`;
}

function vehicleTable(screen) {
  const data = fleet[screen];
  const rows = data.rows.map((row, index) => {
    const [type, plate, model, year, status, time, assignment] = row;
    const statusClass = status === 'Available' ? 'available' : status === 'On Mission' ? 'mission' : 'unavailable';
    return `<tr data-plate="${plate}"><td>${index + 1}</td>${screen === 'all' ? '<td>' + type + '</td>' : ''}<td>${plate}</td><td>${model}</td><td>${year}</td><td><span class="status-badge ${statusClass}"><i></i>${status}</span></td><td>22 Oct 2026 ${time}</td><td>${assignment}</td><td><span class="row-menu" aria-hidden="true">⋮</span></td></tr>`;
  }).join('');
  return `<div class="table-scroll"><table><caption class="visually-hidden">${data.title}: visible records from the supplied reference</caption><thead><tr><th scope="col">#</th>${screen === 'all' ? '<th scope="col">Vehicle Type</th>' : ''}<th scope="col">Plate Number</th><th scope="col">Model</th><th scope="col">Year</th><th scope="col">Status</th><th scope="col">Last Updated</th><th scope="col">Current Assignment</th><th scope="col">Actions</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="table-footer"><p>${data.footer}</p><div class="pagination" role="img" aria-label="Reference pagination, page 1 selected; additional page records not supplied"><span class="page-arrow">${icon('back')}</span><span class="page-number current">1</span>${Array.from({length: data.pages - 1}, (_, i) => '<span class="page-number">' + (i + 2) + '</span>').join('')}<span class="page-arrow next-page">${icon('back')}</span><span class="page-size">10 / page ${icon('down')}</span></div></div>`;
}

function renderScreen(state) {
  const screen = Object.hasOwn(fleet, state.screen) ? state.screen : 'dashboard';
  return header(screen, state.theme) + `<main class="${screen === 'dashboard' ? 'dashboard' : 'detail detail-' + screen}" id="main-content">${screen === 'dashboard' ? dashboard(state.theme) : summary(screen) + '<section class="table-panel" aria-label="Vehicle records">' + toolbar() + vehicleTable(screen) + '</section>'}</main>`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {transition, renderScreen, screenFromHash};
}

if (typeof document !== 'undefined') {
  let state = {screen: screenFromHash(location.hash), theme: 'light'};
  const app = document.getElementById('app');
  function paint(focusHeading = false) {
    document.documentElement.dataset.theme = state.theme;
    document.title = `${state.screen === 'dashboard' ? 'Vehicle Serviceability' : fleet[state.screen].title} | Vehicle Serviceability Prototype`;
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
