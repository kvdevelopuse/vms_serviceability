# React ERP integration

`VehicleServiceabilityComponents.jsx` provides reusable React function components for the UI added to the standalone prototype:

- `UnitTextField` — a disabled Unit text input for displaying the selected Unit on detail screens.
- `FleetCard` — a dashboard card with percentage-split styling.
- `DetailSummaryCards` — the Serviceability, Available, On Mission, and Not Available detail cards.

The components depend only on React. They contain no router, API client, storage, global state, or third-party UI-library code. Import the component stylesheet once inside the ERP feature boundary.
The scoped stylesheet gives serviceability values tabular typography and a proportional green/red rail, while status percentages use compact semantic decorations that do not change card measurements.

```jsx
import {
  UnitTextField,
  FleetCard,
  DetailSummaryCards,
} from './VehicleServiceabilityComponents';
import './vehicle-serviceability.css';

export function FleetFeature({
  fleet,
  activeFilter,
  onFilter,
  onOpenDetails,
}) {
  return (
    <section className="vms-serviceability" data-theme="light">
      <UnitTextField value={fleet.unit} />
      <FleetCard
        title={fleet.title}
        serviceability={fleet.serviceability}
        available={fleet.available}
        total={fleet.total}
        imageSrc={fleet.imageSrc}
        onOpen={onOpenDetails}
      />
      <DetailSummaryCards
        title={fleet.title}
        serviceability={fleet.serviceability}
        available={fleet.available}
        availablePercentage={fleet.availablePercentage}
        total={fleet.total}
        onMission={fleet.onMission}
        onMissionPercentage={fleet.onMissionPercentage}
        notAvailable={fleet.notAvailable}
        notAvailablePercentage={fleet.notAvailablePercentage}
        imageSrc={fleet.imageSrc}
        activeFilter={activeFilter}
        onFilter={onFilter}
      />
    </section>
  );
}
```

## ERP integration inputs

Connect these props using the conventions already present in the ERP:

- Map ERP vehicle data to `available`, `total`, `onMission`, and `notAvailable`.
- Pass the existing displayed values through `serviceability`, `availablePercentage`, `onMissionPercentage`, and `notAvailablePercentage` when they differ from rounded count calculations. Each percentage falls back to a calculated value when omitted.
- Supply image URLs through the ERP asset pipeline.
- Connect `onOpen` and `onFilter` to the ERP router and state layer.
- Set `data-theme="light"` or `data-theme="dark"` on the `.vms-serviceability` boundary.
- Map the CSS custom properties to ERP design tokens if the ERP has an established token system.

Direct wiring requires the ERP's React version, build tool, router/state conventions, design tokens, and vehicle-data API contract. Those details are intentionally not assumed here.
