# Vehicle Serviceability Implementation Plan

Historical initial plan. The subsequent replacement-image revision and explicit header removals are recorded in `REFERENCE_REFRESH.md` at the v1 root.

> **For agentic workers:** Use superpowers:executing-plans to implement this plan in the current session. Track completed steps below.

**Goal:** Deliver a portable static vehicle serviceability prototype from the supplied PRD.

**Architecture:** Native HTML, CSS and a classic JavaScript script render five views in two themes. All assets are relative and local. Visible source data remains literal; only navigation, return and theme switching are interactive.

**Tech Stack:** HTML5, CSS, JavaScript; Node's built-in assertion library for checks.

**Spec:** `docs/superpowers/specs/2026-10-23-vehicle-serviceability-design.md`; the supplied PRD governs scope.

## Global Constraints

- Run from both `file://` and a hosted subdirectory without a backend or installation.
- Preserve supplied summary values, visible table rows and theme differences; do not synthesize hidden records.
- No added filters, calculations, animations or destinations.
- Preserve the current theme through category and return navigation.
- Use supplied images; do not overwrite source files.

## Review Focus

- All four category journeys and theme continuity in both themes.
- Unknown URL fragments fall back to the dashboard.
- Missing or corrupt reference assets cannot become runtime dependencies.
- Asset paths work below a hosting subdirectory and without fetch or module loading.
- Long table content remains readable on narrower screens and at 1920 by 1080.

## Task 1: Views, literal data and navigation

**Files:** `prototype/index.html`, `prototype/app.js`, `tests/prototype-check.cjs`.

**Interface:** `transition(state, action)` returns `{screen, theme}`; `renderScreen(state)` returns view HTML. Browser event handlers use the same functions exercised by Node checks.

- [x] Write a runnable failing check for category destinations, theme continuity, return navigation, invalid routes and literal rendered data.
- [x] Run `node tests/prototype-check.cjs`; confirm failure because the prototype is absent.
- [x] Implement the five views, literal rows, local icon markup and classic script loading.
- [x] Run the check; require a passing result and `node --check prototype/app.js`.

## Task 2: Reference styling and local illustrations

**Files:** `prototype/styles.css`, `prototype/assets/`.

- [x] Copy only decoded source images used for vehicle illustrations; use CSS clipping without altering originals.
- [x] Implement Light and Dark colors, dashboard cards, fixed trend illustration, status breakdown and detail tables.
- [x] Check theme selectors and local assets. Browser unavailable (empty browser inventory; creating an in-app browser returned 'Browser is not available: iab'); visual comparison remains unverified.

## Task 3: Packaging, final checks and review

**Files:** `prototype/README.txt`, `docs/superpowers/vehicle-serviceability-verification.md`.

- [x] Document double-click opening, folder hosting, included interactions and source limitations.
- [x] Verify the entire dependency tree is local and test HTTP subdirectory serving.
- [x] Run the complete Node check and syntax validation after final changes.
- [x] Perform a fresh independent code review; fix material findings and report actual verification limits.

## Execution record

- The working directory is not a Git repository. Implement in the requested directory; skip worktree and commit operations.
- The user reiterated implementation according to the PRD. Continue the authorized build without another approval round.
- Source conflict handling: retain each view's literal displayed data, record rather than reconcile conflicts. Recreate unreadable SUV Dark using its Light content and shared dark styling; exact fidelity for that unavailable source cannot be verified. Remove stray mixed-theme margins in the HTML reconstruction. These are delivery exceptions, not claims that all PRD acceptance criteria have passed.
- Task 1 complete: initial check failed because index.html was absent, then passed after implementation. An additional illustration check failed before detail-specific assets were routed, then passed after correction.
- Task 2 complete with visual verification limit: all six runtime PNGs decode fully; all prototype files returned HTTP 200 under /prototype/.
- User additionally authorized pushing the entire v1 folder to https://github.com/kvdevelopuse/vms_serviceability.git. Repository inspected as empty; publish under v1/ without unrelated neighboring folders.
- Task 3 complete: local-file and HTTP DOM interaction checks pass; independent review complete; crop findings fixed with regression check. Full results and limitations are recorded in `docs/superpowers/vehicle-serviceability-verification.md`.
