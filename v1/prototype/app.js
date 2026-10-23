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

const units = ['All', 'Unit A', 'Unit B', 'Unit C', 'Unit D'];
const REFERENCE_DATE = '2026-10-22';
const supportedDates = ['2026-10-20', '2026-10-21', REFERENCE_DATE];
const unitAllocations = {
  'Unit A': {sedan: [9, 2, 1], suv: [9, 3, 2], 'people-movers': [6, 2, 0]},
  'Unit B': {sedan: [8, 2, 1], suv: [8, 3, 2], 'people-movers': [6, 1, 1]},
  'Unit C': {sedan: [7, 2, 0], suv: [7, 3, 1], 'people-movers': [7, 1, 1]},
  'Unit D': {sedan: [6, 1, 1], suv: [6, 2, 2], 'people-movers': [5, 2, 0]},
};
const historicalAllocations = {
  '2026-10-21': {
    'Unit A': {sedan: [8, 3, 1], suv: [10, 2, 2], 'people-movers': [5, 2, 1]},
    'Unit B': {sedan: [7, 3, 1], suv: [9, 2, 2], 'people-movers': [5, 2, 1]},
    'Unit C': {sedan: [8, 1, 0], suv: [6, 4, 1], 'people-movers': [6, 2, 1]},
    'Unit D': {sedan: [5, 2, 1], suv: [7, 1, 2], 'people-movers': [4, 2, 1]},
  },
  '2026-10-20': {
    'Unit A': {sedan: [7, 3, 2], suv: [8, 4, 2], 'people-movers': [5, 3, 0]},
    'Unit B': {sedan: [8, 1, 2], suv: [7, 4, 2], 'people-movers': [5, 1, 2]},
    'Unit C': {sedan: [6, 2, 1], suv: [7, 2, 2], 'people-movers': [5, 3, 1]},
    'Unit D': {sedan: [6, 1, 1], suv: [5, 3, 2], 'people-movers': [4, 3, 0]},
  },
};
const categoryTemplates = {
  sedan: {type: 'Sedan', prefix: 'SD', models: ['Toyota Camry', 'Honda Accord', 'Nissan Altima', 'Honda Civic', 'Kia K5']},
  suv: {type: 'SUV', prefix: 'SV', models: ['Toyota RAV4', 'Honda CR-V', 'Nissan X-Trail', 'Mazda CX-5', 'Ford Everest']},
  'people-movers': {type: 'People Mover', prefix: 'PM', models: ['Toyota Hiace', 'Hyundai Staria', 'Nissan Urvan', 'Nissan NV350']},
};
const statusNames = ['Available', 'On Mission', 'Not Available'];
const conflictingLegacyPlates = new Set(['GH-3456', 'KL-2345', 'MN-6789', 'OP-1357', 'QR-2468']);

function legacyRecordSeeds() {
  const seeds = new Map();
  for (const screen of ['all', 'sedan', 'suv', 'people-movers']) {
    for (const [type, plate, model, year, status, time, assignment] of fleet[screen].rows) {
      if (conflictingLegacyPlates.has(plate) || seeds.has(plate)) continue;
      const category = type === 'People Mover' ? 'people-movers' : type.toLowerCase();
      seeds.set(plate, {category, type, plate, model, year, status, time, assignment});
    }
  }
  return [...seeds.values()];
}

function buildVehicleRecords() {
  const remaining = Object.fromEntries(Object.entries(unitAllocations).map(([unit, categories]) => [unit,
    Object.fromEntries(Object.entries(categories).map(([category, counts]) => [category, [...counts]])),
  ]));
  const records = legacyRecordSeeds().map(seed => {
    const statusIndex = statusNames.indexOf(seed.status);
    const unit = Object.keys(remaining).find(candidate => remaining[candidate][seed.category][statusIndex] > 0);
    remaining[unit][seed.category][statusIndex] -= 1;
    return {id: `LEG-${seed.plate}`, unit, ...seed};
  });
  for (const [unit, categories] of Object.entries(remaining)) {
    const unitCode = unit.at(-1);
    for (const [category, counts] of Object.entries(categories)) {
      const template = categoryTemplates[category];
      let categoryIndex = 0;
      counts.forEach((count, statusIndex) => {
        for (let index = 0; index < count; index += 1) {
          categoryIndex += 1;
          const sequence = String(categoryIndex).padStart(3, '0');
          const recordNumber = records.length + 1;
          records.push({
            id: `GEN-${unitCode}-${template.prefix}-${sequence}`,
            unit,
            category,
            type: template.type,
            plate: `${unitCode}${template.prefix}-${sequence}`,
            model: template.models[(categoryIndex - 1) % template.models.length],
            year: String(2023 + (categoryIndex % 2)),
            status: statusNames[statusIndex],
            time: `${String(6 + Math.floor((recordNumber % 240) / 60)).padStart(2, '0')}:${String((recordNumber * 7) % 60).padStart(2, '0')}`,
            assignment: statusIndex === 0 ? '—' : statusIndex === 1 ? `Mission #M-${1000 + recordNumber}` : recordNumber % 2 ? 'Under Maintenance' : 'Inspection Due',
          });
        }
      });
    }
  }
  return records;
}

