# Historical Data and Editable Popup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three reconciled date snapshots, editable popup persistence, standardized date text, and proportional detail-card backgrounds.

**Architecture:** Keep a date-keyed in-memory record store and derive all aggregates from the selected snapshot. Render popup state with native controls and explicit view/edit actions; reuse CSS custom properties for proportional backgrounds.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Microsoft Edge headless integration test.

**Spec:** `v1/docs/superpowers/specs/2026-10-23-historical-popup-edit-design.md`

## Global Constraints

- Preserve 22-Oct-2026 reference records and aggregates exactly.
- Support only 20-Oct-2026, 21-Oct-2026, and 22-Oct-2026.
- Use fixed data and reconcile every date across Units A-D.
- Do not push or deploy without the exact instruction **Push to my repo**.

## Review Focus

- A historical date plus individual Unit must use the same records on dashboard and detail screens.
- Save must alter only the selected date snapshot and immediately recalculate affected cards.
- Cancel and Close must never mutate records.
- 0% and 100% percentage cards must render valid gradient endpoints.
- Every visible date must use `dd-MMM-yyyy` while native controls retain ISO values.

---

### Task 1: Historical snapshots and date formatting

**Files:**
- Modify: `v1/tests/ui-refinements-check.html`
- Modify: `v1/prototype/app.js`

- [ ] Add failing browser assertions for supported dates, exact reference aggregates, historical reconciliation, visible differences, Unit/date integration, and formatted dates.
- [ ] Run Edge and confirm the historical-data assertion fails.
- [ ] Add explicit historical allocation matrices, date-keyed record snapshots, date-aware aggregation, and `dd-MMM-yyyy` formatting.
- [ ] Run Edge and confirm the historical/date assertions pass.
- [ ] Commit the task.

### Task 2: Popup view/edit/save/cancel

**Files:**
- Modify: `v1/tests/ui-refinements-check.html`
- Modify: `v1/prototype/app.js`
- Modify: `v1/prototype/styles.css`

- [ ] Add failing browser assertions for default view mode, button visibility, Modify, Cancel restoration, Save persistence, aggregate updates, and snapshot isolation.
- [ ] Run Edge and confirm the popup-mode assertion fails.
- [ ] Render the popup controls and action buttons, handle mode changes, and mutate only the selected snapshot on Save.
- [ ] Run Edge and confirm popup assertions pass.
- [ ] Commit the task.

### Task 3: Detail percentage backgrounds and regression pass

**Files:**
- Modify: `v1/tests/ui-refinements-check.html`
- Modify: `v1/prototype/app.js`
- Modify: `v1/prototype/styles.css`
- Modify: `v1/prototype/README.txt`

- [ ] Add failing assertions that every percentage detail card uses the shared gradient with the displayed split, including 0% and 100% rendering helpers.
- [ ] Run Edge and confirm the detail-gradient assertion fails.
- [ ] Apply percentage CSS variables to summary cards using the existing dashboard colors and update documentation.
- [ ] Run the full Edge suite and confirm all assertions pass with clean browser output.
- [ ] Commit locally, review the diff, and sync validated files to the standalone `v1` folder without pushing.
