# Dashboard card options and selection

## Latest refinement: static Fleet Overview and contained artwork

The latest instruction removes dashboard card selection. Card bodies do not change Fleet Overview, emit selection state, or receive a selection border/surface; only their arrow controls navigate to details. Fleet Overview always represents All Vehicles for the active Unit/date and retains the `option2.png` text/layout treatment. Vehicle artwork is clipped inside every card to prevent overlap with the Fleet Overview heading. The Fleet Status legend text is `Available`, `On Mission`, and `Unavailable`, matching the reference. This supersedes the earlier category-driven overview behavior below.

## Latest refinement: Fleet Overview heading and no internal date control

The section heading is **Fleet Overview**. Its trend date/period control is removed for both Option 1 and Option 2; recorded dates remain visible on the chart and the existing dashboard-level date filter remains unchanged. Selecting Option 2 retains the `option2.png` overview composition and styling.

## Latest refinement: reference-matched fleet overview

The complete Overall Fleet Overview now follows `esnaad_style/option2.png`: selected category and total in the subtitle, a count-derived serviceability KPI with previous-day delta, a green three-date trend with visible point labels, a Fleet Status donut with slice percentages and compact legend tiles, and three colored Key Insight rows with arrows. All panels remain driven by the selected card, Unit, date, and saved overlays. For All Vehicles, the first insight identifies the lowest-serviceability category; for an individual selection it reports that category. No source records or calculations change.

## Latest refinement: implement `option2.png`

Option 2 now follows `esnaad_style/option2.png`: category-specific blue, amber, violet, and mint card tints; a large count-derived serviceability ring with the percentage and Serviceable label centered; separate Available and Total count tiles; a colored title icon block; existing vehicle artwork; and the arrow retained as a separate navigation control. The same visual structure applies to detail serviceability cards and React integration components. Existing values, calculations, filters, and 20–22 October snapshots do not change. The separate tile captions supersede the earlier count-centered ring treatment while the combined “Available / Total” heading remains absent.

## Latest refinement: count-centered Option 2 rings

Option 2 keeps the count-derived serviceability percentage as plain text and moves the numeric available/total ratio into the circular progress indicator. The count is centered on both axes, and the ring arc still represents available / total using the existing Option 2 accent color. Light Mode cards retain the light powder-blue surface and soft-teal selected surface so the indicator stays clearly visible. This supersedes the earlier percentage-centered ring behavior below.

## Latest refinement: lighter surfaces and visible selection edges

Option 2 now uses powder blue `#e6eef8` with selected soft teal `#d1ebe3` in Light Mode, and lighter slate blue `#2b4963` with teal `#286865` in Dark Mode. Both implementations use theme-specific palette variables and retain the common unselected surface. This supersedes the darker palette below.

Detail-card selection/focus outlines are drawn 3px inside the card. The earlier external outline could extend above the `.detail` container and be clipped by its `overflow: hidden`. Keep the overflow layout and card measurements; correct the outline placement for all three detail filters in both options/themes and React.

## Confirmed follow-up: card polish

The latest user instruction supersedes the earlier four-card detail summary and percentage-override preservation:

- Center every circular percentage on both axes in standalone and React cards, across dashboard and detail screens. The label uses a full-circle absolute grid layer, independent of inherited text alignment and line spacing.
- Remove the duplicate Available summary card; keep Serviceability, On Mission, and Not Available. Serviceability continues filtering Available records. Keep the actual Available status in records, tables, and status breakdowns.
- Compute all displayed percentages from counts, rounded to whole numbers, with 0% for zero total. Remove the SUV 62% exception: 30/48 rounds to 63%. React percentage override props no longer replace count-based calculations.
- Option 2 uses solid navy `#172b42`, selected petrol teal `#07555e`, mint progress `#83ead2`, light text `#f1f6fb`, and restrained borders/shadows. Keep one background for unselected cards; retain Option 1's reference styling. This palette is the implementation choice requested by the user.
- Fleet Overview's subtitle shows only the selected category.

## Requested result

Apply the supplied `esnaad_style/CardColor.png` reference to serviceability cards, offer two dashboard designs, and make card selection drive the overview. Preserve the current data, calculations, filters, record editing, themes, and numeric available/total ratios. Remove only the `Available / Total` text labels from dashboard cards and detail serviceability cards.

## Approach

Extend the existing standalone JavaScript renderer, CSS, and exported React card components. Reuse the aggregation functions, snapshots, hash navigation, and existing summary filters. No new packages or framework migration are needed. Separate duplicated dashboards would make data and interaction behavior harder to keep consistent; rebuilding the standalone dashboard in React would exceed the requested scope.

## Proposed behavior

- Place native radio controls labeled **Option 1** and **Option 2** horizontally at the center of the landing header, on the heading/date row. Preserve the existing Unit, theme, and identity controls.
- Default to Option 1 and All Vehicles. Retain the chosen design and selected category while navigating, switching themes, or changing Unit/date. Reload uses the existing reset behavior, including the new defaults; do not introduce storage settings.
- Option 1 follows the reference's rounded card, emerald gradient, pale ice-blue remainder, restrained border, and dark percentage typography. The proportional split uses the existing percentage. Retain vehicle art, category titles, numeric ratios, and arrow controls. Keep the reference treatment legible in both themes without changing unrelated screen styling.
- Option 2 uses a circular progress indicator for the available/total count while the existing serviceability percentage remains plain text. All serviceability cards use a common theme-appropriate background; the selected dashboard card has a visible highlight. Apply the chosen option to each detail screen's main serviceability card as well. Preserve the Serviceability, On Mission, and Not Available summary filters and their existing behavior.
- Clicking a dashboard card selects its category and refreshes Serviceability Trend, Vehicles by Status, and Key Insights using the current Unit/date and saved-record overlays. Selection does not navigate. Support keyboard selection with Enter/Space, visible focus, and a selected-state announcement.
- Keep each arrow as a separate accessible navigation control. Arrow interaction must not trigger the card-selection handler. Navigate to the corresponding existing detail route with a short horizontal slide. Respect reduced-motion preferences; preserve browser Back/Forward, theme, Unit/date, and the selected design.
- Keep the React integration components consistent through optional controlled design/selection props and callbacks. Leave routing, storage, and dashboard aggregation in their existing owners.

## Confirmed trend data

The current trend is a fixed illustrated line covering 1–22 October, rather than a recorded time series. Existing records contain only 20, 21, and 22 October 2026.

The user confirmed on 24 October: **use existing data for 20–22 October**. Render the recorded daily percentage for the selected Unit and category on available dates up to and including the selected dashboard date. Use the existing aggregation calculation and saved edits. Show one point when only one date qualifies. Label the actual dates rather than implying a full month of recorded history. Do not fabricate missing days or show future snapshots.

## Verification

Extend the existing checks to cover both options, all four category selections, both themes, Unit/date changes, retained selection/design through navigation, label removal with numeric ratios retained, category-specific trend/status/insights, keyboard selection, arrow isolation, and reduced motion. Rerun data reconciliation, filtering, pagination, and saved-record checks. Inspect actual browser rendering if the local browser tooling can launch; disclose any unavailable visual checks.

## Recovery and scope

Keep the existing `.rollback` recovery material and downloaded repository unchanged. Preserve a snapshot of the updated baseline before implementation. Do not publish or push changes, add dependencies, alter source snapshots, or make unrelated visual changes.