function addRecordDetails(record, index, date) {
  const reference = date === REFERENCE_DATE;
  return {
    ...record,
    discoveredDate: date,
    location: reference || index % 5 !== 0 ? 'Inside Country' : 'Outside Country',
    deployed: reference || record.status !== 'Not Available' ? 'Yes' : 'No',
    reason: reference || record.status !== 'Not Available' ? '' : record.assignment,
  };
}

function buildHistoricalRecords(referenceRecords, allocations, date) {
  const records = referenceRecords.map((record, index) => addRecordDetails(record, index, date));
  for (const [unit, categories] of Object.entries(allocations)) {
    for (const [category, counts] of Object.entries(categories)) {
      const matching = records.filter(record => record.unit === unit && record.category === category);
      let offset = 0;
      counts.forEach((count, statusIndex) => {
        matching.slice(offset, offset + count).forEach((record, index) => {
          record.status = statusNames[statusIndex];
          record.assignment = statusIndex === 0 ? 'â€”' : statusIndex === 1 ? `Mission #H-${date.slice(-2)}${String(offset + index + 1).padStart(2, '0')}` : (offset + index) % 2 ? 'Inspection Due' : 'Under Maintenance';
          record.deployed = statusIndex === 2 ? 'No' : 'Yes';
          record.reason = statusIndex === 2 ? record.assignment : '';
        });
        offset += count;
      });
    }
  }
  return records;
}

const vehicleRecords = buildVehicleRecords().map((record, index) => addRecordDetails(record, index, REFERENCE_DATE));
const recordsByDate = {
  '2026-10-20': buildHistoricalRecords(vehicleRecords, historicalAllocations['2026-10-20'], '2026-10-20'),
  '2026-10-21': buildHistoricalRecords(vehicleRecords, historicalAllocations['2026-10-21'], '2026-10-21'),
  [REFERENCE_DATE]: vehicleRecords,
};
const STORAGE_KEY = 'vms-serviceability-record-edits-v1';
let savedRecordEdits = {};

function savedRecordKey(date, recordId) {
  return `${date}|${recordId}`;
}

function normalizeSavedEdit(edit) {
  if (!edit || !['Serviceable', 'Non-Serviceable'].includes(edit.status) || !/^\d{4}-\d{2}-\d{2}$/.test(edit.discoveredDate) || !['Inside Country', 'Outside Country'].includes(edit.location) || !['Yes', 'No'].includes(edit.deployed) || typeof edit.reason !== 'string' || !statusNames.includes(edit.operationalStatus) || typeof edit.assignment !== 'string') return null;
  return {
    status: edit.status,
    discoveredDate: edit.discoveredDate,
    location: edit.location,
    deployed: edit.deployed,
    reason: edit.reason,
    operationalStatus: edit.operationalStatus,
    assignment: edit.assignment,
  };
}

function readSavedRecords(storage) {
  const edits = {};
  if (!storage) return edits;
  try {
    const payload = JSON.parse(storage.getItem(STORAGE_KEY) || '{}');
    for (const [key, edit] of Object.entries(payload.edits || {})) {
      const [date, recordId] = key.split('|');
      const validRecord = supportedDates.includes(date) && recordsByDate[date]?.some(record => record.id === recordId);
      const normalized = validRecord ? normalizeSavedEdit(edit) : null;
      if (normalized) edits[key] = normalized;
    }
  } catch {
    return {};
  }
  return edits;
}

function reloadSavedRecords(storage) {
  savedRecordEdits = readSavedRecords(storage);
  return savedRecordEdits;
}

