# Card, Unit Field, and React Integration Design

## Intent

Refresh the existing cards with a deeper professional palette, show the selected detail Unit in a disabled text field, and provide reusable React components that can be integrated into an existing ERP without coupling to its architecture.

## Constraints

- Preserve all existing data, calculations, navigation, filtering, pagination, popup behavior, responsive behavior, and Light/Dark Mode behavior.
- Keep percentage-based green/red splitting on dashboard cards and the detail Serviceability card only.
- Do not push, deploy, or commit these changes until the user explicitly says “Push to my repo”.
- Do not add runtime packages or assume an ERP router, store, API client, build tool, or design system.

## Approaches considered

1. **Convert the whole standalone prototype to React.** This creates the most duplication and introduces build/runtime decisions the ERP has not supplied.
2. **Keep the tested standalone prototype and add a props-driven React integration layer.** This preserves the clickable artifact while giving the ERP reusable components with no router, store, or API assumptions. This is the selected approach.
3. **Only document how to rewrite it in React.** This leaves the user without integration-ready code.

## Visual design

Use deeper muted sage and warm rose for percentage splits, subdued blue/teal/rose solid surfaces for the three detail status cards, theme-specific borders, and restrained shadows. Text and status colors keep their existing semantic meaning. The layout and all displayed values remain unchanged.

Percentage indicators use heavier tabular numerals and a slim proportional rail derived from the card's existing percentage variable. The rail keeps serviceable green and unserviceable red visible without adding a second displayed value. Detail status percentages use compact tone-matched pills with readable contrast in both themes.

## Detail Unit field

Render a disabled `type="text"` input on detail screens. It displays the Unit chosen on the dashboard, uses a theme-aware greyed appearance, and cannot be modified. Returning to the dashboard and choosing another fixed Unit updates the displayed value when details reopen.

## React integration boundary

Create reusable function components for the disabled Unit field, dashboard fleet card, and detail summary cards. Components receive data and callbacks through props and contain no fetching, routing, persistence, or global state. Detail cards accept existing displayed percentages, with count-based fallbacks, so ERP values survive differences in display rounding. A scoped stylesheet avoids collisions with ERP styles and stacks status cards within narrow integration boundaries. A short integration README identifies the inputs the ERP must supply.

## Missing ERP-specific information

Direct wiring into the ERP requires its React version, build tool, design-token system, router/state conventions, and vehicle-data API contract. The local deliverable deliberately leaves those as props rather than inventing them.
