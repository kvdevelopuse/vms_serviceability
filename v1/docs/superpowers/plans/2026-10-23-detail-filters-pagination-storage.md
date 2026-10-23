# Detail Filters, Pagination, and Storage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add functional detail-card filters, ten-row pagination, date-specific localStorage popup edits, and Serviceability-only gradient styling.

**Architecture:** Derive effective records from immutable date snapshots plus a localStorage edit overlay. Keep filter and page in the existing state reducer so every triggering change resets pagination predictably.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, browser localStorage, Microsoft Edge headless integration test.

**Spec:** `v1/docs/superpowers/specs/2026-10-23-detail-filters-pagination-storage-design.md`

## Global Constraints

- Preserve original and historical source records.
- Key stored edits by selected date and vehicle identifier.
- Keep ten records per page and preserve row double-click.
- Apply percentage fill only to Serviceability.
- Do not push or deploy without **Push to my repo**.

## Review Focus

- Saved edits must affect only one vehicle/date and survive storage rehydration.
- Filters and pagination must use effective saved statuses without duplicates or omissions.
- Filter, Unit, date, and screen changes must reset page 1.
- Previous/Next must clamp at page boundaries and report current/total pages.
- Non-Serviceability cards must retain theme surfaces while active indication remains visible.

---

### Task 1: Immutable records and localStorage overlay

**Files:**
- Modify: `v1/tests/ui-refinements-check.html`
- Modify: `v1/prototype/app.js`

- [ ] Add failing assertions for immutable snapshots, date/vehicle storage keys, persisted fields, date isolation, and storage rehydration.
- [ ] Run Edge and confirm the storage assertion fails.
- [ ] Add validated storage loading, effective-record overlay, and persistence on Save.
- [ ] Run Edge and confirm storage assertions pass.
- [ ] Commit locally.

### Task 2: Summary-card filters and pagination

**Files:**
- Modify: `v1/tests/ui-refinements-check.html`
- Modify: `v1/prototype/app.js`
- Modify: `v1/prototype/styles.css`

- [ ] Add failing assertions for each card filter, active state, ten-row pages, Previous/Next boundaries, continuity, resets, and later-page double-click.
- [ ] Run Edge and confirm filter/pagination assertions fail.
- [ ] Add filter/page transitions, button cards, filtered record selection, and Previous/Next controls.
- [ ] Run Edge and confirm filter/pagination assertions pass.
- [ ] Commit locally.

### Task 3: Serviceability-only styling and regression

**Files:**
- Modify: `v1/tests/ui-refinements-check.html`
- Modify: `v1/tests/prototype-check.cjs`
- Modify: `v1/prototype/app.js`
- Modify: `v1/prototype/styles.css`
- Modify: `v1/prototype/README.txt`

- [ ] Add failing assertions that only Serviceability has the percentage gradient in light and dark themes.
- [ ] Run Edge and confirm the styling assertion fails.
- [ ] Restore original surfaces for other cards, add non-color active indication, and update documentation/static checks.
- [ ] Run the complete Edge suite, inspect responsive layouts, and review the complete diff.
- [ ] Commit and sync validated files into the standalone `v1` folder without pushing.