function persistSavedRecord(storage, key, edit) {
  if (!storage) return;
  try {
    savedRecordEdits = {...readSavedRecords(storage), [key]: edit};
    storage.setItem(STORAGE_KEY, JSON.stringify({version: 1, edits: savedRecordEdits}));
  } catch {
    // The prototype still works in-memory when browser storage is unavailable.
  }
}

function getSavedRecord(date, recordId) {
  const edit = savedRecordEdits[savedRecordKey(date, recordId)];
  return edit ? {...edit} : null;
}

function effectiveRecord(record, date) {
  const edit = getSavedRecord(date, record.id);
  return edit ? {...record, status: edit.operationalStatus, discoveredDate: edit.discoveredDate, location: edit.location, deployed: edit.deployed, reason: edit.reason, assignment: edit.assignment} : {...record};
}

function recordsFor(unit = 'All', screen = 'all', date = REFERENCE_DATE) {
  const records = recordsByDate[date] || recordsByDate[REFERENCE_DATE];
  return records.filter(record => (unit === 'All' || record.unit === unit) && (screen === 'all' || record.category === screen)).map(record => effectiveRecord(record, date));
}

function aggregateFor(unit = 'All', screen = 'all', date = REFERENCE_DATE) {
  const records = recordsFor(unit, screen, date);
  const available = records.filter(record => record.status === 'Available').length;
  const mission = records.filter(record => record.status === 'On Mission').length;
  const unavailable = records.filter(record => record.status === 'Not Available').length;
  return {available, mission, unavailable, total: records.length, percent: records.length ? Math.round(available / records.length * 100) : 0};
}

function saveRecord(date, recordId, values, storage = null) {
  const record = recordsFor('All', 'all', date).find(item => item.id === recordId);
  if (!record) return null;
  const previousStatus = record.status;
  const previousReason = record.reason;
  const currentSelection = previousStatus === 'Available' ? 'Serviceable' : 'Non-Serviceable';
  const status = values.status === currentSelection ? previousStatus : values.status === 'Serviceable' ? 'Available' : 'Not Available';
  const reason = String(values.reason ?? previousReason);
  const discoveredDate = /^\d{4}-\d{2}-\d{2}$/.test(values.discoveredDate) ? values.discoveredDate : record.discoveredDate;
  let assignment = record.assignment;
  if (status !== previousStatus || status === 'Not Available' && reason !== previousReason) {
    assignment = status === 'Available' ? 'â€”' : reason || 'Under Maintenance';
  }
  const edit = {
    status: values.status,
    discoveredDate,
    location: values.location,
    deployed: values.deployed,
    reason,
    operationalStatus: status,
    assignment,
  };
  const key = savedRecordKey(date, recordId);
  savedRecordEdits[key] = edit;
  persistSavedRecord(storage, key, edit);
  return effectiveRecord(record, date);
}

function percentage(value, total) {
  return total ? Math.round(value / total * 100) : 0;
}

function percentageStyle(value) {
  const numeric = Number.parseFloat(value);
  const bounded = Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : 0;
  return `--percentage:${bounded}%`;
}

function displayData(unit, screen, date = REFERENCE_DATE) {
  const aggregate = aggregateFor(unit, screen, date);
  return {
    ...aggregate,
    title: fleet[screen].title,
    totalLabel: `${aggregate.available} / ${aggregate.total}`,
    percentLabel: `${aggregate.percent}%`,
    missionPercent: percentage(aggregate.mission, aggregate.total),
    unavailablePercent: percentage(aggregate.unavailable, aggregate.total),
  };
}

function unitOptions(selected) {
  return units.map(unit => `<option value="${unit}"${unit === selected ? ' selected' : ''}>${unit}</option>`).join('');
}

function unitControl(id, selected, displayOnly = false) {
  const control = displayOnly
    ? `<input id="${id}" type="text" value="${escapeHtml(selected)}" disabled>`
    : `<select id="${id}">${unitOptions(selected)}</select>`;
  return `<label class="unit-control" for="${id}"><span>Unit:</span>${control}</label>`;
}

function formatDate(date) {
  const [year, month, day] = date.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${String(day).padStart(2, '0')}-${months[month - 1]}-${year}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
}

