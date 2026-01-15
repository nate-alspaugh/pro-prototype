---
name: 2026-pro-styleguide
description: This is a new rule
---

# Design System & UI Rules

## 1. Typography
**Font Families:**
- Primary (UI): `General Sans`
- Mono (Numbers/Data): `JetBrains Mono`

**Font Weights:**
- Regular/Book: 450
- Medium/Semi: 530
- Bold: 700 (standard bold for Mono)

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
- `White Alpha`: 100%, 90%, 80%, 70%, 60%, 50%, 40%, 30%, 20%, 10%, 5%, 2.5%
- `Black Alpha`: (Same steps as white)

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

## 4. Implementation Rules
1. **Semantic Naming:** Always use semantic names (e.g., `txt-secondary`) instead of raw hex values.
2. **Typography Logic:**
   - Use `General Sans` for all UI text and `JetBrains Mono` strictly for numbers/data.
   - **Line Height Rule:** Ignore element type (Title vs Paragraph).
     - IF text is single-line: Use `leading-none` (100%).
     - IF text wraps/is multi-line: Use `leading-relaxed` (150%).
3. **Card Hierarchy & Styling:**
   - **Depth Logic:**
     - Use `card-bg-0` for the initial "Parent" or "Base" card layer.
     - Use `card-bg-1` for any nested cards or grouped regions *inside* the parent card.
   - **Borders:** Always use 1px width with the specified linear gradient.
4. **Spacing:** Adhere strictly to the spacing scale; do not invent arbitrary values like 10px or 15px.