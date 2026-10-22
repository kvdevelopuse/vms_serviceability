# Vehicle Serviceability Prototype PRD

Version 0.1 | 23 October 2026 | Provisional for review

Create a clickable vehicle serviceability prototype that reproduces the supplied reference images, supports Dark Mode and Light Mode, and opens the All, Sedan, SUV and People Movers detail screens. Exact visual and data fidelity is the central acceptance condition.

Provisional: the requested scope is recorded below, but conflicting data, incomplete image boundaries and unspecified interactions prevent final implementation approval. No unresolved choice has been converted into an assumption.

## 1 Product scope and document control

| Field | Record |
| --- | --- |
| Source requirements | E-001: the user supplied Clickable Prototype – Development Requirements, sections 1–8, in this conversation. |
| Draft authorization | The user requested the PRD Creator workflow end to end using those requirements. |
| Decision authority | Requesting user; formal approval role beyond the requester is unspecified. |
| Source ledger | Version 0.1, embedded in sections 5–6 of this document; updated with this PRD. |
| Reference authority | The images folder is the user-designated authority. Matching files were located, but their equivalence to that folder remains open under Q-001. |
| Current status | Requirements confirmed by the user’s supplied text; document and unresolved choices are not approved. No prototype has been implemented. |

### Goals and intended user

U-001: a person reviewing and navigating the prototype. Specific business roles, authentication and access restrictions are not specified; the displayed John Doe identity does not establish a login requirement.

G-001: reproduce all five screens in both themes at the specified 1920 × 1080 reference resolution. G-002: complete each category journey and theme switch while preserving the required screen and displayed data. Targets: all ten screen states and all confirmed navigation paths must pass acceptance; the visual comparison tolerance remains open under Q-006. No baseline or customer research was supplied.

### Scope boundary

Confirmed scope comprises the landing dashboard, four category details, a theme toggle and return navigation. Additional features, filters, columns, calculations, animations, enhancements and invented records are excluded by E-001. Existing controls drawn in the images need the scope decision in Q-004. No Phase 2 or future feature commitment is made.

## 2 Screen references and data

Screen mapping is derived from matching filenames. All ten files report 1920 × 1080 dimensions in their PNG headers. Nine decoded for inspection; SUV Dark failed complete decoding after a retry. Filename resolution is evidence of a candidate match, not confirmation that these files are the exact contents of the designated images folder.

| Screen | Dark reference | Light reference |
| --- | --- | --- |
| Landing | Dashboard_Dark_1920x1080.png | Dashboard_Light_1920x1080.png |
| All | All_Vehicles_Dark_1920x1080.png | All_Vehicles_Light_1920x1080.png |
| Sedan | Sedan_Dark_1920x1080.png | Sedan_Light_1920x1080.png |
| SUV | SUV_Dark_1920x1080.png | SUV_Light_1920x1080.png |
| People Movers | People_Movers_Dark_1920x1080.png | People_Movers_Light_1920x1080.png |

### Visible summary values

| Category | Available / Total | Serviceability | On Mission | Not Available |
| --- | --- | --- | --- | --- |
| All Vehicles | 84 / 120 | 70% | 24; 20% | 12; 10% |
| Sedan | 30 / 40 | 75% | 7; 18% | 3; 8% |
| SUV | 30 / 48 | 63% | 11; 23% | 7; 15% |
| People Movers | 24 / 32 | 75% | 6; 19% | 2; 6% |

E-002: these are literal displayed values in the inspected landing and detail references; SUV detail values were read from Light Mode only. Do not infer additional records or change rounded percentages to make their sum equal 100%. The visible serviceability formula is a display requirement; it does not authorize new calculations or a rounding policy.

### Data rules

BR-001 [confirmed, E-001]: use only information explicitly shown in the authoritative images, preserving labels, row order, columns, values, statuses, dates and times. Do not synthesize records to match summary totals or pagination.

BR-002 [confirmed, E-001]: preserve information consistently across landing and detail screens. Literal reproduction and cross-screen consistency cannot both be satisfied for the conflicts in C-001 until the user resolves them.

BR-003 [confirmed, E-001]: report unclear, missing or conflicting content instead of filling gaps. Do not silently correct dates, apparent typos, record identities, years, mission labels or chart values. Screenshot-only graph points must not be treated as an exact underlying dataset.

No API, database, backend, data import, live clock, authentication flow, export or storage behavior is specified. These are not implied by the production VMS context or by pictured controls.

## 3 Functional requirements and journeys

All R records below are confirmed by E-001 and active. They support U-001, G-001 and/or G-002. The proposed release grouping is one complete prototype release; no phase split or optional feature backlog is introduced.