function selectedOption(value, selected) {
  return `<option${value === selected ? ' selected' : ''}>${value}</option>`;
}

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
    return {...state, screen: Object.hasOwn(fleet, action.screen) ? action.screen : 'dashboard', activeRecordId: null, statusFilter: 'all', page: 1};
  }
  if (action.type === 'set-unit' && units.includes(action.unit)) {
    return {...state, unit: action.unit, activeRecordId: null, page: 1};
  }
  if (action.type === 'set-date' && supportedDates.includes(action.date)) {
    return {...state, date: action.date, page: 1};
  }
  if (action.type === 'set-filter' && ['all', 'serviceability', 'available', 'mission', 'unavailable'].includes(action.filter)) {
    return {...state, statusFilter: action.filter, activeRecordId: null, page: 1};
  }
  if (action.type === 'set-page' && Number.isInteger(action.page) && action.page >= 1) {
    return {...state, page: action.page, activeRecordId: null};
  }
  if (action.type === 'open-record') {
    return {...state, activeRecordId: action.recordId};
  }
  if (action.type === 'close-record') {
    return {...state, activeRecordId: null};
  }
  return state;
}

function header(screen, state) {
  const dashboard = screen === 'dashboard';
  return `<header class="page-header ${dashboard ? 'dashboard-header' : 'detail-header'}">
    <div class="heading-group">${dashboard ? '' : '<a class="back-button" href="#dashboard" aria-label="Back to dashboard">' + icon('back') + '</a>'}
      <div class="heading-stack"><h1 tabindex="-1">${dashboard ? 'Vehicle Serviceability' : fleet[screen].title}</h1>
      ${dashboard ? unitControl('unit-filter', state.unit) : unitControl('detail-unit', state.unit, true)}</div>
    </div>
    <div class="header-tools">
      <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch to ${state.theme === 'light' ? 'Dark' : 'Light'} Mode" aria-pressed="${state.theme === 'dark'}">${icon(state.theme === 'light' ? 'moon' : 'sun')}<span>${state.theme === 'light' ? 'Dark' : 'Light'} Mode</span></button>
      <div class="identity"><div class="person"><span class="avatar" aria-hidden="true">JD</span><strong>John Doe</strong>${icon('down')}</div>
      ${dashboard ? `<label class="date date-picker" for="dashboard-date">${icon('calendar')}<span class="date-display">${formatDate(state.date)}</span><input id="dashboard-date" type="date" min="${supportedDates[0]}" max="${REFERENCE_DATE}" value="${state.date}" aria-label="Dashboard date"></label>` : `<div class="date" data-date="${state.date}">${icon('calendar')}<span>${formatDate(state.date)}</span></div>`}</div>
    </div>
  </header>`;
}

// Standalone cutouts keep the whole vehicle sharp and centered in either theme.
function vehicleArt(kind) {
  const vehicles = kind === 'all' ? ['people-movers', 'suv', 'sedan'] : [kind];
  return `<span class="vehicle-art vehicle-${kind}" role="img" aria-label="${kind === 'all' ? 'Fleet of vehicles' : kind === 'people-movers' ? 'People mover' : kind === 'sedan' ? 'Sedan' : 'SUV'}">${vehicles.map(vehicle => `<img class="art-${vehicle}" src="assets/vehicle-${vehicle}.png" alt="" draggable="false">`).join('')}</span>`;
}

