---
name: 2026-pro-styleguide
description: Use this resource as a source of truth to for our style guide and rules for building our UI
---

# Design System & UI Rules

## 1. Typography
**Font Families:**
- Primary (UI): `General Sans` (**Variable Font**)
- Mono (Numbers/Data): `JetBrains Mono`

**Font Weights (Variable Axis):**
- Regular/Book: 450 (Use specific value, do not round to 400)
- Medium/Semi: 530 (Use specific value, do not round to 500)
- Bold: 700 (Standard bold for Mono)

**Line Height (Leading):**
- **Single-line Content:** 100% (1.0)
- **Multi-line Content:** 150% (1.5)
*Note: This rule applies globally to ALL text elements (Titles, Paragraphs, Labels).*

**Text Sizes (px):**
- 2xs: 12px
- xs: 14px
- s: 16px
- m: 18px
- l: 20px
- xl: 24px
- 2xl: 28px

**Text Styles Map:**
- `Title 4`: size: 2xl, weight: 530
- `Title 3`: size: xl, weight: 530
- `Title 2`: size: l, weight: 450
- `Title 1`: size: m, weight: 450
- `Paragraph 3`: size: s, weight: 450
- `Paragraph 2`: size: xs, weight: 450
- `Paragraph 1`: size: 2xs, weight: 450
- `Button Label`: size: s, weight: 450
- `Table Label`: size: xs/2xs, weight: 450
- `Mono Label`: Uppercase, Bold

## 2. Spacing, Radius & Borders
**Grid System:**
- Base unit: 4px (Implicit grid).
- Smallest exception unit: 2px.

**Spacing Token Scale (Gap/Padding/Margin):**
[2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]

**Border Width:**
- Default: 1px (Strictly applied to all bordered elements).

**Border Radius:**
- Standard steps: 2px, 4px, 8px, 12px, 16px.
- Full/Pill: 9999px (labeled as 9000).

## 3. Colors & Tokens
**Base Palette:**
- `Base Gray`: #0C0D0D
- `White Alpha`: 100%, 90%, 80%, 70%, 60%, 50%, 40%, 30%, 20%, 10%, 5%, 2.5%, 0%
- `Black Alpha`: 100%, 90%, 80%, 70%, 60%, 50%, 40%, 30%, 20%, 10%, 5%, 2.5%, 0%

**Semantic Surface Tokens:**
- `surface-0`: Base Gray (#0C0D0D)
- `surface-1`: White 5%
- `surface-2`: White 2.5%

**Semantic Card Tokens:**
- `card-bg-0` (Base): surface-1 + backdrop-blur(200)
- `card-bg-1` (Nested): surface-2 + backdrop-blur(200)
- `card-border`: 1px width, Linear Gradient (45deg, White 10% -> White 5%)

**Semantic Text Tokens:**
- `txt-primary`: White 90%
- `txt-secondary`: White 60%
- `txt-tertiary`: White 40%

## 4. Component Specs

### Button Primary (High Fidelity)
- **Label:** `Base Gray` (#0C0D0D) | Weight: 450
- **Background Fill:** Linear Gradient (Top -> Bottom): White 80% -> White 70%
- **Outer Border:** `card-border` (White 10% -> White 5%)
- **Inner Border (Highlight/Shadow):**
  - *Must use absolute positioned pseudo-element or inset box-shadow.*
  - Width: 0.5px
  - Gradient (Top -> Bottom): [0%] White 100% -> [25%] Transparent -> [75%] Transparent -> [100%] Black 30%

### Button Secondary (Glass/Ghost)
- **Label:** `txt-secondary` (White 60%) | Weight: 450
- **Background Fill:** Linear Gradient (Top -> Bottom): White 0% -> White 10%
- **Outer Border:** `card-border` (White 10% -> White 5%)
- **Inner Border (Ring):**
  - Width: 0.5px
  - Color: Black 20% (Solid inset shadow)

### Table Small (Key/Value Data)
- **Usage:** Inside cards for direct key/value pairs.
- **Layout:**
  - Row Padding: `8px` (py-2)
  - Alignment: Flex Row, Justify Between, Items Center.
- **Dividers:**
  - Style: `card-border` (1px gradient).
  - Placement: Between rows only (No border above first item, no border below last item).
- **Typography - Key (Left):**
  - Font: `General Sans`
  - Size: `xs` (14px) *[Inferred from hierarchy]*
  - Color: `txt-secondary`
  - Weight: 450
  - Line-Height: 100% (Single Line)
- **Typography - Value (Right):**
  - Font: `JetBrains Mono`
  - Size: `s` (16px) (Matches `Number Label 3`)
  - Color: `txt-primary`
  - Weight: 700 (Bold)
  - Line-Height: 100% (Single Line)

## 5. Implementation Rules
1. **Semantic Naming:** Always use semantic names (e.g., `txt-secondary`) instead of raw hex values.
2. **Typography Logic:**
   - **Variable Font Usage:** Use `font-weight: 450` and `font-weight: 530` explicitly.
   - **Line Height Rule:** Ignore element type.
     - Single-line: `leading-none` (100%).
     - Multi-line: `leading-relaxed` (150%).
3. **Card Hierarchy:**
   - Use `card-bg-0` for Parent/Base layers.
   - Use `card-bg-1` for Nested layers.
4. **Button Construction:**
   - **Primary:** Use `::before` pseudo-element for the gradient inner border (Top Shine/Bottom Shadow).
   - **Secondary:** Use `box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.2)` for the inner border.
5. **Table Logic:**
   - For "Table Small", ensure borders are strictly *between* items (`divide-y` logic), never on the outer edges of the list container.