# Replacement reference update

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