function dashboard(state) {
  const cards = Object.keys(fleet).map(key => {
    const data = displayData(state.unit, key, state.date);
    return `<article class="category-card category-${key}" style="--serviceability:${data.percent}%">
      <div class="category-numbers"><div><strong class="service-percent">${data.percentLabel}</strong></div><div class="category-total"><strong>${data.totalLabel}</strong><span>Available / Total</span></div></div>
      ${vehicleArt(key)}
      <div class="category-label">${icon(key === 'all' ? 'grid' : 'car')}<h2>${data.title}</h2><a class="round-arrow" href="#${key}" aria-label="Open ${data.title} details">${icon('arrow')}</a></div>
    </article>`;
  }).join('');
  const overall = displayData(state.unit, 'all', state.date);
  const missionEnd = overall.percent + overall.missionPercent;
  return `<section class="category-grid" aria-label="Vehicle categories">${cards}</section>
    <section class="overview" aria-labelledby="overview-title">
      <div class="overview-heading">${icon('bars')}<div><h2 id="overview-title">Fleet Overview</h2><p>Serviceability across all vehicle types</p></div></div>
      <div class="overview-grid">
        <section class="overview-panel trend-panel" aria-labelledby="trend-title"><div class="panel-heading"><h3 id="trend-title">Serviceability Trend</h3><span class="period" aria-label="Trend period: Last 30 Days">Last 30 Days ${icon('down')}</span></div>
          ${trendChart()}
        </section>
        <section class="overview-panel status-panel" aria-labelledby="status-title"><h3 id="status-title">Vehicles by Status</h3><div class="status-breakdown"><div class="donut" style="--available:${overall.percent}%;--mission-end:${missionEnd}%" role="img" aria-label="${overall.total} total vehicles: ${overall.available} available, ${overall.mission} on mission, ${overall.unavailable} not available"><div><strong>${overall.total}</strong><span>Total Vehicles</span></div></div><dl class="status-legend">
          <div><dt><i class="legend-dot available-dot"></i>Available</dt><dd>${overall.available}</dd><dd>${overall.percent}%</dd></div><div><dt><i class="legend-dot mission-dot"></i>On Mission</dt><dd>${overall.mission}</dd><dd>${overall.missionPercent}%</dd></div><div><dt><i class="legend-dot unavailable-dot"></i>Not Available</dt><dd>${overall.unavailable}</dd><dd>${overall.unavailablePercent}%</dd></div>
        </dl></div></section>
        <section class="overview-panel insights-panel" aria-labelledby="insights-title"><h3 id="insights-title">${icon('pin')}Key Insights</h3>
          <div class="insight"><span class="status-icon available-icon">${icon('check')}</span><div><strong>Serviceability at ${overall.percent}%</strong><p>${overall.available} of ${overall.total} vehicles available</p></div></div>
          <div class="insight"><span class="status-icon mission-icon">${icon('wheel')}</span><div><strong>${overall.mission} vehicles on mission</strong><p>${overall.missionPercent}% of total fleet</p></div></div>
          <div class="insight"><span class="status-icon unavailable-icon">${icon('close')}</span><div><strong>${overall.unavailable} vehicles not available</strong><p>${overall.unavailablePercent}% of total fleet</p></div></div>
        </section>
      </div>
    </section>`;
}

function trendChart() {
  // Fixed visual trace from the reference, not an invented underlying time-series dataset.
  return `<svg class="trend-chart" viewBox="0 0 640 242" role="img" aria-label="Illustrated serviceability trend from 01-Oct-2026 to 22-Oct-2026, ending at 70%">
    <defs><linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#168bff" stop-opacity=".35"/><stop offset="1" stop-color="#168bff" stop-opacity=".06"/></linearGradient></defs>
    <g class="chart-grid"><path d="M80 24H615M80 69H615M80 114H615M80 159H615M80 204H615M80 24V204M200 24V204M320 24V204M440 24V204M560 24V204"/></g>
    <g class="chart-labels"><text x="59" y="30" text-anchor="end">100%</text><text x="59" y="75" text-anchor="end">75%</text><text x="59" y="120" text-anchor="end">50%</text><text x="59" y="165" text-anchor="end">25%</text><text x="59" y="210" text-anchor="end">0%</text><text x="80" y="237" text-anchor="middle">01-Oct-2026</text><text x="200" y="237" text-anchor="middle">07-Oct-2026</text><text x="320" y="237" text-anchor="middle">13-Oct-2026</text><text x="440" y="237" text-anchor="middle">19-Oct-2026</text><text x="594" y="237" text-anchor="middle">22-Oct-2026</text></g>
    <path d="M80 139 145 125 212 120 280 99 347 114 414 102 481 105 548 83 614 80V204H80Z" fill="url(#trend-fill)"/>
    <path d="M80 139 145 125 212 120 280 99 347 114 414 102 481 105 548 83 614 80" fill="none" stroke="#0787ff" stroke-width="4" stroke-linejoin="round"/>
    <g fill="#0787ff" stroke="var(--surface)" stroke-width="2"><circle cx="80" cy="139" r="6"/><circle cx="145" cy="125" r="6"/><circle cx="212" cy="120" r="6"/><circle cx="280" cy="99" r="6"/><circle cx="347" cy="114" r="6"/><circle cx="414" cy="102" r="6"/><circle cx="481" cy="105" r="6"/><circle cx="548" cy="83" r="6"/><circle cx="614" cy="80" r="7"/></g>
    <rect x="580" y="25" width="55" height="32" rx="6" fill="#0787ff"/><text x="607" y="48" text-anchor="middle" fill="white" font-size="24" font-weight="700">70%</text>
  </svg>`;
}

