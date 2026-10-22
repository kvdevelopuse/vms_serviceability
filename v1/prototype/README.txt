VEHICLE SERVICEABILITY PROTOTYPE
Updated from the replacement 1920 x 1080 references on 23 October 2026.

OPEN LOCALLY
Double-click index.html. Keep app.js, styles.css and assets/ alongside it.
JavaScript must be enabled. No server, installation or internet is required.

HOST
Upload this folder's entire contents to any static web host. index.html can
be at the host root or in a subfolder. Every runtime dependency is local.

CLICK THROUGH
Select All Vehicles, Sedan, SUV or People Movers. Use the circular Back
control to return to the dashboard. Dark Mode / Light Mode switches the
current screen and remains selected while navigating. Reload starts in
Light Mode. Browser Back and Forward also navigate the views.

UPDATED REFERENCES
The latest same-named images govern the layout, visible rows and values.
The Fleet Management heading and displayed serviceability calculation have
been removed as requested. Available / Total summary values are retained.
All detail views use the new uniform layout without vehicle illustrations.
The SUV Dark source is now readable and was inspected directly.

Only supplied records appear. Literal differences between categories and
rounded percentages are preserved. For example, SUV shows Serviceability
63% and Available 62%, as the replacement detail screenshots show. Sedan's
MN-6789 year is now 2024 in both themes. No values are calculated or live.

The dashboard uses standalone high-resolution transparent vehicle images,
centered with their complete silhouettes visible. The All Vehicles card
combines the same three vehicle assets. Sources are in assets/IMAGE_SOURCES.txt.
The dashboard fits its complete content to the viewport without scrollbars;
card sizes are compact and the layout refits when the window is resized.
The trend is a fixed illustration traced from the new reference.

Search, status, pagination, row menus and trend-period controls remain
presentation elements; no behavior or additional records were specified.

VERIFICATION
All displayed text and values are checked against a baseline captured before
the image/layout fix. Rendering and interaction checks passed for all ten view/theme states in
local-file and HTTP DOM runs. All ten reference images decode completely.
No browser provider was available for screenshots, so pixel-level browser
comparison remains unverified. Narrow layouts scroll tables horizontally.

The source repository contains v1/ and its development checks. The separate
deployment repository contains only this folder's contents at its root.
