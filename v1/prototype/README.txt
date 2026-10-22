VEHICLE SERVICEABILITY PROTOTYPE

Open locally
------------
Double-click index.html in this folder. Keep app.js, styles.css and assets/
beside it. JavaScript must be enabled. No server, installation, build step,
account or internet connection is required.

Host it
-------
Upload the ENTIRE contents of this prototype folder to any static web host.
Open its index.html. It also works inside a hosting subfolder. All runtime
paths are relative. The PRD, source images, styling references and tests
outside this folder are not required for hosting.

Click through
-------------
1. Start on Vehicle Serviceability in Light Mode.
2. Select All Vehicles, Sedan, SUV or People Movers to open its detail view.
3. Use the top-right Dark Mode / Light Mode button on any screen.
4. Use the circular Back control to return to the dashboard.

Theme selection is retained while navigating. Opening or reloading the page
starts in Light Mode. URL fragments select the detail screen, for example
index.html#suv. The browser's Back and Forward controls also navigate views.

Search, status filters, Clear Filters, page controls, menus and trend period
are presentation elements from the references. Their behavior and additional
data were not specified in the PRD. Only the visible supplied records appear.

Source and fidelity notes
-------------------------
The prototype uses the supplied reference images and literal displayed values.
Conflicting records remain as shown in each source. For example, MN-6789 in
Sedan is 2024 in Light Mode and 2023 in Dark Mode; the All Vehicles view shows
the same plate against a different model. Summary counts and percentages are
literal, including rounding inconsistencies.

The supplied SUV Dark PNG cannot be fully decoded. Its view therefore uses
the SUV Light content with the shared dark styling. It cannot be compared
against an intact SUV Dark source. Light strips above Dashboard Dark and
Sedan Dark are omitted in the HTML reconstruction. Source content cut off
by image boundaries is not treated as a supplied extra dataset. The trend
is a fixed illustration traced from the visible source, not computed data.

The theme button's placement/default were unspecified; this build uses the
top-right header and Light Mode. These implementation decisions do not
resolve the PRD's still-open stakeholder acceptance decisions.

The target reference resolution is 1920 x 1080. Narrower screens use a flowing
layout and horizontally scrollable tables. This is an HTML reconstruction;
pixel-perfect equivalence and formal stakeholder acceptance are not claimed.

Development checks
------------------
From the v1 folder, with Node.js installed:
  node tests/prototype-check.cjs
  node --check prototype/app.js

Node.js is only needed to run development checks, never to use the prototype.
