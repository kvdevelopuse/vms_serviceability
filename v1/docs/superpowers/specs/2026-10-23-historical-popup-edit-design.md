# Historical Data and Editable Popup Design

## Intent

Extend the static vehicle serviceability prototype with three deterministic date snapshots, editable record details, consistent `dd-MMM-yyyy` display text, and proportional detail-card backgrounds. The existing 22-Oct-2026 records and aggregates remain the reference dataset.

## Constraints

- Keep the 22-Oct-2026 reference records and values unchanged.
- Add only 20-Oct-2026 and 21-Oct-2026.
- Keep every date at 120 records and derive all Unit/category aggregates from those records.
- Keep changes local until the user explicitly says **Push to my repo**.
- Preserve existing navigation, themes, layout, and presentation-only controls.

## Approach

Use the existing 120 records as the reference snapshot. Build the two historical snapshots by cloning those records and applying explicit per-Unit/per-category status allocations. This keeps record identity stable across dates and guarantees that Unit A-D sum to All for every date. Aggregation functions accept a date and always read the selected snapshot.

The popup opens in view mode with disabled controls and Modify/Close buttons. Modify enables the five existing fields and reveals Save/Cancel. Save mutates only the active date snapshot, repaints the dashboard/detail aggregates, and leaves the popup open in view mode. Cancel restores stored values without mutation and remains open.

Native date inputs retain ISO values for browser selection. A formatted companion label displays `dd-MMM-yyyy` consistently on the dashboard and in the popup. Detail headers and table timestamps use the same formatter.

Every detail card that displays a percentage receives the existing dashboard green/red gradient and a CSS percentage variable equal to its displayed value, including 0% and 100%.

## Considered Alternatives

- Store only aggregate matrices: smaller, but record edits could not reliably update tables and totals together.
- Generate historical statuses with arithmetic rules: deterministic, but harder to audit than explicit allocation matrices.
- Use custom JavaScript calendars: exact visual control, but unnecessary complexity when native date inputs can retain selection behavior behind formatted display text.

## Validation

The Edge integration suite will verify the three supported dates, reference preservation, date/Unit reconciliation, visible historical changes, popup view/edit/save/cancel behavior, date formatting, active-snapshot isolation, and detail gradient percentages in both themes.
