# Vehicle serviceability verification — replacement images

## Latest refinement: static overview, no card-selection border

Fleet Overview now remains on All Vehicles when any dashboard card body is clicked. Dashboard cards contain no selection button, selected class, selection outline, or selected surface; arrows remain the sole navigation controls. Option 1 and Option 2 cards both use `overflow: hidden` so vehicle artwork cannot extend into the Fleet Overview heading. Reference text checks cover `Fleet Overview`, `All Vehicles (120 Total)`, `Fleet Status`, `Available`, `On Mission`, `Unavailable`, and all three Key Insight messages. The real-browser geometry journey was attempted with the existing external Playwright installation, but this restricted environment rejected Chromium launch with `spawn EPERM`; the equivalent DOM, render, and CSS containment checks are used here without claiming screenshot-level verification.

A pre-change recovery archive and instructions are stored under `.rollback/static-overview-work`.

## Latest refinement: Fleet Overview heading and date-control removal

The overview heading is now `Fleet Overview`. The overview's internal period/date control is absent in both design options, while the real 20–22 October chart labels and dashboard-level date filter remain intact. Render, DOM, and browser-journey contracts cover both radio options.

A pre-change recovery archive and instructions are stored under `.rollback/fleet-overview-heading-work`.

## Latest refinement: reference-matched fleet overview

The Overall Fleet Overview now mirrors the supplied `option2.png` composition: dynamic title/subtitle, trend KPI and previous-day delta, green recorded-date chart, Fleet Status donut and labeled legend, and colored Key Insights. Render and DOM tests cover All Vehicles plus every selected category, both themes/options, Unit/date changes, saved overlays, status percentages, and the lowest-serviceability All Vehicles insight. The current records remain authoritative, so the real 20 October All Vehicles value remains 61% rather than copying the reference image's illustrative 62%.

The browser journey was retried after this refinement, but Chromium launch was blocked by the environment with `spawn EPERM`; no screenshot or pixel-level verification is claimed.

A pre-change recovery archive and instructions are stored under `.rollback/overview-reference-work`.

## Latest refinement: `option2.png` reference implementation

Option 2 now uses the supplied `esnaad_style/option2.png` as its visual contract: category-specific tinted cards, a centered serviceability ring, distinct Available and Total tiles, colored title icons, and the existing vehicle artwork. Values remain count-derived and unchanged; SUV remains 30 Available of 48 Total and therefore 63%. The standalone and React render tests cover the reference structure, alert-ring state, exact displayed values, theme palettes, detail consistency, and separated selection/navigation controls.

Fresh verification passed the prototype, dashboard-option, React-render, DOM-interaction, and JavaScript syntax checks. A deep comparison against the downloaded baseline confirms every 20–22 October source record is unchanged. Chromium was retried after this implementation but launch was blocked by the environment with `spawn EPERM`; the in-app browser inventory was also empty, so no screenshot or pixel-level claim is made.

A pre-change recovery archive and instructions are stored under `.rollback/option2-reference-work`.

## Latest refinement: count rings in Option 2

Option 2 now renders the serviceability percentage as plain text and centers the numeric available/total count inside the circular progress indicator. The arc remains count-derived and uses the same Option 2 accent color. The powder-blue Light Mode surface and soft-teal selected surface provide clear contrast; the existing lifted slate-blue/teal Dark Mode surfaces remain in use. Standalone and React checks cover dashboard and detail output, absence of the former percentage-ring markup, centered count-ring policy, and accessible count labels.

Fresh verification passed `prototype-check.cjs`, `dashboard-options-check.cjs`, `react-options-check.cjs`, both-theme `dashboard-options-dom.cjs`, JavaScript syntax checks, and a deep comparison of the original 20–22 October snapshots. The real-browser journey was attempted again after this change but Chromium launch was blocked by the environment with `spawn EPERM`; no screenshot or pixel-level claim is made.

A pre-change recovery snapshot is preserved under `.rollback/count-ring-work`.

## Latest refinement: lighter Option 2 and complete selection outlines

Option 2 surfaces are now powder blue / selected soft teal in Light Mode and lighter slate blue / teal in Dark Mode, consistently across standalone and React cards. Palette values and selected/unselected application are checked through computed styles; jsdom retains CSS variable references rather than resolving final background colors. The browser journey checks resolved colors when it can run.

The missing top selection edge was traced to a 3px external outline with a positive offset extending above the detail container's overflow clip. Selection and keyboard-focus outlines now use `outline-offset: -3px` for detail cards, including React, so every edge stays inside the card without changing measurements or allowing page overflow. A failing computed-style check reproduced the external placement before the change; it passes afterward for every detail screen, both themes/options, and all three filters. The existing Node, React and DOM suites pass. Actual browser rendering remains unavailable in this session; no screenshot or pixel-level verification is claimed.

