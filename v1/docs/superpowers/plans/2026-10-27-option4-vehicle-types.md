# Option 4 Vehicle Types Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visible, white-only Option 4 dashboard with a separate 15-vehicle-type dataset matching the supplied reference.

**Architecture:** Keep Options 1–3 and hidden Option 10 on their existing render paths. Add an Option 4-only dataset and renderer selected from `renderScreen`, with scoped CSS and a copied local sprite asset so deployment remains self-contained. Option 4 renders light styling and omits the theme toggle without changing the stored theme used when returning to another option.

**Tech Stack:** Vanilla JavaScript, semantic HTML, CSS, Node.js `assert` checks.

**Spec:** `option4/option4.png`, `option4/vehicle_icons.jpg`, and the approved 2026-10-27 chat design.

## Global Constraints

- Option 4 is visible beside Options 1–3; Option 10 remains hidden and unchanged.
- Option 4 contains exactly 15 vehicle types grouped into Light vehicles, Passenger & emergency, and Heavy & cargo.
- Use the reference counts: 753 available of 1,000 total; 158 on mission; 89 unavailable; 75.3% serviceable.
- Use `option4/vehicle_icons.jpg`, choosing the closest silhouette where no exact vehicle exists.
- Option 4 is white-only and has no dark-mode button; selecting it must not overwrite the saved theme preference.
- Do not change the rendered output or behavior of Options 1–3 or Option 10.

## Review Focus

- Selecting Option 4 from a dark theme must render white while preserving the stored dark preference for returning to Options 1–3.
- All 15 rows must render once, with group totals reconciling to 1,000 vehicles and 753 available.
- The copied sprite must use a deployable path under `prototype/assets/`, not a parent-directory path.
- The three-column layout must remain readable at narrower desktop widths without clipping rows.
- Existing option and detail-page regression checks must remain green.

---

### Task 1: Option 4 data and render branch

**Files:**
- Modify: `tests/dashboard-options-check.cjs`
- Modify: `prototype/app.js`

**Interfaces:**
- Consumes: existing `transition(state, action)`, `header(screen, state)`, and `renderScreen(state)`.
- Produces: `option4VehicleGroups` data and `option4Dashboard(state)` HTML renderer.

- [ ] **Step 1: Write the failing behavior checks**

Assert that `set-design` accepts `4`, the header exposes Option 4 but not Option 10, the Option 4 dashboard contains the three group headings and exactly 15 `.option4-vehicle-row` elements, its totals are 753/1,000/158/89, the theme toggle is absent, and normal options retain the toggle and existing markup.

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `node tests/dashboard-options-check.cjs`

Expected: FAIL because design value `4` is rejected and no Option 4 renderer exists.

- [ ] **Step 3: Implement the minimal Option 4 branch**

Add the 15 literal entries and group totals from the reference to `prototype/app.js`. Accept design value `4`, expose it in the selector, render `option4Dashboard(state)` only for dashboard/Option 4, and omit the theme button only for Option 4. Keep `state.theme` and persistence unchanged.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `node tests/dashboard-options-check.cjs`

Expected: PASS.

- [ ] **Step 5: Checkpoint**

Inspect the changed files manually; this workspace has no Git metadata, so no commit is possible here.

### Task 2: Reference-matched styling and sprite asset

**Files:**
- Create: `prototype/assets/option4/vehicle_icons.jpg` (copy from `option4/vehicle_icons.jpg`)
- Modify: `prototype/styles.css`
- Modify: `tests/prototype-check.cjs`
- Modify: `tests/dashboard-options-dom.cjs`

**Interfaces:**
- Consumes: Option 4 class names and `--sprite-x`/`--sprite-y` coordinates emitted by Task 1.
- Produces: a responsive, white-only Option 4 layout and sprite thumbnails.

- [ ] **Step 1: Write the failing asset/layout checks**

Assert that the deployable sprite exists, every Option 4 vehicle row references it through the scoped thumbnail class, Option 4 forces a white page surface under a dark state, and the main layout uses one summary column plus three vehicle-group columns at desktop width.

- [ ] **Step 2: Run the focused checks and confirm RED**

Run: `node tests/prototype-check.cjs`

Run when the QA dependency root is available: `node tests/dashboard-options-dom.cjs`

Expected: FAIL because the asset and scoped Option 4 styles do not exist.

- [ ] **Step 3: Add the asset and scoped CSS**

Copy the supplied sprite under `prototype/assets/option4/`. Add only `[data-design="4"]`/`.option4-*` rules for the reference layout, typography, progress bars, status colors, responsive stacking, and the 5×3 sprite positions.

- [ ] **Step 4: Run all available checks**

Run: `node --check prototype/app.js`

Run: `node tests/dashboard-options-check.cjs`

Run: `node tests/prototype-check.cjs`

Run dependency-backed DOM/browser checks when their configured QA modules are available; otherwise report the missing modules explicitly.

Expected: syntax clean and all available checks PASS.

- [ ] **Step 5: Final scope audit**

Confirm that only the Option 4 implementation, its test assertions, the copied asset, and this plan changed; verify Options 1–3 and hidden Option 10 output remains covered by regression tests.