function summary(screen, state) {
  const data = displayData(state.unit, screen, state.date);
  const baseline = fleet[screen];
  const unchangedReference = state.unit === 'All' && state.date === REFERENCE_DATE && data.available === Number(baseline.available) && data.mission === Number(baseline.mission) && data.unavailable === Number(baseline.unavailable);
  const availablePercent = unchangedReference ? (baseline.availablePercent || baseline.percent) : data.percentLabel;
  const filterClass = filter => `summary-filter${state.statusFilter === filter ? ' active' : ''}`;
  const filterAttributes = filter => `data-summary-filter="${filter}" role="button" tabindex="0" aria-pressed="${state.statusFilter === filter}"`;
  return `<section class="summary-grid" aria-label="${data.title} serviceability summary">
    <div class="summary-main percentage-card ${filterClass('serviceability')}" ${filterAttributes('serviceability')} style="${percentageStyle(data.percent)}"><div class="summary-percent"><strong>${data.percentLabel}</strong></div>
    ${vehicleArt(screen)}
    <div class="summary-total"><strong>${data.totalLabel}</strong><span>Available / Total</span></div></div>
    <div class="summary-stat available-stat ${filterClass('available')}" ${filterAttributes('available')}><span class="status-icon available-icon">${icon('check')}</span><div><strong>${data.available}</strong><span>Available</span></div><b>${availablePercent}</b></div>
    <div class="summary-stat mission-stat ${filterClass('mission')}" ${filterAttributes('mission')}><span class="status-icon mission-icon">${icon('wheel')}</span><div><strong>${data.mission}</strong><span>On Mission</span></div><b>${data.missionPercent}%</b></div>
    <div class="summary-stat unavailable-stat ${filterClass('unavailable')}" ${filterAttributes('unavailable')}><span class="status-icon unavailable-icon">${icon('wrench')}</span><div><strong>${data.unavailable}</strong><span>Not Available</span></div><b>${data.unavailablePercent}%</b></div>
  </section>`;
}

function toolbar() {
  return `<div class="table-toolbar" aria-label="Filter controls shown in reference; presentation only">
    <div class="static-field search-field"><span>Search by plate number, model or VIN...</span>${icon('search')}</div>
    <div class="static-field status-field"><span>All Status</span>${icon('down')}</div>
    <span class="static-field filter-field">${icon('filters')}</span>
  </div>`;
}

function vehicleTable(screen, state) {
  const filterStatus = {serviceability: 'Available', available: 'Available', mission: 'On Mission', unavailable: 'Not Available'}[state.statusFilter];
  const matchingRecords = recordsFor(state.unit, screen, state.date).filter(record => !filterStatus || record.status === filterStatus);
  const pages = Math.max(1, Math.ceil(matchingRecords.length / 10));
  const page = Math.min(state.page, pages);
  const offset = (page - 1) * 10;
  const pageRecords = matchingRecords.slice(offset, offset + 10);
  const rows = pageRecords.map((record, index) => {
    const statusClass = record.status === 'Available' ? 'available' : record.status === 'On Mission' ? 'mission' : 'unavailable';
    return `<tr data-record-id="${record.id}" data-plate="${record.plate}"><td>${offset + index + 1}</td>${screen === 'all' ? '<td>' + record.type + '</td>' : ''}<td>${record.plate}</td><td>${record.model}</td><td>${record.year}</td><td><span class="status-badge ${statusClass}"><i></i>${record.status}</span></td><td>${formatDate(state.date)} ${record.time}</td><td>${escapeHtml(record.assignment)}</td></tr>`;
  }).join('');
  const title = fleet[screen].title;
  const categoryLabel = screen === 'all' ? 'vehicles' : `${title.toLowerCase()} vehicles`;
  const start = matchingRecords.length ? offset + 1 : 0;
  const end = Math.min(offset + pageRecords.length, matchingRecords.length);
  return `<div class="table-scroll" tabindex="0" role="region" aria-label="${title} vehicle grid"><table><caption class="visually-hidden">${title}: page ${page} of ${pages}</caption><thead><tr><th scope="col">#</th>${screen === 'all' ? '<th scope="col">Vehicle Type</th>' : ''}<th scope="col">Plate Number</th><th scope="col">Model</th><th scope="col">Year</th><th scope="col">Status</th><th scope="col">Last Updated</th><th scope="col">Current Assignment</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="table-footer"><p>Showing ${start}-${end} of ${matchingRecords.length} ${categoryLabel}</p><div class="pagination" aria-label="Table pagination"><button type="button" class="page-arrow previous-page" data-page-action="previous"${page === 1 ? ' disabled' : ''}>${icon('back')}<span>Previous</span></button><span class="page-status" aria-live="polite">Page ${page} of ${pages}</span><button type="button" class="page-arrow next-page" data-page-action="next"${page === pages ? ' disabled' : ''}><span>Next</span>${icon('back')}</button><span class="page-size">10 / page ${icon('down')}</span></div></div>`;
}

