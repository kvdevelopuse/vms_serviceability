VEHICLE SERVICEABILITY PROTOTYPE
Updated from the replacement 1920 x 1080 references on 23-Oct-2026.

OPEN LOCALLY
Double-click index.html. Keep app.js, styles.css and assets/ alongside it.
JavaScript must be enabled. No server, installation or internet is required.

HOST
Upload this folder's entire contents to any static web host. index.html can
be at the host root or in a subfolder. Every runtime dependency is local.

CLICK THROUGH
Choose All, Unit A, Unit B, Unit C or Unit D and select 20-Oct-2026,
21-Oct-2026 or 22-Oct-2026 on the dashboard. All displayed dates use
dd-MMM-yyyy while the native date selectors remain available.
Open All Vehicles, Sedan, SUV or People Movers with the circular arrow.
Card bodies are static and have no selection border; Fleet Overview remains
the overall fleet view. Option 1 uses category-colored progressive fills across
all four landing cards and the first Serviceability card on each detail screen;
Option 2 follows esnaad_style/option2.png: each category has its own light tint
and accent, serviceability is centered in a large progress ring, and Available
and Total values sit in separate count tiles. Dark Mode uses the approved navy
palette and restrained category tints.
The SUV alert ring is red at 63%, while serviceable values use green.
The horizontal options are centered
on the heading/date row.
The chosen option also applies to detail Serviceability cards. The numeric
available/total ratios remain; their text labels have been removed.
The selected category, design, Unit and date remain set
on detail pages. Use the circular Back control to return to the dashboard.
The detail Unit is shown in a disabled, theme-aware text field. Choosing
another dashboard Unit updates this display and the existing Unit filter.
Dark Mode / Light Mode switches the current screen, remains selected while
navigating, and persists after refresh. Reload restores All Vehicles, Option 1,
All Units and 22-Oct-2026 while retaining the stored theme. Arrow navigation slides into its detail screen;
reduced-motion preferences disable the slide.

On a detail page, select Serviceability, On Mission or Not Available to filter
the current Unit/date records. The duplicate Available card has been removed;
Serviceability filters the available records. Percentages are calculated from
counts, rounded to a whole number (SUV 30/48 = 63%). The active card is outlined
inside its edges so the detail container cannot clip the top selection edge.
Previous and Next move through ten-row pages and show the current and
total page numbers. Changing a card, Unit, date or detail screen returns to
page 1.
Browser Back and Forward also navigate the views.

UPDATED REFERENCES
The latest same-named images govern the layout, visible rows and values.
The Fleet Management heading and displayed serviceability calculation have
been removed as requested. Available / Total summary values are retained.
All detail views reuse the landing-page vehicle images, centered between
Serviceability and Available / Total in the main summary card.
The SUV Dark source is now readable and was inspected directly.

The prototype contains three fixed snapshots of 120 records distributed
across four units. The original 22-Oct-2026 snapshot remains unchanged;
20-Oct-2026 and 21-Oct-2026 provide deterministic historical variations.
Unit/category/status counts reconcile exactly to the original All totals:
120 vehicles, 84 Available, 24 On Mission and 12 Not Available. Percentages
are calculated from those fixed counts with whole-number rounding; no values
are random. Selecting All restores the original dashboard totals.

The dashboard uses standalone high-resolution transparent vehicle images,
centered with their complete silhouettes visible. The All Vehicles card
combines the same three vehicle assets. Sources are in assets/IMAGE_SOURCES.txt.
The dashboard fits its complete content to the viewport without scrollbars;
card sizes are compact and the layout refits when the window is resized.
Detail pages stay within the viewport where space permits. Short mobile
landscape views scroll vertically so the vehicle grid remains reachable.
The vehicle grid scrolls
vertically and horizontally while its column headings, summary cards,
filters and pagination remain visible. Focus the grid for keyboard scrolling.
The trend uses only the existing 20–22 October snapshots through the selected
date. It follows All Vehicles and the selected Unit, including saved record
overlays. The Fleet Overview subtitle shows All Vehicles and its total.
Its KPI trend, Fleet Status donut/legend and Key Insights follow the
option2.png reference treatment. Fleet Overview has
no separate date/period selector in either design option.
No additional historical records are generated. Option 1 dashboard cards and
detail Serviceability split horizontally at the displayed serviceability
percentage, with the reference emerald gradient and ice-blue remainder.
Option 2 places that percentage and the Serviceable label in the circular
progress indicator, with the unchanged Available and Total values beside it.
Percentage text uses tabular numerals, matching semantic green/red
colors, and compact status pills for quick scanning. Fleet Overview is kept
clear of the complete, uncropped vehicle artwork.

Double-click a detail row to open the five-field record popup in View Mode.
Modify enables its fields; Save stores a vehicle/date-specific overlay in
browser localStorage and refreshes the visible calculations, while Cancel
restores stored values. Saved edits are restored
after reload in the same browser without changing the fixed source snapshots.
Close, Escape or a backdrop click closes it. Search and toolbar status
controls remain presentation elements. Tables show ten matching
fixed records per page and their footer reflects the complete selected subset.

VERIFICATION
The browser integration check validates the three 120-record snapshots,
date/unit reconciliation, retained Unit/date navigation, summary-card filters,
pagination continuity and reset behavior, popup view/edit/save/cancel,
date-specific localStorage retrieval, immutable source snapshots, both themes,
both Serviceability card options, standardized dates and Fleet
Overview/image separation. Narrow layouts scroll tables horizontally.

The source repository contains v1/ and its development checks. The separate
deployment repository contains only this folder's contents at its root.
