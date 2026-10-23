# Card, Unit Field, and React Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve card surfaces, provide a disabled detail Unit field, and add ERP-neutral React components while preserving the standalone prototype.

**Architecture:** Keep the standalone HTML/CSS/JavaScript prototype as the executable reference. Add scoped, props-driven React components beside it so an ERP can import the UI without inheriting prototype routing, state, storage, or data-generation code.

**Tech Stack:** HTML, CSS, JavaScript, React function components with JSX; no added dependencies.

**Spec:** `docs/superpowers/specs/2026-10-23-card-unit-react-integration-design.md`

## Global Constraints

- Preserve existing data and behavior.
- Do not assume ERP architecture or add dependencies.
- Do not commit, push, or deploy without explicit authorization.

## Review Focus

- Light and Dark Mode card text must remain readable.
- Only Serviceability may retain a percentage gradient on detail screens.
- The disabled Unit text must match the dashboard selection and remain non-editable across repaints.
- React component styles must remain scoped and avoid global selectors.
- React components must contain no router, API, storage, or global-state dependencies.
- React detail cards must accept preserved displayed percentages and stay contained at a 390px host width.

---

### Task 1: Professional card surfaces

**Files:**
- Modify: `prototype/styles.css`
- Modify: `tests/ui-refinements-check.html`

- [ ] Add failing computed-style checks for distinct, non-transparent status surfaces and restrained card shadows in both themes.
- [ ] Run the Edge integration suite and confirm the new checks fail.
- [ ] Add theme tokens and card-only CSS that satisfies the checks without changing layout.
- [ ] Run the full Edge integration suite.

### Task 2: Disabled detail Unit input

**Files:**
- Modify: `prototype/app.js`
- Modify: `tests/prototype-check.cjs`
- Modify: `tests/ui-refinements-check.html`

- [ ] Replace select expectations with a disabled text-input contract, a repaint check, and a dashboard Unit change sequence.
- [ ] Run the Edge suite and confirm failure.
- [ ] Add the disabled detail input without changing data filtering.
- [ ] Run the full Edge integration suite.

### Task 3: React integration components

**Files:**
- Create: `react/VehicleServiceabilityComponents.jsx`
- Create: `react/vehicle-serviceability.css`
- Create: `react/README.md`
- Modify: `tests/prototype-check.cjs`

- [ ] Add static contract checks for exported components, scoped styles, and absence of API/router/storage dependencies.
- [ ] Create props-driven Unit, fleet-card, and detail-summary components.
- [ ] Document prop contracts and the ERP-specific inputs still required.
- [ ] Review JSX and run every available project check.

### Task 4: Final verification and local sync

- [ ] Run the Edge integration suite from the isolated worktree.
- [ ] Review the complete diff for unrelated changes and whitespace errors.
- [ ] Obtain independent code review and fix material findings.
- [ ] Copy validated files into the local `v1` folder and verify hashes.
- [ ] Confirm both repository checkouts and remote branches remain unchanged.