A verified pre-refinement ZIP and rollback instructions are preserved under `.rollback/lighter-card-work`.

## Latest follow-up: centered rings, three-card details, and navy Option 2

At this stage, the circular percentage label filled its circle using an absolute grid layer. The later count-ring refinement above supersedes that presentation while retaining the same centering technique.

The duplicate Available summary card is removed. Detail grids now contain Serviceability, On Mission, and Not Available without an empty fourth slot. Serviceability retains the available-record filter, and the actual Available record status remains in tables and status breakdowns.

The SUV 62% exception has been removed. All displayed percentages now use count / total × 100 rounded to a whole number, including SUV 30/48 = 63%. React percentage override props no longer replace calculated values. A deep comparison against the downloaded baseline confirms that every original 20–22 October source record remains unchanged.

Option 2 now uses navy `#172b42`, selected petrol teal `#07555e`, mint progress `#83ead2`, and light text `#f1f6fb`. Unselected cards share one surface; selection is distinct. Option 1 retains its reference design. Calculated contrast ratios are 13.22:1 for light text on navy, 7.82:1 for light text on teal, 10.04:1 for mint on navy, and 5.94:1 for mint on teal.

All four Node/React/DOM checks and syntax validation passed after this follow-up. The detail-count, ring-centering-policy, and React calculation checks were observed failing before their fixes and passing afterward. A fresh read-only review independently reran all four checks and found no material issues. The actual browser journey was retried and again failed at launch with `spawn EPERM`. Native geometry, optical centering, responsive layout, screenshots, keyboard defaults, and animations remain unverified.

A verified pre-polish snapshot and recovery instructions are preserved in `.rollback/card-polish-work`.

## 24 October 2026: dashboard card designs and selection

The landing header now offers centered Option 1 / Option 2 radio controls. Option 1 uses the emerald/ice-blue reference in `esnaad_style/CardColor.png`; Option 2 uses count-centered progress rings, a common serviceability-card surface, and a selected-card highlight. Both designs carry through to detail Serviceability cards and the controlled React integration components. The Available / Total text labels are removed while numeric ratios remain.

Selecting a category updates its trend, status breakdown, and insights without routing. The separate arrow opens the corresponding detail route with a 260 ms horizontal slide; reduced motion suppresses the slide. Category, design, Unit, date, and theme remain set during navigation. The trend uses only existing 20–22 October snapshots up to the selected date, including saved-record overlays. No historical data was generated.

Verified in this session:

- `node tests/prototype-check.cjs`: passed, including all original data reconciliation, summary filters, pagination, date and storage contracts.
- `node tests/dashboard-options-check.cjs`: passed for validated selection/design state, all four category renderings, both themes/designs, retained numeric ratios, literal snapshot trends, one-date history, and saved overlays.
- `node tests/react-options-check.cjs`: passed using the existing external QA toolchain to render the actual JSX components and exercise separate select/open callbacks.
- `node tests/dashboard-options-dom.cjs`: passed using the existing external jsdom installation. Exercised real application delegated events, card/arrow isolation, theme/design changes, Unit/date retention, all detail destinations, filtering, pagination, and record save/cancel/storage. DOM emulation does not verify layout, native keyboard defaults, or native animation.
- JavaScript syntax checks passed. A deep comparison of every original date snapshot against the downloaded baseline confirmed that source records are unchanged.

Real-browser verification remains unavailable: `node tests/dashboard-options-browser.cjs --legacy-only` failed at Chrome launch with `spawn EPERM`, before any page loaded. No screenshot, geometry, native browser keyboard, or animation pass is claimed. The browser journey is provided for an unrestricted environment, including legacy regression, both designs/themes, header/card geometry at 1920/1366/800/390/320 px, reduced motion, history navigation, and direct-file use. Existing legacy tests were updated only for real snapshot dates, removed fixture labels, and reacquiring cards after selection rerenders them.

A fresh read-only review found one important narrow-header issue at 320 px: the long heading word could spill into the radio group. The computed wrapping-policy test failed before the fix, then passed after adding `overflow-wrap: anywhere`; all available checks passed again. The reviewer found no critical issues or deferred minor findings. Actual mobile geometry and rapid-navigation animation timing remain part of the disclosed real-browser verification gap.

The QA scripts that require installed packages accept `VMS_QA_MODULE_ROOT`, pointing to an existing package directory with jsdom, React, React DOM, TypeScript, and Playwright as applicable. No dependencies were added to the deliverable. The optional browser executable is selected through `VMS_BROWSER_EXECUTABLE`.

The downloaded baseline and original recovery ZIP remain unchanged. A separately verified pre-UI snapshot is stored at `.rollback/dashboard-ui-work/before-ui-changes.zip`. Changes remain local in the standalone project folder.

## Latest detail scrolling correction

