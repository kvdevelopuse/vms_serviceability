# Vehicle serviceability static prototype design

Status: proposed for review. Source: `Vehicle_Serviceability_Prototype_PRD_v0_1.md` and the local `images` and `styling` folders.

Implementation note: the user subsequently instructed proceeding according to the PRD. The delivered prototype and verification record document source exceptions and implementation choices; this design's proposals are not retroactively marked as formal stakeholder approvals.

## Outcome and packaging

Deliver `prototype/index.html`, `prototype/styles.css`, `prototype/app.js`, and local assets. The complete folder must work when copied to a static host, including a subdirectory, and when `index.html` is opened directly using `file://` on Windows. Use relative paths and ordinary deferred scripts; no modules, fetch requests, backend, CDN, package installation, or build step.

## Screens and behavior

Build the dashboard and All Vehicles, Sedan, SUV, and People Movers detail views as HTML. Match the corresponding reference layouts, colors, typography, illustrations, tables, and summary values at 1920 by 1080. Reuse the supplied vehicle imagery. Use CSS theme variables for complete Light and Dark themes.

Each dashboard category opens its detail view. Each detail has a return control. The theme toggle switches the current view and retains the selected theme during navigation. Proposed default: Light Mode, a top-right toggle in the header, and no persistence after reload. No additional product controls or destinations.

Search, status, Clear Filters, pagination, page size, row actions, profile menus, and trend period remain pictured presentation elements without invented behavior. Only visible rows are reproduced; no additional pages, VINs, live dates, calculations, or records are generated.

At smaller viewports, preserve readable content and allow scrolling where necessary. The reference fidelity target remains 1920 by 1080.

## Proposed source decisions requiring user response

Treat the matching ten images in the local `images` folder as the source set. Preserve values separately for each screenshot, including inconsistent category and theme values. This explicitly relaxes cross-screen data consistency where source images conflict.

Remove the stray Light strips above Dashboard Dark and Sedan Dark. Reconstruct clipped layout boundaries using only the visible supplied content. Do not invent unseen chart data or rows.

The SUV Dark file has a valid PNG header but fails full decoding. Recreate that screen using the SUV Light layout and displayed data, with the supplied Dark styling and other detail screens as theme guidance. It cannot claim exact fidelity to the unreadable source.

These decisions resolve Q-001 through Q-005 for implementation if accepted. The user's current request resolves Q-007: a portable static folder with direct local-file support. Q-006 uses 1920 by 1080 browser captures for review; no numerical visual tolerance or stakeholder acceptance is claimed.

## Alternatives considered

Screenshot backgrounds with clickable overlays preserve source pixels but retain clipped content and image artifacts, provide poor text accessibility, and do not solve SUV Dark. A framework adds installation and build requirements without helping this fixed prototype. Plain HTML, CSS, and JavaScript best meets the requested portable delivery.

## Verification

Verify all ten screen/theme states, eight category paths, eight return paths, and both theme directions on each view. Check that switching themes retains the logical screen and that navigation retains the theme. Verify local-file loading and HTTP loading from a subdirectory, all local asset paths, no external runtime dependencies, and no browser console errors. Compare screenshots and displayed data against the source set, documenting the approved source exceptions. Include concise local-opening and hosting instructions with the delivery.

No production integrations, authentication, data storage, exports, or unspecified interactions are included.
