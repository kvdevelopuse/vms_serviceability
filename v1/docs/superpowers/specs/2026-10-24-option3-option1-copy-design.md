# Option 3 Using Option 1 Design

## Intent

Add an **Option 3** radio choice whose landing and details screens look and behave exactly like Option 1 while retaining `designOption="3"` as its selected state.

## Scope

- Add Option 3 to the landing-page radio group.
- Accept and retain Option 3 during navigation, filtering, date/unit changes, and theme changes.
- Route Option 3 through the existing Option 1 rendering and styling path in the prototype and React components.
- Preserve all existing data, values, labels, interactions, themes, and Option 1/Option 2 behavior.

## Approaches

- **Reuse the Option 1 path (selected):** treat only Option 2 as the alternate design, so Option 3 naturally renders as Option 1. This is the smallest change and prevents visual drift.
- **Duplicate Option 1 markup and CSS:** rejected because duplicated design code could diverge.
- **Store Option 3 as Option 1:** rejected because the Option 3 radio would not remain distinctly selected.

## Acceptance

- Three radio choices appear and Option 3 remains selected after dashboard/detail navigation.
- Option 3 landing and details markup and computed styling match Option 1.
- Option 1 and Option 2 remain unchanged.
- No new styling, data, labels, dependencies, or unrelated behavior is introduced.
