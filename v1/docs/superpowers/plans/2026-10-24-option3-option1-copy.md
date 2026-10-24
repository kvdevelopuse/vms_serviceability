# Option 3 Using Option 1 Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a distinct Option 3 selection that renders and behaves exactly like Option 1 on landing and detail screens.

**Architecture:** Keep Option 3 as `designOption="3"` in state and add its radio control. Reuse the existing non-Option-2 rendering and CSS path, so no Option 1 markup or styles are duplicated.

**Tech Stack:** HTML, CSS, JavaScript, React JSX, Node assert/jsdom checks.

**Spec:** `docs/superpowers/specs/2026-10-24-option3-option1-copy-design.md`

## Global Constraints

- Option 3 must match Option 1 on landing and detail screens.
- Option 1 and Option 2 must remain unchanged.
- Preserve all data, values, labels, interactions, filters, themes, and navigation.
- Add no dependencies, copied styling, or unrelated changes.

## Review Focus

- Option 3 remains selected across dashboard/detail navigation.
- Option 3 remains selected after unit, date, filter, and theme changes.
- Option 3 markup contains no Option 2-only rings, statistics, labels, or columns.
- Option 3 and Option 1 computed styling match in both themes.
- Invalid design values remain rejected.

---

### Task 1: Add Option 3 as an Option 1 alias

**Files:**
- Modify: `tests/dashboard-options-check.cjs`
- Modify: `tests/dashboard-options-dom.cjs`
- Modify: `tests/dashboard-options-browser.cjs`
- Modify: `tests/react-options-check.cjs`
- Modify: `prototype/app.js`
- Modify: `prototype/styles.css` (narrowest-viewport header fit only)

**Interfaces:**
- Consumes: existing `designOption` string state and the current Option 1 render path.
- Produces: accepted `designOption="3"` state and a third dashboard radio whose output matches Option 1.

- [x] **Step 1: Create a rollback archive containing every file modified by this task.**
- [x] **Step 2: Add failing checks for Option 3 acceptance, radio rendering, navigation retention, Option 1-equivalent prototype/React markup, and Light/Dark computed-style parity.**
- [x] **Step 3: Run the focused Node checks and confirm failure because Option 3 is currently rejected and its radio is absent.**
- [x] **Step 4: Extend the accepted design values and radio list from `['1', '2']` to `['1', '2', '3']`; leave every Option 2 predicate unchanged so Option 3 uses Option 1 automatically.**
- [x] **Step 5: Run the prototype, DOM, React, and focused Option 3 browser checks and confirm all pass.**
- [x] **Step 6: Verify the modified files are recoverable from the rollback archive and stylesheet backup; no React production component changes were needed.**