function recordDialog(state) {
  if (!state.activeRecordId) return '';
  const record = recordsFor('All', 'all', state.date).find(item => item.id === state.activeRecordId);
  if (!record) return '';
  const selectedStatus = record.status === 'Available' ? 'Serviceable' : 'Non-Serviceable';
  return `<dialog class="record-dialog" aria-label="Vehicle record details" data-record-id="${record.id}" data-mode="view">
    <div class="dialog-fields">
      <label>Status:<select name="status" disabled>${['Serviceable', 'Non-Serviceable'].map(value => selectedOption(value, selectedStatus)).join('')}</select></label>
      <label>Discovered Date:<span class="formatted-date-input"><span>${formatDate(record.discoveredDate)}</span><input name="discoveredDate" type="date" value="${record.discoveredDate}" aria-label="Discovered Date" disabled></span></label>
      <label>Location:<select name="location" disabled>${['Inside Country', 'Outside Country'].map(value => selectedOption(value, record.location)).join('')}</select></label>
      <label>Deployed:<select name="deployed" disabled>${['Yes', 'No'].map(value => selectedOption(value, record.deployed)).join('')}</select></label>
      <label>Reason for Non-Serviceability:<textarea name="reason" rows="5" disabled>${escapeHtml(record.reason)}</textarea></label>
    </div>
    <div class="dialog-actions">
      <button type="button" data-action="modify">Modify</button>
      <button type="button" data-action="close">Close</button>
      <button type="button" data-action="save" hidden>Save</button>
      <button type="button" data-action="cancel" hidden>Cancel</button>
    </div>
  </dialog>`;
}

function renderScreen(state) {
  const screen = Object.hasOwn(fleet, state.screen) ? state.screen : 'dashboard';
  const viewState = {unit: 'All', date: REFERENCE_DATE, activeRecordId: null, statusFilter: 'all', page: 1, ...state};
  return header(screen, viewState) + `<main class="${screen === 'dashboard' ? 'dashboard' : 'detail detail-' + screen}" id="main-content">${screen === 'dashboard' ? dashboard(viewState) : summary(screen, viewState) + '<section class="table-panel" aria-label="Vehicle records">' + toolbar() + vehicleTable(screen, viewState) + '</section>'}</main>${recordDialog(viewState)}`;
}

function dashboardScale(contentWidth, contentHeight, viewportWidth, viewportHeight) {
  return Math.min(1, viewportWidth / Math.max(1, contentWidth), viewportHeight / Math.max(1, contentHeight));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {transition, renderScreen, screenFromHash, dashboardScale, vehicleRecords, recordsByDate, supportedDates, STORAGE_KEY, aggregateFor, recordsFor, saveRecord, getSavedRecord, reloadSavedRecords, formatDate, percentageStyle};
}

