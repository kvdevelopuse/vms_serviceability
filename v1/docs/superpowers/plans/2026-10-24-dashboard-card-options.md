# Dashboard Card Options Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add the requested reference/circular card options and category-driven dashboard panels while preserving the existing fleet behavior.

**Architecture:** Extend existing rendering, transition state, and delegated events in `prototype/app.js`; reuse aggregation and date snapshots. Keep card styles in the existing stylesheets and mirror the controlled card presentation in the React exports.

**Tech Stack:** Existing JavaScript, CSS, SVG, Node checks, and React components. No additional dependencies.

**Spec:** `docs/superpowers/specs/2026-10-24-dashboard-card-options-design.md`

## Global Constraints

- Use existing data for 20–22 October; no generated history or future-date points.
- Preserve source records, calculations, Unit/date filters, pagination, record storage, and both themes.
- Remove Available / Total labels; retain numeric ratios.
- Keep design selection across relevant dashboard/detail cards and navigation.
- Preserve `.rollback`; do not publish or push.

## Review Focus

- Arrow clicks/keypresses must not select the enclosing card or trigger duplicate actions.
- Selecting 20 October must produce a usable single-point chart without future data.
- Rapid route changes and reduced motion must remain usable without animation races.
- Header controls must not overlap at laptop/mobile widths; card content must remain legible.
- Detail filters must retain their current behavior under either design.

### Task 1: Card selection and real snapshot panels

**Files:** Modify `prototype/app.js`, `tests/prototype-check.cjs`; create `tests/dashboard-options-check.cjs`.

**Interfaces:** `transition(state, action)` gains validated `select-category` and `set-design` actions; view state defaults to selectedCategory `all` and designOption `1`. `trendData(unit, category, date)` returns `{date, percent}` points derived from existing snapshots, through the selected date.

- [x] Write and run failing checks for category selection without route change, invalid-action rejection, retained state, and literal expected SUV trend values `[56, 67, 63]`.
- [x] Implement the transition and render changes, card selection event handling, native option controls, and category-aware trend/status/insights.
- [x] Update checks intentionally superseded by label removal and dynamic chart dates; run both Node checks and JavaScript syntax validation.

### Task 2: Reference and circular presentation

**Files:** Modify `prototype/styles.css`, `prototype/app.js`, `react/VehicleServiceabilityComponents.jsx`, `react/vehicle-serviceability.css`, `react/README.md`.

**Interfaces:** Root `data-design` controls standalone presentation. React `FleetCard` accepts optional `designOption`, `selected`, and `onSelect`; `DetailSummaryCards` accepts `designOption`. All defaults preserve Option 1. Option changes never modify records or filters.

- [x] Add failing rendered behavior checks for both designs, removed labels with retained ratios, single selected dashboard card, and Option 2 detail presentation.
- [x] Match the emerald/ice-blue reference using native CSS; render circular percentages in Option 2 with consistent card backgrounds and selected-card highlights. Align centered radios with heading/date. Keep existing status-card styling.
- [x] Add horizontal route transitions with reduced-motion support and separate card/arrow keyboard behavior. Mirror the applicable props and styles in React.
- [x] Run the Node checks and syntax validation.

### Task 3: Browser regression and delivery

**Files:** Modify `tests/ui-refinements-check.html`, `prototype/README.txt`; create `tests/dashboard-options-browser.cjs`.

- [x] Add a browser journey that fails on missing card/option interaction, covers both themes/designs, retained Unit/date/category, arrow isolation, all detail destinations, actual circle styles, reduced motion, real snapshots, and header/card geometry at reference/laptop/mobile widths.
- [ ] Real-browser regression and screenshots: attempted, but Chrome launch is blocked with spawn EPERM. Both Node checks, actual React rendering, DOM interaction checks, and syntax validation pass; native geometry/keyboard/animation remain unverified.
- [x] Fresh review completed. Fixed the important 320 px heading-overflow finding with a failing computed-style check followed by a passing check and the full available suite. No critical or deferred minor findings; native browser verification remains unavailable. Changes remain local.

## Execution notes

This project folder is not a Git repository. Work in the requested folder; use a verified ZIP as the baseline instead of Git-specific worktree/commit helpers. Record task progress and rulings in `.rollback/dashboard-ui-work/progress.md` and retain that record because no commit history is available here.

### Follow-up: ring alignment, three-card summary, and Option 2 palette

**Files:** Existing standalone/React renderers and styles, existing Node/DOM/React/browser checks, and integration documentation.

- [x] Preserve a verified pre-polish ZIP in `.rollback/card-polish-work`.
- [x] Watch the detail-count check fail on four instead of three cards, the computed-label check fail on relative positioning, and React rendering fail on an incorrect 62% override.
- [x] Remove Available summary rendering and resize grids to two status columns; calculate React percentages from counts; remove the standalone reference exception.
- [x] Center ring labels with a full-circle grid layer and apply solid navy/petrol/mint Option 2 surfaces in both renderers.
- [x] Run all four available checks and extend real-browser geometry checks for ring centers. Verify palette text/progress contrast exceeds 4.5:1.
- [x] Complete a fresh read-only review and final regression run: no material findings; all four available checks and syntax validation pass. Browser execution was retried and is still blocked by `spawn EPERM`.

Follow-up progress and recovery instructions are kept in `.rollback/card-polish-work`.
