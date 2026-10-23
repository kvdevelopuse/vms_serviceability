# Unit Filter, Date Selection, and Record Popup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reconciled 120-record unit dataset, retained unit/date controls, proportional card colors, corrected detail tables, a non-saving row popup, and the Fleet Overview overlap fix.

**Architecture:** Keep the existing no-dependency single-page application. Add fixed record construction and aggregation functions to `prototype/app.js`, render all new behavior from the existing in-memory state, and reuse theme variables in `prototype/styles.css`. Use browser integration checks in the existing test page because the prototype's JavaScript runtime is the browser and Node is unavailable in this environment.

**Tech Stack:** HTML, CSS, browser JavaScript, native `<select>`, `<input type="date">`, and `<dialog>`.

**Spec:** `docs/superpowers/specs/2026-10-23-unit-filter-date-and-record-popup-design.md`

## Global Constraints

- Preserve `All`: 120 total, 84 Available, 24 On Mission, 12 Not Available.
- Preserve category totals: Sedan 40, SUV 48, People Movers 32.
- Use exactly 120 fixed, unique records with no random values.
- Units A-D must reconcile exactly to `All`; displayed percentages use existing whole-number rounding.
- Date changes never filter or recalculate vehicle data.
- Popup edits never mutate the dataset and add no save behavior.
- Keep card navigation on arrow anchors only and preserve both themes.
- Make only the required Fleet Overview spacing/image-containment adjustment.

## Review Focus

- Repeated unit switching returns exactly to the original `All` aggregates.
- Unit/category subsets with zero records in a status still calculate and render correctly.
- Date changes survive hash navigation without changing Last Updated cells.
- Dialog open/close and theme repaint do not mutate records or selected unit/date.
- Narrow and short viewports keep vehicle art inside cards and Fleet Overview below the card grid.

---

### Task 1: Fixed Dataset, Aggregates, and State

**Files:**
- Modify: `prototype/app.js`
- Modify: `tests/ui-refinements-check.html`

**Interfaces:**
- Produces: `vehicleRecords`, `aggregateFor(unit, screen)`, `recordsFor(unit, screen)`, and `transition(state, action)` actions `set-unit`, `set-date`, `open-record`, and `close-record`.
- Consumes: the allocation matrix and original `All` values in the approved spec.

- [ ] **Step 1: Extend the browser check with assertions for 120 unique records, exact unit/category/status reconciliation, percentage rounding, and state retention.**
- [ ] **Step 2: Run Edge headless against `tests/ui-refinements-check.html` and verify the new assertions fail because the dataset and transitions do not exist.**
- [ ] **Step 3: Add the fixed allocation/templates, deterministic 120-record builder, aggregation helpers, and state transitions to `prototype/app.js`.**
- [ ] **Step 4: Run the browser check and verify all Task 1 assertions pass.**

### Task 2: Dashboard, Detail Data, and Popup Behavior

**Files:**
- Modify: `prototype/app.js`
- Modify: `tests/ui-refinements-check.html`

**Interfaces:**
- Consumes: `aggregateFor(unit, screen)`, `recordsFor(unit, screen)`, and the retained state from Task 1.
- Produces: dashboard Unit/date controls, selected-unit summaries and rows, Actions-free tables, and the native dialog lifecycle.

- [ ] **Step 1: Add browser assertions for the exact Unit options/default, date input, retained navigation state, matching dashboard/detail aggregates, arrow-only navigation, Actions removal, and the five popup fields in exact order.**
- [ ] **Step 2: Run the browser check and verify those assertions fail for the missing UI and behavior.**
- [ ] **Step 3: Render the dashboard controls and dynamic cards, the disabled detail Unit control, selected date, filtered first-page rows/footer, and dialog markup. Wire `change`, `dblclick`, Escape, and backdrop closing through the existing delegated event model.**
- [ ] **Step 4: Run the browser check and verify all Task 2 assertions pass in light and dark themes without data mutation.**

### Task 3: Proportional Colors and Layout Correction

**Files:**
- Modify: `prototype/styles.css`
- Modify: `tests/ui-refinements-check.html`
- Modify: `prototype/README.txt`

**Interfaces:**
- Consumes: card percentage custom properties and dialog/control classes from Task 2.
- Produces: horizontal green/red card splits, themed controls/dialog, and contained vehicle art with explicit Fleet Overview separation.

- [ ] **Step 1: Add browser assertions for each card's percentage custom property/linear gradient, dialog/control theme styling, non-overlapping card-grid/overview rectangles, and contained vehicle-image rectangles.**
- [ ] **Step 2: Run the browser check and verify the styling/layout assertions fail.**
- [ ] **Step 3: Add the minimal CSS for card gradients, form controls, dialog, positive grid/overview spacing, and image containment without changing unrelated styling.**
- [ ] **Step 4: Update `prototype/README.txt` to document unit/date behavior, the 120 fixed records, the non-saving dialog, and presentation-only pagination.**
- [ ] **Step 5: Run the complete headless browser check in light and dark themes and inspect the final DOM result for `PASS`.**
- [ ] **Step 6: Run `git diff --check` in both sibling repository checkouts after any requested synchronization; this source folder itself is not a Git checkout.**