if (typeof document !== 'undefined') {
  reloadSavedRecords(window.localStorage);
  window.prototypeApi = {transition, renderScreen, screenFromHash, dashboardScale, vehicleRecords, recordsByDate, supportedDates, STORAGE_KEY, aggregateFor, recordsFor, saveRecord, getSavedRecord, reloadSavedRecords, formatDate, percentageStyle};
  let state = {screen: screenFromHash(location.hash), theme: 'light', unit: 'All', date: REFERENCE_DATE, activeRecordId: null, statusFilter: 'all', page: 1};
  const app = document.getElementById('app');
  function fitDashboard() {
    if (state.screen === 'dashboard') {
      const scale = dashboardScale(app.scrollWidth, app.scrollHeight, window.innerWidth, window.innerHeight);
      app.style.setProperty('--dashboard-scale', scale);
    } else {
      app.style.removeProperty('--dashboard-scale');
    }
  }
  function paint(focusHeading = false) {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.dataset.screen = state.screen;
    document.title = `${state.screen === 'dashboard' ? 'Vehicle Serviceability' : fleet[state.screen].title} | Vehicle Serviceability Prototype`;
    app.innerHTML = renderScreen(state);
    fitDashboard();
    const dialog = app.querySelector('.record-dialog');
    if (dialog) {
      dialog.showModal();
      dialog.addEventListener('close', () => {
        if (!dialog.isConnected) return;
        if (state.activeRecordId) {
          state = transition(state, {type: 'close-record'});
          paint();
        }
      }, {once: true});
      dialog.addEventListener('cancel', event => {
        event.preventDefault();
        state = transition(state, {type: 'close-record'});
        paint();
      }, {once: true});
    }
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
      return;
    }
    const summaryFilter = event.target.closest('[data-summary-filter]');
    if (summaryFilter) {
      const filter = summaryFilter.dataset.summaryFilter;
      state = transition(state, {type: 'set-filter', filter: summaryFilter.dataset.summaryFilter});
      paint();
      app.querySelector(`[data-summary-filter="${filter}"]`).focus({preventScroll: true});
      return;
    }
    const pageAction = event.target.closest('[data-page-action]');
    if (pageAction && !pageAction.disabled) {
      const action = pageAction.dataset.pageAction;
      state = transition(state, {type: 'set-page', page: state.page + (action === 'next' ? 1 : -1)});
      paint();
      const matchingControl = app.querySelector(`[data-page-action="${action}"]`);
      const focusControl = matchingControl.disabled ? app.querySelector(`[data-page-action="${action === 'next' ? 'previous' : 'next'}"]`) : matchingControl;
      focusControl.focus({preventScroll: true});
      return;
    }
    const dialog = event.target.closest('.record-dialog');
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (dialog && action === 'modify') {
      dialog.dataset.mode = 'edit';
      dialog.querySelectorAll('select, input, textarea').forEach(control => { control.disabled = false; });
      dialog.querySelectorAll('[data-action="modify"], [data-action="close"]').forEach(button => { button.hidden = true; });
      dialog.querySelectorAll('[data-action="save"], [data-action="cancel"]').forEach(button => { button.hidden = false; });
      dialog.querySelector('[name="status"]').focus();
      return;
    }
    if (dialog && action === 'cancel') {
      paint();
      return;
    }
    if (dialog && action === 'save') {
      saveRecord(state.date, state.activeRecordId, {
        status: dialog.querySelector('[name="status"]').value,
        discoveredDate: dialog.querySelector('[name="discoveredDate"]').value,
        location: dialog.querySelector('[name="location"]').value,
        deployed: dialog.querySelector('[name="deployed"]').value,
        reason: dialog.querySelector('[name="reason"]').value,
      }, window.localStorage);
      state = {...state, page: 1};
      paint();
      return;
    }
    if (dialog && action === 'close') {
      dialog.close();
      return;
    }
    if (dialog && event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) dialog.close();
    }
  });
  app.addEventListener('input', event => {
    if (event.target.matches('.record-dialog [name="discoveredDate"]') && /^\d{4}-\d{2}-\d{2}$/.test(event.target.value)) {
      event.target.previousElementSibling.textContent = formatDate(event.target.value);
    }
  });
  app.addEventListener('keydown', event => {
    const summaryFilter = event.target.closest('[data-summary-filter]');
    if (summaryFilter && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      summaryFilter.click();
    }
  });
  app.addEventListener('change', event => {
    if (event.target.matches('#unit-filter')) {
      state = transition(state, {type: 'set-unit', unit: event.target.value});
      paint();
      document.getElementById('unit-filter').focus({preventScroll: true});
    } else if (event.target.matches('#dashboard-date')) {
      state = transition(state, {type: 'set-date', date: event.target.value});
      paint();
      document.getElementById('dashboard-date').focus({preventScroll: true});
    }
  });
  app.addEventListener('dblclick', event => {
    const row = event.target.closest('tr[data-record-id]');
    if (row) {
      state = transition(state, {type: 'open-record', recordId: row.dataset.recordId});
      paint();
    }
  });
  window.addEventListener('hashchange', () => {
    state = transition(state, {type: 'navigate', screen: screenFromHash(location.hash)});
    paint(true);
  });
  window.addEventListener('resize', fitDashboard);
  paint();
}
