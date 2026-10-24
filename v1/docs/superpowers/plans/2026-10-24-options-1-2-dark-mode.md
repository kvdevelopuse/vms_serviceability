# Options 1 and 2 Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved dark palette consistently to the complete Option 1 and Option 2 application and persist the user's selected theme.

**Architecture:** Keep the existing `data-theme` mechanism and add validated local-storage persistence in `prototype/app.js`. Consolidate the supplied palette into dark-theme custom properties and narrowly scoped Option 1/2 overrides in `prototype/styles.css`; reuse those variables for SVG charts and every interactive state. Extend the existing Node, DOM, and Playwright checks, then capture 1920×1080 screenshots for the landing page and all four details screens under both visible design options.

**Tech Stack:** HTML, CSS custom properties, vanilla JavaScript, Node assertions, JSDOM, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-24-options-1-2-dark-mode-design.md`

## Global Constraints

- Preserve the existing light mode, layout, spacing, typography, data, calculations, labels, behavior, navigation, filters, and vehicle images.
- Apply dark changes only to Options 1 and 2; Option 3 remains hidden and unchanged.
- Use progressive category-color fills for all four Option 1 dark landing cards and the first Serviceability card on every Option 1 dark detail page; retain Option 2 circular progress.
- Use only the exact supplied palette and mappings.
- Do not add decorative gradients, glow effects, patterns, animations, text, icons, or excessive shadows.
- Do not push changes without explicit user approval.

## Review Focus

- Missing, invalid, or inaccessible browser storage must fall back to Light Mode without breaking rendering.
- Theme selection must survive reload and remain active across landing/detail navigation.
- Selected detail cards must retain category/status-colored borders in dark mode.
- Modal edit/view states and disabled controls must remain readable and operable.
- Every Option 1/2 screen at 1920×1080 must avoid document scrollbars, clipped content, and light-surface leakage.

---

### Task 1: Persist validated theme selection

**Files:**
- Modify: `prototype/app.js`
- Test: `tests/dashboard-options-check.cjs`
- Test: `tests/dashboard-options-dom.cjs`
- Test: `tests/dashboard-options-browser.cjs`

**Interfaces:**
- Produces: `THEME_STORAGE_KEY`, `readStoredTheme(storage)`, and `persistTheme(storage, theme)`.
- Preserves: `transition(state, {type: 'toggle-theme'})` and the existing theme-toggle markup.

- [ ] Write failing tests for valid dark restoration, invalid/missing storage fallback to light, storage-write failure tolerance, toggle persistence, reload persistence, and navigation retention.
- [ ] Run the focused Node and DOM tests and confirm they fail because theme state is not persisted.
- [ ] Implement the storage helpers, initialize state from the validated stored theme, and persist immediately after a successful toggle.
- [ ] Run the focused tests and confirm all persistence cases pass.
- [ ] Checkpoint only; do not commit or push.

### Task 2: Apply the approved dark palette to all surfaces and states

**Files:**
- Modify: `prototype/styles.css`
- Modify: `prototype/app.js`
- Test: `tests/dashboard-options-dom.cjs`
- Test: `tests/dashboard-options-browser.cjs`

**Interfaces:**
- Consumes: existing `data-theme="dark"`, `data-design="1|2"`, category/detail classes, and status classes.
- Produces: exact palette variables and dark Option 1/2 styling for landing cards, overview panels, charts, insights, details, tables, controls, modal, and interactive states.

- [ ] Write failing computed-style checks for every supplied palette token and its required surface/text/border/status/category mapping.
- [ ] Write failing chart checks for mint line/points, uniform translucent fill, status colors, grid, and axis labels.
- [ ] Run DOM/browser checks and confirm failure on the current legacy dark colors.
- [ ] Replace only the dark-theme variable values and add narrowly scoped Option 1/2 dark overrides; remove hard-coded legacy dark colors from the affected paths.
- [ ] Extend the existing Option 1 progressive-fill rendering condition to dark mode while leaving Option 2 circular progress unchanged.
- [ ] Replace the trend SVG's decorative gradient with the required theme variables and uniform translucent fill.
- [ ] Add hover, focus, active, selected, and disabled state colors using the supplied control palette.
- [ ] Run Node, DOM, React-regression, and focused browser checks; confirm light-mode assertions remain unchanged.
- [ ] Checkpoint only; do not commit or push.

### Task 3: Verify every 1920×1080 screen

**Files:**
- Modify: `tests/dashboard-options-browser.cjs`
- Create: `.rollback/options-1-2-dark-mode-work/*.png`

**Interfaces:**
- Consumes: final Option 1/2 dark theme and the existing landing/detail routes.
- Produces: repeatable geometry, contrast, palette, and screenshot evidence.

- [ ] Add a focused Playwright mode that opens the dark landing page and all four dark details pages for Options 1 and 2 at 1920×1080.
- [ ] Assert no document scrollbars; all cards, vehicle images, controls, tables, and modal content remain within their containers; required text/control contrast is readable; and no known light surface colors remain.
- [ ] Exercise theme toggle, all summary filters, pagination, modal view/edit/save/cancel/close states, focus, hover, active, and disabled controls.
- [ ] Capture labeled 1920×1080 screenshots for both landing pages and all eight detail combinations.
- [ ] Run the complete project verification plus the focused dark visual suite and inspect every screenshot against `styling/DarkMode.png`.
- [ ] Checkpoint only; do not commit or push.

