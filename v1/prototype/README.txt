VEHICLE SERVICEABILITY PROTOTYPE
Updated from the replacement 1920 x 1080 references on 23 October 2026.

OPEN LOCALLY
Double-click index.html. Keep app.js, styles.css and assets/ alongside it.
JavaScript must be enabled. No server, installation or internet is required.

HOST
Upload this folder's entire contents to any static web host. index.html can
be at the host root or in a subfolder. Every runtime dependency is local.

CLICK THROUGH
Choose All, Unit A, Unit B, Unit C or Unit D and select a dashboard date.
Open All Vehicles, Sedan, SUV or People Movers with the circular arrow;
the rest of each card is not a link. The selected Unit and date remain set
on detail pages. Use the circular Back control to return to the dashboard.
Dark Mode / Light Mode switches the current screen and remains selected
while navigating. Reload restores All, 22 October 2026 and Light Mode.
Browser Back and Forward also navigate the views.

UPDATED REFERENCES
The latest same-named images govern the layout, visible rows and values.
The Fleet Management heading and displayed serviceability calculation have
been removed as requested. Available / Total summary values are retained.
All detail views reuse the landing-page vehicle images, centered between
Serviceability and Available / Total in the main summary card.
The SUV Dark source is now readable and was inspected directly.

The prototype contains 120 fixed records distributed across four units.
Unit/category/status counts reconcile exactly to the original All totals:
120 vehicles, 84 Available, 24 On Mission and 12 Not Available. Percentages
are calculated from those fixed counts with whole-number rounding; no values
are random. Selecting All restores the original dashboard totals.

The dashboard uses standalone high-resolution transparent vehicle images,
centered with their complete silhouettes visible. The All Vehicles card
combines the same three vehicle assets. Sources are in assets/IMAGE_SOURCES.txt.
The dashboard fits its complete content to the viewport without scrollbars;
card sizes are compact and the layout refits when the window is resized.
Detail pages also stay within the viewport. The vehicle grid scrolls
vertically and horizontally while its column headings, summary cards,
filters and pagination remain visible. Focus the grid for keyboard scrolling.
The trend is a fixed illustration traced from the new reference. Card
backgrounds split horizontally at the displayed serviceability percentage,
with green for serviceable and red for the remainder. Fleet Overview is kept
clear of the complete, uncropped vehicle artwork.

Double-click a detail row to open the five-field record popup. Its temporary
values are never saved or written to the dataset; Escape or a backdrop click
closes it. Search, status, pagination and trend-period controls remain
presentation elements. Tables show the first ten matching fixed records and
their footer reflects the complete selected subset.

VERIFICATION
The browser integration check validates the 120 unique records, all unit
reconciliation, retained Unit/date navigation, arrow-only card links,
Actions-column removal, non-saving popup, both popup themes, proportional
card backgrounds and Fleet Overview/image separation. Narrow layouts scroll
tables horizontally.

The source repository contains v1/ and its development checks. The separate
deployment repository contains only this folder's contents at its root.