| ID | Required behavior | Links and open dependencies |
| --- | --- | --- |
| R-001 | Show the landing dashboard using the corresponding Dark or Light reference, including its four category cards and illustrated information. | G-001; J-001; AC-001; Q-001, Q-003. |
| R-002 | Provide a working toggle that switches Dark Mode and Light Mode on the landing and every detail screen. Apply each theme to all interface elements. | G-001/002; J-002; AC-002; Q-003. |
| R-003 | Clicking All opens All Vehicles in the current theme. Preserve the illustrated screen label All Vehicles unless the user changes it. | G-002; J-001; AC-003; C-001. |
| R-004 | Clicking Sedan opens the Sedan detail screen in the current theme. | G-002; J-001; AC-003; C-001, C-002. |
| R-005 | Clicking SUV opens the SUV detail screen in the current theme. | G-002; J-001; AC-003; Q-002. |
| R-006 | Clicking People Movers opens its detail screen in the current theme. | G-002; J-001; AC-003. |
| R-007 | Each detail screen supports returning to the landing dashboard while retaining the selected theme. | G-002; J-001; AC-004. |
| R-008 | Reproduce all illustrated data and visual elements without extra functionality or interface components, except the explicitly requested toggle and return navigation. | G-001; AC-005/006/007; BR-001/002/003; Q-003/004. |

### J001 Category drill down and return

Precondition: the landing dashboard is displayed in a selected theme. The reviewer selects one of the four categories, sees the corresponding detail reference in that theme, and uses return navigation to reach the landing dashboard. Repeat for all four categories in both themes. The journey preserves the required data; it does not authorize row actions or a separate vehicle profile.

### J002 Theme switching

Precondition: any supported screen is displayed. The reviewer activates the theme toggle; the same logical screen appears in the other theme. The selected theme remains active through category navigation and return navigation. Initial theme, persistence after reload and toggle placement are unresolved in Q-003; no localStorage or system-theme behavior is mandated.

### Release priorities

Proposed MoSCoW for the single prototype release: R-001–R-008, BR-001–BR-003 and NFR-001 are Must because each directly supports the user’s final acceptance condition. This prioritization is a planning proposal, not a separate approval. There are no Should or Could candidates supported by the current scope. Unspecified image controls are unresolved, not automatically deferred or approved.

## 4 Acceptance criteria and verification

These criteria express the confirmed outcomes in E-001. They are not passed test results. Visual and data criteria remain incomplete where the listed source conflicts or measurement decisions apply.

| ID and links | Observable acceptance outcome | Verification and limits |
| --- | --- | --- |
| AC-001<br>R-001; NFR-001 | In either selected theme, the landing dashboard matches the corresponding authorized reference at 1920 × 1080, including all illustrated information. | Compare both screenshots at equal dimensions. Initial theme and image boundaries remain open. |
| AC-002<br>R-002 | On each of the five logical screens, switching themes in either direction shows the same screen in the selected theme; navigation retains that theme. | Exercise 10 directional switches: two per screen. Resolve conflicting theme data and toggle specification first. |
| AC-003<br>R-003–R-006 | From the landing dashboard in either theme, each of the four categories opens its corresponding detail screen with that theme active. | Exercise all eight category paths. No unrelated category or invented destination appears. |
| AC-004<br>R-007 | From each category in either theme, return navigation shows the landing dashboard in the selected theme. | Exercise all eight return paths, including after a theme switch on a detail screen. |
| AC-005<br>R-008; BR-001/002 | Every displayed label, cell, status, date, time and summary value matches its authoritative source; no records are invented to fill unseen pages. Cross-screen consistency follows the user’s conflict decisions. | Compare each visible item with its image. Blocked where C-001 or C-002 applies; hidden pages remain unprovided. |
| AC-006<br>R-008; NFR-001 | Layout, alignment, proportions, spacing, typography, colors, cards, buttons and tables match the authorized theme reference. | Capture all ten states at a 1920 × 1080 viewport. Visual tolerance, browser and approved image boundaries remain open. |
| AC-007<br>R-008; BR-003 | The prototype contains no unrequested features, generated data, added columns, calculations, filters or animations. Ambiguities are recorded and resolved before affected behavior is implemented. | Review UI inventory against requirements and images. Pictured search, pagination and menus need Q-004 before behavior can pass. |

### NFR001 Reference fidelity

[Confirmed, E-001] Match the supplied designs at 1920 × 1080. Verify all ten screen states against approved sources. Q-006 must distinguish source-image resolution from browser viewport and establish the acceptance environment and visual tolerance. No numeric pixel-difference threshold has been invented.

### Other quality and operational decisions

Responsive behavior, supported browsers, accessibility targets, performance thresholds, packaging and hosting are unspecified. They are not silently converted into commitments. Production scale, integrations and transaction handling do not apply to the presently specified image-based navigation scope; they must be reconsidered if the scope changes.

## 5 Conflicts and open decisions

All items in this section are open. Decision owner: requesting user; source repair may also require whoever owns the images. They block finalizing the affected criteria, not delivery of this provisional PRD. No solution below is treated as accepted.

### C001 Data consistency conflicts

MN-6789 appears as SUV / Mitsubishi Montero / 2023 in All Vehicles Light, and as Toyota Corolla / 2024 in Sedan Light. Sedan Dark shows Toyota Corolla / 2023. GH-3456 appears as SUV / Toyota Corolla Cross / 2024 in All Vehicles Light and Toyota Corolla / 2023 in Sedan Light. These examples conflict with BR-002 while BR-001 prohibits altering them. KL-2345 also has different displayed years and timestamps between All Vehicles Light and Sedan Light. The examples are sufficient to establish a conflict; they are not an exhaustive reconciliation of every cell.

