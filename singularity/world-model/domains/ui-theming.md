> **Grounding** · RuleEngineUI @ `00ebe873dc0c98a71707575ec3fdc374b5b54dfc` · view: `ui-theming` · tier: `full`
> **Generated** 5 August 2026 (2026-08-05T14:45:35Z) · depth: `quick` · builder `2.0`
> **Authoritative for:** file locations, entry points, commands, structural relationships as of the commit above.
> **Not authoritative for:** current file contents. If this document conflicts with code you have read, trust the code and say so explicitly in your output.
> **Unknowns are marked.** Do not resolve them by inference. If the repository has changed since the date above, treat locations as hints, not facts.


## TL;DR {#domain.ui-theming.tldr}

This domain covers the presentation layer and the visual contract of the left navigation shell. The most relevant implementation surface is `src/app/components/sidebar/sidebar.component.ts`, which defines the sidebar container, menu items, and the visual styling classes used by the main application shell. For a change like “change the color black left panel”, the safest interpretation is a UI-only adjustment to those classes rather than a change to business logic.

## Domain purpose {#domain.ui-theming.purpose}

The repository uses a themed shell to present navigation, actions, and status across the application. The sidebar is the primary persistent navigation surface and therefore has a strong effect on user perception and usability.

## Terminology {#domain.ui-theming.terminology}

- Sidebar: the fixed left navigation surface.
- Surface token: a Tailwind-style visual class such as `bg-surface-container-low` or `bg-primary-container`.
- Active state: the current tab or menu item.

## Owning components {#domain.ui-theming.owners}

- `src/app/components/sidebar/sidebar.component.ts` — defines the sidebar markup and container classes.
- `src/app/app.component.html` — places the sidebar beside the main workspace area and sets the content offset.
- `src/styles.css` — likely carries shared design tokens if the app theme is extended.

## Main workflow {#domain.ui-theming.workflow}

1. A user selects a navigation item in the sidebar.
2. The parent `AppComponent` updates the active tab state.
3. The sidebar component re-renders its active styling and the workspace content changes.
4. The visual state is driven by Angular property bindings and utility classes rather than an explicit state machine.

## Invariants {#domain.ui-theming.invariants}

- The sidebar should remain visible and fixed to the left edge while the main content area occupies the remaining width.
- Changes should preserve contrast for text and icons against the background.
- Theme changes should remain scoped to presentation and not alter rule behavior or data flows.

## Change risks {#domain.ui-theming.risks}

- Replacing the background class without preserving contrast can make navigation unreadable.
- If the color is changed only in one branch of a class expression, the dark-mode variant may still override the desired appearance.
- Editing the template directly can affect other surfaces if the class names are reused elsewhere.

## Unknowns {#domain.ui-theming.unknowns}

- The repository does not expose a theme configuration file for the sidebar.
- The exact design-token mapping for `bg-surface-container-low` is not defined in the checked-in files.

## Evidence {#domain.ui-theming.evidence}

- `src/app/components/sidebar/sidebar.component.ts:13` defines the sidebar container classes.
- `src/app/app.component.html:13-21` places the sidebar and reserves space for the main content area.
