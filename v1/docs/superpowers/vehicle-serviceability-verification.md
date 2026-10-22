# Vehicle serviceability verification — replacement images

## Latest dashboard image and viewport correction

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