Detail pages now use a viewport-height flex layout with shrinking content and table containers. The vehicle grid owns horizontal and vertical overflow; summary cards, filters and pagination remain outside it. Column headings stick inside the grid, and the labeled grid region accepts keyboard focus. Phone and short landscape styles reduce surrounding spacing to leave room for rows.

The Node prototype checks and JavaScript syntax checks pass, preserving all displayed-text hashes. The local-file DOM journey check passes for all eight detail/theme combinations, including computed overflow, shrinking containers, sticky headings, keyboard focus and returns to the dashboard. A headless layout check was attempted, but the environment rejected the browser process with EPERM; pixel layout and actual scrolling geometry remain unverified.

## Earlier dashboard image and viewport correction

The user subsequently requested clearer centered dashboard images, no dashboard scrollbar and no displayed value changes. The dashboard now uses three inspected high-resolution transparent vehicle PNGs, with object-fit contain and centered positioning. All Vehicles composes the same assets. Screenshot crops are no longer runtime dependencies.

Before edits, a text baseline for all ten view/theme states was captured in `tests/fixtures/displayed-text-sha256.json`. After edits, all ten displayed-text hashes match exactly. No summary values, labels, timestamps, table records or chart values changed.

Dashboard-only styles fit the complete layout to the viewport with a scale computed from natural content width/height. Resize and theme/navigation repaints recalculate the fit. Scaling never exceeds 1. Unit checks cover reference, laptop, short and phone viewport dimensions. Page overflow is disabled only while this fitted dashboard is active; detail pages regain normal scrolling. Runtime file and HTTP DOM checks pass. All three vehicle images decode completely, are at least 1500 pixels wide and contain transparent pixels.

No browser provider is available, so pixel-level browser inspection remains unverified. The earlier source-crop checks and runtime PNG-copy assertions below describe the previous revision and are superseded by standalone-image, unchanged-text and viewport-fit checks.

Independent review of the image and fitting changes found no Critical or Important findings. It reran the Node checks, inspected all three images, and confirmed that fit measurements use unscaled dimensions, image boxes reserve height, and the overflow/scale restrictions end on detail navigation. DOM checks additionally exercise the resize handler with controlled content dimensions and check that details restore normal overflow.

23 October 2026. Current scope: rebuild from the ten replacement same-named references, remove the Fleet Management heading and displayed serviceability formula, preserve local/hosted operation, and push both existing repositories.

## Checks completed

- `node tests/prototype-check.cjs`: passed. Checks all ten rendered states, eight category destinations, theme continuity, return navigation, unknown-route fallback, current visible row and column counts, literal updated Sedan and SUV values, removal of the two dashboard lines, relative dependencies, and source-image crop bounds. Both runtime PNGs are compared byte-for-byte with the current dashboard references to prevent publishing stale imagery.
- `node --check prototype/app.js`: passed.
- jsdom loaded the actual entry, script and stylesheet from both a local file and an HTTP subdirectory. Both runs clicked all category and return links in both themes, switched themes in both directions on each view, checked heading/row count/theme continuity/focus, and exercised unknown hash fallback without DOM script or resource errors. jsdom is a temporary QA dependency outside the deliverable.
- All seven prototype files returned HTTP 200 under `/prototype/`. All ten 1920 by 1080 source PNGs and both runtime PNGs fully decoded.
- The updated readable SUV Dark reference was inspected directly. The original unreadable-source fallback no longer applies.
- Independent code review inspected all ten replacement references, confirmed the current visible data and crop regions, and reran the Node check and syntax validation. No Critical or Important findings remained. Browser layout and pixel fidelity remain outside the verified results.

## Current reference handling

The latest source set governs the layout and visible data. Source-specific values remain literal: SUV has 63% Serviceability and 62% Available; Sedan MN-6789 has year 2024 in both themes; updated times and mission labels follow the new Sedan images. No unseen records, calculated percentages or additional interactions are introduced.

The explicit user instruction removes the heading and formula even though both remain visible in the replacement dashboard screenshots. Available / Total summary labels remain. Dashboard vehicle illustrations retain the supplied images' own cropping. Detail illustrations and thumbnails are absent in the replacement references and are removed.

The page still starts in Light Mode, retains theme while navigating and resets on reload. Filters, page controls, menus and the period selector remain presentation elements. All runtime files are self-contained and use relative paths and classic scripts.

## Limits

The browser inventory remains empty. No real-browser screenshots or pixel comparison could be performed; DOM checks do not measure CSS layout. Pixel-perfect browser fidelity and formal stakeholder acceptance are not claimed. Earlier reports of corrupt SUV Dark and mixed-theme strips refer only to the original source set and are superseded by the current readable replacements.

## Publication

The user authorized updating `kvdevelopuse/vms_serviceability` with `v1/` and `kvdevelopuse/vms_serviceability_deployed_v1` with the prototype's contents at the root. Both existing histories are preserved; publication uses ordinary commits and pushes without force.
