# React ERP integration

`VehicleServiceabilityComponents.jsx` provides reusable React function components for the UI added to the standalone prototype:

- `UnitTextField` — a disabled Unit text input for displaying the selected Unit on detail screens.
- `FleetCard` — a dashboard card with the Option 1 reference or `option2.png` category-tint/ring styling and separate select/open controls.
- `DetailSummaryCards` — the Serviceability, On Mission, and Not Available detail cards. Serviceability also serves as the Available-record filter.

The components depend only on React. They contain no router, API client, storage, global state, or third-party UI-library code. Import the component stylesheet once inside the ERP feature boundary.
The scoped stylesheet gives serviceability values tabular typography and matching semantic green/red colors, while status percentages use compact decorations that do not change card measurements.

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
        available={fleet.available}
        total={fleet.total}
        imageSrc={fleet.imageSrc}
        onOpen={onOpenDetails}
      />
      <DetailSummaryCards
        title={fleet.title}
        available={fleet.available}
        total={fleet.total}
        onMission={fleet.onMission}
        notAvailable={fleet.notAvailable}
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
- All percentages are computed as status count / total × 100, rounded to a whole number; zero total returns 0%. Percentage override props no longer control the displayed values, so counts cannot conflict with the percentage.
- Supply image URLs through the ERP asset pipeline.
- Connect `onOpen` and `onFilter` to the ERP router and state layer.
- Pass `designOption="1"` for the emerald/ice-blue reference design or `designOption="2"` for the `option2.png` layout: a centered serviceability ring with separate Available and Total tiles. The default is Option 1.
- Pass `selected` and `onSelect` to `FleetCard` to control dashboard selection. The native selection button and arrow are separate controls; opening details does not invoke `onSelect`. Keep the chosen design/category in the owning dashboard state across navigation.
- Numeric available/total ratios remain visible; the text label is removed. Status summary filters keep their existing behavior.
- Option 2 uses category-specific blue, amber, violet, and mint surfaces in Light Mode, with coordinated deep tints in Dark Mode. The count-derived percentage and Serviceable label are centered inside the ring; Available and Total remain unchanged in separate tiles.
- Detail selection and keyboard-focus outlines are inset by 3px, keeping all four edges visible within clipping containers.
- Set `data-theme="light"` or `data-theme="dark"` on the `.vms-serviceability` boundary.
- Map the CSS custom properties to ERP design tokens if the ERP has an established token system.

Direct wiring requires the ERP's React version, build tool, router/state conventions, design tokens, and vehicle-data API contract. Those details are intentionally not assumed here.
