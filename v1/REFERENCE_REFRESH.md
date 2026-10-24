# Replacement reference update

Latest refinement: Fleet Overview is static overall-fleet data and no longer changes on card-body clicks. Dashboard cards have no selected state or selection border; only arrows navigate. Vehicle artwork is contained within every card to prevent overlap with the Fleet Overview heading. Fleet Status now uses the reference text `Unavailable`. Existing data and calculations remain unchanged.

Latest refinement: the section heading is now `Fleet Overview`, and its internal period/date selector is removed for both Option 1 and Option 2. Option 2 retains the `option2.png` overview design; recorded chart dates and the existing dashboard-level date filter remain unchanged.

Latest refinement: the complete Overall Fleet Overview now follows `esnaad_style/option2.png`, including the selected category/total subtitle, serviceability KPI and previous-day delta, green trend styling, Fleet Status donut labels and legend tiles, and colored Key Insight rows. These sections remain driven by the selected card and existing data; no dashboard values or 20–22 October records were changed.

Latest refinement: Option 2 now follows `esnaad_style/option2.png`, with category-specific light tints, colored title blocks, a centered serviceability ring, separate Available and Total count tiles, and matching dark-theme tints. All existing counts, calculated percentages, filters, and 20–22 October records remain unchanged. This supersedes the count-centered Option 2 ring treatment below.

Latest refinement: Option 2 now keeps serviceability percentage as plain text and centers the numeric available/total count inside the progress ring. The ring arc remains count-derived and uses the Option 2 accent. Light Mode retains the light powder-blue card background and soft-teal selected background so the ring stays clearly visible. This supersedes the percentage-centered ring description below.

Latest refinement: Option 2 uses lighter powder-blue and soft-teal card surfaces in Light Mode, and lifted slate-blue/teal surfaces in Dark Mode. Detail selection/focus outlines are inset so their top edge cannot be clipped by the detail container. This supersedes the darker Option 2 palette described below.

Follow-up on 24 October 2026: Available is removed as a duplicate detail summary card; Serviceability retains the available-record filter. Every percentage now follows count/total rounding, including SUV 30/48 = 63%; the earlier preserved 62% exception is retired. Circular labels use a full-circle centering layer in both renderers. Option 2 now uses solid navy, selected petrol teal, mint rings, and light text. The Fleet Overview subtitle shows only the selected category. All original 20–22 October records remain unchanged.

24 October 2026: serviceability cards now offer Option 1 (the emerald/ice-blue `esnaad_style/CardColor.png` reference) and Option 2 (now refined to count-centered progress rings). The centered landing-header radios select the design for dashboard and detail Serviceability cards. Available / Total text labels are removed; numeric ratios are retained. Card selection updates the trend, status breakdown, and insights; the separate arrow navigates with a reduced-motion-aware slide. The user confirmed using only the existing 20–22 October data, through the selected date, for the trend. No historical records were generated. This supersedes the earlier static trend and card-interaction descriptions. Current checks and browser limitations are recorded in `docs/superpowers/vehicle-serviceability-verification.md`.

Subsequent scrolling correction: detail pages now fill the viewport without page scrollbars. Overflow belongs to the vehicle grid, with sticky column headings and keyboard focus; the summary, filters and pagination remain outside its scroll area. Compact layouts reserve more grid space on phones and short screens. This supersedes the earlier statement that detail pages retain normal scrolling.

Subsequent detail correction: all four detail summary cards now reuse the landing-page vehicle artwork, centered between Serviceability and Available / Total in both themes. This supersedes the earlier removal of detail artwork described below.

Subsequent dashboard correction: the user requested clear centered vehicle images and no dashboard scrollbar, with every displayed value preserved. Standalone transparent vehicle images now replace the screenshot crops. The dashboard fits its full content to the viewport and recalculates on resize; detail views retain scrolling. `tests/fixtures/displayed-text-sha256.json` captures the pre-change text of all ten states and verifies it remains unchanged. Asset sources and extraction prompts are recorded in `prototype/assets/IMAGE_SOURCES.txt`. The paragraphs below describe the preceding reference-refresh revision.

23 October 2026. This update records the user's instruction to redo the existing prototype from the replacement images, remove the Fleet Management heading and displayed Available vehicles / Total vehicles × 100 calculation, and push both repositories.

The ten same-named 1920 by 1080 PNGs currently in `images/` and `images/details/` supersede the original visual sources. All ten now decode completely. In particular, SUV Dark is readable, and the previous mixed-theme strips are absent. Original-source defect statements in the provisional PRD and initial design/plan are historical.

The new references use uniform detail headers, summary cards and tables. Detail vehicle artwork and People Movers thumbnails are removed. Every detail table uses Last Updated; all status selectors display All Status. The old Sedan Clear Filters control is absent. The user-requested theme toggle remains available on every view.

Visible data changes include:

- Sedan CD-5678: 22 Oct 2026 08:50; GH-3456: 22 Oct 2026 08:20.
- Sedan mission labels: Mission #M-1023 and Mission #M-1021.
- Sedan MN-6789: year 2024 in both themes.
- SUV Available: 62% in both detail themes; the main Serviceability value remains 63%.
- Footer wording: Showing 48 suv vehicles and Showing 32 people movers vehicles.
- Four pictured page numbers on each detail view; no unseen page records are generated.

The two removed dashboard lines are explicit user overrides to the replacement images. The Available / Total labels and summary ratios remain. The dashboard header closes the space left by the removed lines. Screenshot-specific vehicle crops and other literal supplied values are preserved rather than synthesized or reconciled.

Runtime packaging remains `prototype/index.html`, `app.js`, `styles.css`, `README.txt` and local `assets/`. It works through classic scripts and relative paths without fetch, modules, a backend or remote resources. The original PRD remains provisional; current implementation and verification are described here and in `docs/superpowers/vehicle-serviceability-verification.md`.

Repository destinations remain `kvdevelopuse/vms_serviceability` for `v1/` and `kvdevelopuse/vms_serviceability_deployed_v1` for the contents of `prototype/` at the repository root. Existing repository history is retained.
