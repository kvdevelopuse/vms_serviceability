# Unit Filter, Date Selection, and Record Popup Design

## Intent

Extend the existing static vehicle serviceability prototype with deterministic unit filtering, an editable dashboard date, proportional serviceability card colors, and a non-saving record popup. The original `All` dashboard totals, percentages, labels, and visible vehicle values remain the baseline and must render unchanged apart from the explicitly added controls and removed Actions column.

## Goals

- Keep `All` at 120 vehicles: 84 Available, 24 On Mission, and 12 Not Available.
- Keep the existing category totals: Sedan 40, SUV 48, and People Movers 32.
- Provide one fixed 120-record dataset with Unit A-D assignments and no random values.
- Reconcile every unit/category/status count to the existing `All` totals.
- Render dashboard and detail summary values from the same selected-unit aggregates.
- Retain the selected unit, date, and theme while navigating between dashboard and detail screens.
- Add the five-field, non-saving popup on detail-row double-click.
- Correct the Fleet Overview overlap while keeping each full vehicle image visible.
- Preserve arrow-only card navigation and both themes.

## Non-goals

- Date-based filtering or date-dependent calculations.
- Saving popup values or modifying vehicle records.
- New validation, fields, actions, dependencies, or backend services.
- Adding behavior to the existing search, status filter, or pagination controls.
- Persisting state after a browser reload.

## Anti-goals

- Changing any original `All` count, percentage, total, or heading.
- Computing `All` by altering unit figures until the old display happens to match.
- Using random record generation or allowing unit results to change between renders.
- Making the full card clickable or changing the existing hash routes.

## Approaches Considered

### Presentation-only unit selection

This would retain the chosen label but leave the values unchanged. It was rejected because the revised requirements explicitly require unit-specific values and records.

### Fixed unit summaries with the current small row samples

This would be a smaller change, but the user chose a complete 120-record dataset. It would also make summary counts difficult to validate against the underlying records.

### Fixed 120-record dataset (selected)

Create deterministic vehicle records with category, status, and unit fields. Derive unit and category summaries from those records, while holding the original `All` constants as an explicit regression baseline. This provides one source for unit detail rows and makes reconciliation mechanically testable.

The user authorized correction of conflicting legacy rows so the result can be a clean canonical dataset. Existing non-conflicting record details are retained where they fit the allocation. Reused plate numbers with contradictory category, model, year, or status values are normalized to one unique vehicle record. The aggregate `All` values remain unchanged.

## Fixed Allocation

`Available` is the existing serviceable count. `On Mission` and `Not Available` remain separate displayed statuses and together make up the non-serviceable remainder used by the proportional card background.

| Unit | Category | Available | On Mission | Not Available | Total | Serviceability |
|---|---|---:|---:|---:|---:|---:|
| Unit A | Sedan | 9 | 2 | 1 | 12 | 75% |
| Unit A | SUV | 9 | 3 | 2 | 14 | 64% |
| Unit A | People Movers | 6 | 2 | 0 | 8 | 75% |
| **Unit A** | **All Vehicles** | **24** | **7** | **3** | **34** | **71%** |
| Unit B | Sedan | 8 | 2 | 1 | 11 | 73% |
| Unit B | SUV | 8 | 3 | 2 | 13 | 62% |
| Unit B | People Movers | 6 | 1 | 1 | 8 | 75% |
| **Unit B** | **All Vehicles** | **22** | **6** | **4** | **32** | **69%** |
| Unit C | Sedan | 7 | 2 | 0 | 9 | 78% |
| Unit C | SUV | 7 | 3 | 1 | 11 | 64% |
| Unit C | People Movers | 7 | 1 | 1 | 9 | 78% |
| **Unit C** | **All Vehicles** | **21** | **6** | **2** | **29** | **72%** |
| Unit D | Sedan | 6 | 1 | 1 | 8 | 75% |
| Unit D | SUV | 6 | 2 | 2 | 10 | 60% |
| Unit D | People Movers | 5 | 2 | 0 | 7 | 71% |
| **Unit D** | **All Vehicles** | **17** | **5** | **3** | **25** | **68%** |
| **All** | **Sedan** | **30** | **7** | **3** | **40** | **75%** |
| **All** | **SUV** | **30** | **11** | **7** | **48** | **63%** |
| **All** | **People Movers** | **24** | **6** | **2** | **32** | **75%** |
| **All** | **All Vehicles** | **84** | **24** | **12** | **120** | **70%** |

