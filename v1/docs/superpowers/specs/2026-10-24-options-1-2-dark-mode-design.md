# Options 1 and 2 Dark Mode Design

## Intent

Implement the approved dark theme for Vehicle Serviceability Options 1 and 2, using `styling/DarkMode.png` as the surface-treatment reference and the user-supplied palette as the exact color source. Preserve the light theme and all current layout, typography, data, calculations, labels, card behavior, navigation, filters, and vehicle-image treatment.

## Theme behavior

- Keep the existing Light Mode/Dark Mode toggle.
- Persist the selected theme in browser storage and restore it after refresh.
- Default to Light Mode when storage is absent, unavailable, or contains an invalid value.
- Apply the new palette only under `data-theme="dark"` and only to the Option 1/Option 2 experience. Option 3 stays hidden and unchanged.

## Palette and mappings

- Page and header: `#07111B`.
- Sections: `#0A1824`; panels, tables, rows, and modal: `#0D1D2B`; elevated surfaces: `#122536`.
- Controls: `#102131`; hover: `#172D3F`; table header: `#102536`; alternating rows: `#102131`.
- Primary borders: `#294055`; secondary borders: `#1D3447`; dividers and chart grid: `#203749`.
- Primary text: `#F4F7FA`; secondary text: `#C4D0DB`; muted text: `#8FA2B3`; disabled text: `#607587`.
- Category accents: All Vehicles `#00B7FF`, Sedan `#FFB000`, SUV `#8A4DFF`, People Movers `#00D99B`.
- Category card fills: `rgba(0,183,255,.16)`, `rgba(255,176,0,.16)`, `rgba(138,77,255,.16)`, and `rgba(0,217,155,.16)` respectively.
- Status accents: Available `#00D99B`, On Mission `#FFC31A`, Unavailable `#FF4D64`, informational values `#00B7FF`.
- Trend: line and points `#64F2C5`, a uniform transparent mint area fill, grid `#203749`, labels `#8FA2B3`.
- Insights: critical `rgba(255,77,100,.18)`, information `rgba(0,183,255,.16)`, warning `rgba(255,195,26,.17)`.

## Controls and states

Inputs, date controls, radio buttons, pagination, navigation buttons, modal controls, and form fields use the supplied dark control surfaces and light text. Hover, focus, active, selected, and disabled states remain visibly distinct. Selected detail-card borders continue matching each card's category or status accent.

## Option-specific progress treatment

- Option 1 dark mode uses the same progressive card-color fill behavior as Option 1 light mode on all four landing cards.
- Option 1 dark mode also uses the progressive fill on the first Serviceability card of every detail page.
- Option 2 retains its existing circular progress indicators on landing and detail screens, recolored with the approved dark palette.

## Visual constraints

- No decorative gradients, glow effects, patterns, or additional shadows.
- Option 2 circular progress rendering retains its conic progress geometry, recolored with the approved accents.
- The trend area uses a single translucent mint fill rather than a decorative gradient.
- Vehicle images remain unchanged and fully visible.
- At 1920×1080, the landing page and every detail category for Options 1 and 2 must have no viewport scrollbar, clipping, overlap, unreadable text, or light-theme surface leakage.

## Non-goals

- No light-mode changes.
- No Option 3 changes.
- No data, wording, sizing, spacing, layout, interaction, or navigation changes.
- No Git push without explicit user approval.

