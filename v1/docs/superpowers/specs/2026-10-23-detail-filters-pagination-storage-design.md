# Detail Filters, Pagination, and Storage Design

## Intent

Add functional summary-card filtering and ten-row pagination to detail tables, persist popup edits in browser storage by selected date and vehicle, and keep the green/red percentage split only on the Serviceability card.

## Constraints

- Preserve the three fixed 120-record snapshots as immutable source data.
- Preserve Unit/date synchronization, popup modes, table columns, row double-click, themes, and navigation.
- Keep search and toolbar status controls presentation-only.
- Keep all changes local until the user explicitly says **Push to my repo**.

## Approach

Store popup edits in one versioned `localStorage` object keyed by `date|recordId`. Record queries materialize effective records by overlaying a matching saved edit onto the immutable source record. Aggregates, dashboard cards, detail cards, filters, pagination, tables, and popup retrieval all consume the same effective records, so saved status changes remain consistent without changing the source snapshots.

Extend view state with `statusFilter` and `page`. Summary cards dispatch an explicit filter value: Serviceability and Available show Available records, On Mission shows On Mission records, and Not Available shows Not Available records. A filter, Unit, date, or detail-screen change resets page 1. Previous and Next clamp to the available page range.

Only `.summary-main` keeps the percentage gradient. The other summary cards return to the existing surface background. All summary cards become buttons with an active outline that does not replace their background.

## Validation

The Edge integration suite will verify filter membership, active indication, pagination boundaries and row continuity, resets, row double-click on later pages, immutable source snapshots, localStorage keys and content, date isolation, retrieval after storage rehydration, aggregate updates, and card styling in both themes.