Percentages use `Math.round(available / total * 100)`, matching the existing SUV display where 30 / 48 becomes 63%. The allocation produces distinct overall totals and percentages for all four units.

## Data Design

The prototype keeps its no-dependency, single-page structure. `prototype/app.js` will contain:

- the unchanged original `All` aggregate baseline;
- the fixed allocation table above;
- deterministic record templates and a builder that creates exactly 120 records at startup without randomness;
- stable fields for record ID, category, plate, model, year, status, last-updated time, assignment, and unit.

The result contains 120 unique record IDs and plate numbers. Existing non-conflicting sample records are retained; conflicting legacy duplicates are corrected as required to produce one internally consistent dataset. The table continues to show the first ten matching records because the existing pagination is presentation-only; its footer count and page count reflect the complete selected subset. This avoids introducing unrequested pagination behavior while retaining a complete, testable 120-record pool.

## State and Navigation

Application state becomes:

```text
screen: dashboard | all | sedan | suv | people-movers
theme: light | dark
unit: All | Unit A | Unit B | Unit C | Unit D
date: YYYY-MM-DD
activeRecordId: null | record ID
```

The initial unit is `All`. The initial date is `2026-10-22`, matching the prototype's existing header date. Hash navigation changes only `screen`, so unit, date, and theme survive navigation. Reloading resets to these prototype defaults.

## Dashboard UI

- Add a native `<select>` labeled `Unit:` at the top of the dashboard with the five specified values.
- Convert the existing dashboard date display to a native `<input type="date">` so the browser provides the picker.
- Render the selected date in the existing header area without changing vehicle data.
- Render each category card from the selected unit's aggregate.
- Set a CSS custom property with the displayed percentage and use a horizontal green/red linear gradient across the full card width.
- Keep the arrow anchor as the only navigation target.

The `All` selection uses the explicit original baseline values. Unit selections use aggregates derived from the 120 fixed records.

## Fleet Overview Layout Correction

Keep the category grid and Fleet Overview as separate document-flow blocks with an explicit gap. Constrain every vehicle image to its existing art box with `max-width`, `max-height`, and `object-fit: contain`, and remove any vertical offset that can extend the combined All Vehicles artwork below that box. The full silhouettes remain visible without cropping or distortion. These rules apply identically in light and dark themes and do not change typography, colors, card dimensions, data, or unrelated dashboard elements.

## Detail UI

- Place the same Unit select directly below the detail heading and disable it.
- Show the retained selected date in the existing date area as non-editable text.
- Render summary cards and footer counts for the selected unit/category.
- Filter the 120-record pool by selected unit and category, then show the first ten matching rows.
- Remove the Actions header and cells without changing any other column.

## Record Popup

Double-clicking a detail table row opens a native `<dialog>` styled with the current theme variables. It contains only these fields, in this order, with left labels and right controls:

1. Status: select with Serviceable / Non-Serviceable.
2. Discovered Date: native date input.
3. Location: select with Inside Country / Outside Country.
4. Deployed: select with Yes / No.
5. Reason for Non-Serviceability: textarea with five visible rows.

The dialog has no save action and never writes to the dataset. Escape or clicking the backdrop closes it. Opening values are temporary form values; the date begins with the selected dashboard date and the status reflects whether the row is Available. Theme changes repaint the same themed dialog without changing data.

## Styling

Reuse existing CSS variables, font, borders, surfaces, and responsive breakpoints. Native inputs and selects receive the same visual treatment as current fields. The popup uses the detail panel surface in both themes. No external assets or dependencies are added.

## Verification

Automated checks will prove:

- exactly 120 deterministic records exist;
- each unit/category/status allocation matches the table above;
- summing Units A-D reproduces every `All` total and displayed percentage;
- selecting `All` reproduces the original aggregate values and a single internally consistent first page;
- unit/date/theme survive forward and back navigation transitions;
- cards use their current percentage as the gradient split and only arrows link to details;
- Actions is absent and all other table columns remain;
- every unit detail summary, footer, and row subset matches the dashboard selection;
- the five popup fields appear in exact order and opening/closing does not mutate records;
- Fleet Overview has positive separation from every category card and each vehicle image remains contained without cropping;
- the existing light/dark and direct-file behavior still work.

