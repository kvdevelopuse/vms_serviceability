import React from 'react';
import './vehicle-serviceability.css';

const clampPercentage = value => Math.max(0, Math.min(100, Number(value) || 0));
const percentage = (value, total) => total ? Math.round(value / total * 100) : 0;

export function UnitTextField({
  id,
  label = 'Unit',
  value = '',
  className = '',
}) {
  return (
    <label className={`vms-unit-field ${className}`.trim()} {...(id ? {htmlFor: id} : {})}>
      <span>{label}:</span>
      <input
        {...(id ? {id} : {})}
        type="text"
        value={value}
        disabled
        aria-disabled="true"
      />
    </label>
  );
}

export function FleetCard({
  title,
  serviceability,
  available,
  total,
  imageSrc,
  imageAlt = '',
  icon,
  onOpen,
  className = '',
}) {
  const serviceabilityValue = clampPercentage(serviceability);
  return (
    <article
      className={`vms-fleet-card ${className}`.trim()}
      style={{'--vms-serviceability': `${serviceabilityValue}%`}}
    >
      <div className="vms-fleet-card__numbers">
        <strong>{serviceabilityValue}%</strong>
        <span><b>{available} / {total}</b><small>Available / Total</small></span>
      </div>
      {imageSrc && <img className="vms-fleet-card__image" src={imageSrc} alt={imageAlt} />}
      <div className="vms-fleet-card__footer">
        {icon && <span aria-hidden="true">{icon}</span>}
        <h2>{title}</h2>
        <button type="button" onClick={onOpen} aria-label={`Open ${title} details`}>→</button>
      </div>
    </article>
  );
}

function SummaryActionCard({filter, activeFilter, label, value, valuePercent, tone, icon, onFilter}) {
  const active = activeFilter === filter;
  return (
    <button
      type="button"
      className={`vms-summary-card vms-summary-card--${tone}${active ? ' is-active' : ''}`}
      aria-pressed={active}
      onClick={() => onFilter?.(filter)}
    >
      {icon && <span className="vms-summary-card__icon" aria-hidden="true">{icon}</span>}
      <span><strong>{value}</strong><small>{label}</small></span>
      <b>{valuePercent}%</b>
    </button>
  );
}

export function DetailSummaryCards({
  title,
  serviceability,
  available,
  availablePercentage,
  total,
  onMission,
  onMissionPercentage,
  notAvailable,
  notAvailablePercentage,
  imageSrc,
  imageAlt = '',
  activeFilter = 'all',
  onFilter,
  icons = {},
}) {
  const serviceabilityValue = serviceability == null ? percentage(available, total) : clampPercentage(serviceability);
  const availablePercentageValue = availablePercentage == null ? percentage(available, total) : clampPercentage(availablePercentage);
  const missionPercentageValue = onMissionPercentage == null ? percentage(onMission, total) : clampPercentage(onMissionPercentage);
  const unavailablePercentageValue = notAvailablePercentage == null ? percentage(notAvailable, total) : clampPercentage(notAvailablePercentage);
  return (
    <section className="vms-detail-summary" aria-label={`${title} serviceability summary`}>
      <button
        type="button"
        className={`vms-serviceability-card${activeFilter === 'serviceability' ? ' is-active' : ''}`}
        style={{'--vms-percentage': `${serviceabilityValue}%`}}
        aria-pressed={activeFilter === 'serviceability'}
        onClick={() => onFilter?.('serviceability')}
      >
        <span className="vms-serviceability-card__percentage"><strong>{serviceabilityValue}%</strong></span>
        {imageSrc && <img src={imageSrc} alt={imageAlt} />}
        <span className="vms-serviceability-card__total"><strong>{available} / {total}</strong><small>Available / Total</small></span>
      </button>
      <SummaryActionCard filter="available" activeFilter={activeFilter} label="Available" value={available} valuePercent={availablePercentageValue} tone="available" icon={icons.available} onFilter={onFilter} />
      <SummaryActionCard filter="mission" activeFilter={activeFilter} label="On Mission" value={onMission} valuePercent={missionPercentageValue} tone="mission" icon={icons.mission} onFilter={onFilter} />
      <SummaryActionCard filter="unavailable" activeFilter={activeFilter} label="Not Available" value={notAvailable} valuePercent={unavailablePercentageValue} tone="unavailable" icon={icons.unavailable} onFilter={onFilter} />
    </section>
  );
}
