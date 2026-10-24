import React from 'react';
import './vehicle-serviceability.css';

const percentage = (value, total) => total ? Math.round(value / total * 100) : 0;
const usesOption2Design = designOption => designOption === '1' || designOption === '2';

function ServiceabilityValue({value, designOption}) {
  return usesOption2Design(designOption)
    ? <span className={`vms-service-ring${value < 70 ? ' is-alert' : ''}`} style={{'--vms-ring-value': `${value}%`}} role="img" aria-label={`${value}% serviceable`}><span className="vms-service-ring__content"><strong>{value}%</strong></span></span>
    : <strong>{value}%</strong>;
}

function CountValue({available, total, designOption, showTotalLabel = true}) {
  const label = `${available} / ${total}`;
  return usesOption2Design(designOption)
    ? <><span className="vms-option2-stat vms-option2-stat--available"><span className="vms-option2-stat__icon" aria-hidden="true">▣</span><span><strong>{available}</strong><small>Available</small></span></span><span className="vms-option2-stat vms-option2-stat--total"><span className="vms-option2-stat__icon" aria-hidden="true">▦</span><span><strong>{total}</strong>{showTotalLabel && <small>Total</small>}</span></span></>
    : <strong>{label}</strong>;
}

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
  available,
  total,
  imageSrc,
  imageAlt = '',
  icon,
  onOpen,
  onSelect,
  selected = false,
  designOption = '1',
  className = '',
}) {
  const serviceabilityValue = percentage(available, total);
  const category = title === 'All Vehicles' ? 'all' : title.toLowerCase().replaceAll(' ', '-');
  return (
    <article
      className={`vms-fleet-card${selected ? ' is-selected' : ''} ${className}`.trim()}
      data-design={designOption}
      data-category={category}
      style={{'--vms-serviceability': `${serviceabilityValue}%`}}
    >
      {onSelect && <button type="button" className="vms-fleet-card__select" aria-label={`Select ${title}`} aria-pressed={selected} onClick={onSelect} />}
      <div className="vms-fleet-card__numbers">
        <ServiceabilityValue value={serviceabilityValue} designOption={designOption} />
        <span><CountValue available={available} total={total} designOption={designOption} /></span>
      </div>
      {imageSrc && <img className="vms-fleet-card__image" src={imageSrc} alt={imageAlt} />}
      <div className="vms-fleet-card__footer">
        {icon && <span aria-hidden="true">{icon}</span>}
        <h2>{title}</h2>
        <button type="button" onClick={event => {event.stopPropagation(); onOpen?.(event);}} aria-label={`Open ${title} details`}>→</button>
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
  available,
  total,
  onMission,
  notAvailable,
  imageSrc,
  imageAlt = '',
  activeFilter = 'all',
  onFilter,
  icons = {},
  designOption = '1',
}) {
  const serviceabilityValue = percentage(available, total);
  const missionPercentageValue = percentage(onMission, total);
  const unavailablePercentageValue = percentage(notAvailable, total);
  const category = title === 'All Vehicles' ? 'all' : title.toLowerCase().replaceAll(' ', '-');
  return (
    <section className="vms-detail-summary" data-design={designOption} data-category={category} aria-label={`${title} serviceability summary`}>
      <button
        type="button"
        className={`vms-serviceability-card${activeFilter === 'serviceability' ? ' is-active' : ''}`}
        style={{'--vms-percentage': `${serviceabilityValue}%`}}
        aria-pressed={activeFilter === 'serviceability'}
        onClick={() => onFilter?.('serviceability')}
      >
        <span className="vms-serviceability-card__percentage"><ServiceabilityValue value={serviceabilityValue} designOption={designOption} /></span>
        {imageSrc && <img src={imageSrc} alt={imageAlt} />}
        <span className="vms-serviceability-card__total"><CountValue available={available} total={total} designOption={designOption} showTotalLabel={!usesOption2Design(designOption)} /></span>
      </button>
      <SummaryActionCard filter="mission" activeFilter={activeFilter} label="On Mission" value={onMission} valuePercent={missionPercentageValue} tone="mission" icon={icons.mission} onFilter={onFilter} />
      <SummaryActionCard filter="unavailable" activeFilter={activeFilter} label={usesOption2Design(designOption) ? 'Unavailable' : 'Not Available'} value={notAvailable} valuePercent={unavailablePercentageValue} tone="unavailable" icon={icons.unavailable} onFilter={onFilter} />
    </section>
  );
}
