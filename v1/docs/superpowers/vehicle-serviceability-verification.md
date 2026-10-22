# Vehicle serviceability verification

Date: 23 October 2026. Deliverable: `v1/prototype/`.

## Verified

- `node tests/prototype-check.cjs` passes. Exercises all ten view/theme combinations, eight category journeys, return and theme transitions, literal row counts and source data, invalid route fallback, local assets, and guarded illustration boundaries.
- `node --check prototype/app.js` passes.
- An additional jsdom check loaded the actual index, classic script and stylesheet using both a local `file://` URL and `http://127.0.0.1:8765/prototype/index.html`. It clicked all category links and Back controls in both themes, switched themes in both directions on each screen, checked headings/row counts/theme continuity/focus, and exercised invalid hash fallback. Both runs passed without DOM script or resource errors. jsdom was installed only in a temporary QA directory; it is not a prototype runtime dependency.
- Every deliverable file was requested successfully over HTTP from the `/prototype/` subdirectory. All six runtime PNG assets fully decoded with Pillow.
- Independent code review compared visible table data against the nine readable 1920 by 1080 references. It confirmed the visible rows, including the Sedan Light/Dark year difference.
- The review identified Dark dashboard vehicle crop regions containing baked-in controls, and a Dark All illustration containing a card border. Crop bounds were trimmed and the source-boundary regression check passed. People Movers summary capitalization was aligned with the 1920 reference.

## Scope and source rulings

- Preserve values independently for each supplied screen, including conflicting plates/models, years, mission labels, counts and percentages. Do not reconcile them or fill unseen pages.
- SUV Dark cannot be decoded. Its implementation uses SUV Light data with the shared Dark styling. Exact source fidelity for this state cannot be established.
- Omit stray Light image strips above Dashboard Dark and Sedan Dark in the HTML reconstruction. Do not fabricate additional unseen rows or time-series data.
- Initial theme is Light, the toggle is in the header, and reload resets it. The PRD did not specify those details; no persistence is added.
- Pictured filters, menus and pagination remain presentation elements. Category navigation, return navigation and theme switching are the implemented actions.

These rulings and exceptions are documented implementation choices, not formal approval of the PRD's open decisions.

## Verification limits

The browser inventory was empty. Attempting to create an in-app browser returned `Browser is not available: iab`. Therefore no browser-rendered 1920 by 1080 screenshots, pixel comparisons, or real-browser local-file interaction tests could be run. DOM checks validate behavior and resource loading; they do not measure CSS layout or browser-specific rendering. Pixel-perfect equivalence, AC-001/005/006 completion and stakeholder acceptance are not claimed.

## Repository handoff

The user requested the whole `v1` folder be pushed to `https://github.com/kvdevelopuse/vms_serviceability.git`. The remote was inspected and was empty. A separate clone is used to publish only `v1/`; unrelated neighboring folders are excluded. The self-contained hosting folder is `v1/prototype/`.
