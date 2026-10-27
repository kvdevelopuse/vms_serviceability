# Project Instructions

## Repository publishing

When the user says **"push changes to my repo"**:

1. Push the complete project changes to `https://github.com/kvdevelopuse/vms_serviceability.git`.
2. Synchronize the contents of `prototype/` to the repository root of `https://github.com/kvdevelopuse/vms_serviceability_deployed_v1.git`, then push them.
3. Verify both remote branches after pushing and report both commit IDs.

## Dashboard design visibility

Options 1, 2, 3, and 4 are visible in the dashboard header. Option 3 is based on Option 2, with the approved white-card design applied to All Vehicles, Sedan, SUV, and People Movers. Landing-page cards use two side-by-side white Available/Total tiles, thin gray borders, and colored numbers/icons. All detail-page summary cards also use white backgrounds with colored numbers/icons. These white surfaces apply in both themes; Options 1 and 2 retain their existing designs. Option 4 is the white-only 15-vehicle-type dashboard based on `option4/option4.png`; it hides the theme toggle and uses `prototype/assets/option4/vehicle_icons.jpg`.

The former Option 3 design is preserved as Option 10 and is currently hidden by `SHOW_OPTION_10 = false` in `prototype/app.js`.

Option 3 detail summary cards use the same light gray selection border for every status, with no status-colored selection borders. In Options 1, 2, and 3, Sedan, SUV, and People Movers detail tables show Status immediately before Last Updated when the All summary card is selected.
When the user says **"show Option 10"**, change this flag to `true`, verify the dashboard, and leave the Option 10 design unchanged.