Q-005: should each image retain its own values despite the inconsistency, or will corrected references establish one consistent dataset? Recommendation: provide corrected references to preserve both acceptance objectives. Changing values or waiving consistency requires an explicit user decision. Affects R-002/003/004/008, BR-001/002 and AC-002/005.

### C002 Image boundaries and incomplete sources

Dashboard_Dark_1920x1080.png contains a strip of the Light dashboard above the Dark screen. Sedan_Dark_1920x1080.png similarly contains part of a Light screen above the Dark view. Dashboard Light, Dashboard Dark and Sedan views have content intersecting the bottom image edge. Exact full-image reproduction and a clean single-theme screen therefore need an explicit boundary decision; cropping, stretching or reconstructing content is not authorized.

Q-002: supply a readable SUV Dark reference or identify an authorized replacement. The located file failed full decoding on two attempts. This is an access/asset validation gap, not evidence of its visual contents. Affects R-005/008 and AC-003/006.

| ID | Decision or evidence required | Affected scope |
| --- | --- | --- |
| Q-001 | Confirm the ten matching files in section 2 are the authoritative images folder set; identify any different versions. | All source-dependent requirements and criteria. |
| Q-003 | Specify initial theme, toggle position/appearance and reload persistence. A toggle is required by text but not visibly defined in the inspected images. | R-001/002/008; AC-001/002/006. |
| Q-004 | Clarify behavior of pictured search, status selector, Clear Filters, pagination, page-size selector, row menus, profile menu and trend-period selector. Define only intended actions and supply missing states/data. | R-008; AC-005/007. VINs and additional page records are not supplied by the visible tables. |
| Q-006 | Resolve image boundaries and the acceptance viewport/browser/visual tolerance. State behavior outside 1920 × 1080 only if required. | NFR-001; AC-001/006; C-002. |
| Q-007 | Specify delivery packaging and where/how the prototype should run; no stack, internet availability or deployment destination is confirmed. | Implementation handoff and delivery acceptance. |

## 6 Decision ledger and handoff

Ledger version 0.1 | Updated 23 October 2026 | State current to E-001 and the inspected candidate sources. Stable IDs are retained for future revisions. The document consolidates requirements, decisions, evidence and questions so they can be updated together.

| Decision | State and exact scope | Evidence |
| --- | --- | --- |
| D-001 | Confirmed: images are the visual and displayed-data authority; no assumptions or scope additions. | Requesting user; E-001 sections 1, 5–7. |
| D-002 | Confirmed: Dark and Light themes, toggle on every screen, theme continuity through navigation. | Requesting user; E-001 sections 2, 4, 8. |
| D-003 | Confirmed: landing plus All, Sedan, SUV and People Movers details, with return navigation. | Requesting user; E-001 sections 3–4, 8. |
| D-004 | Confirmed: exact data reproduction and consistency at the 1920 × 1080 reference resolution. Conflicts remain open. | Requesting user; E-001 sections 5–8; C-001/002. |
| D-005 | Proposed: one coherent prototype release with the priority treatment in section 3. No additional phases or candidate features. | PRD planning recommendation based on the specified complete journey. |

### Evidence and limitations

E-001: current user requirements, read in full. E-002: matching references were located and nine images decoded and visually inspected on 23 October 2026; visible data and boundaries support sections 2 and 5. E-003: SUV_Dark_1920x1080.png was retrieved twice and failed full image decoding both times. Candidate sources have recorded modified dates on 22 October 2026. Their inclusion in the designated images folder is unconfirmed (Q-001).

Assumptions register: none adopted. Proposed scope register: D-005 only. No external market validation, user testing, technical feasibility experiment or implementation test has been claimed. Formal approval of this PRD remains pending.

### Readiness and release validation

Covered: objective, core journeys, ten screen mappings, theme continuity, exact-data rules, exclusions, acceptance checks and traceability. Blocking gaps: authoritative source confirmation; C-001 data reconciliation; C-002 source boundaries; unreadable SUV Dark; toggle design/default; behavior of pictured controls; visual acceptance conditions and delivery packaging.

Next action: resolve Q-005 first because its answer determines whether exact per-image values or a reconciled dataset governs the prototype. Then update affected references and criteria, resolve the remaining design and interaction decisions in small batches, and issue a revised PRD for review. Only the affected implementation must wait; the current scope remains documented.

Before release: confirm the source set; verify all ten screen states; run every category, return and theme-switch path in section 4; compare all visible data; confirm there are no unapproved features; and record stakeholder acceptance with any explicitly agreed exceptions. This PRD does not establish implementation readiness or a passed release.

### Revision history

Version 0.1 / ledger 0.1 / 23 October 2026: established G-001/002, U-001, J-001/002, R-001–008, BR-001–003, NFR-001, AC-001–007, D-001–005, E-001–003, C-001/002 and Q-001–007 from the supplied requirements and available references. No earlier decision is superseded.
