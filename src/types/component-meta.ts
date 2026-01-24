/**
 * Component metadata types for the design system registry
 */

export type ComponentCategory =
  | 'ui'
  | 'cards'
  | 'charts'
  | 'layout'
  | 'navigation'
  | 'pages'
  | 'utility'

export interface ComponentPurpose {
  /** What the component does */
  what: string
  /** Where the component is typically used */
  where: string
  /** What the component should NOT be used for (with alternatives) */
  notFor: string
}

export interface VariantDefinition {
  /** Available options for this variant */
  options: string[]
  /** Default value if not specified */
  default: string
}

export interface ComponentComposition {
  /** Components/atoms this component uses internally */
  uses: string[]
  /** Components that use this component */
  usedBy: string[]
}

export interface ComponentMeta {
  /** Unique identifier (lowercase, kebab-case) */
  id: string
  /** Display name */
  name: string
  /** Category for organization */
  category: ComponentCategory
  /** Import path */
  path: string
  /** Purpose statement (what/where/not-for) */
  purpose: ComponentPurpose
  /** Variant axes with options and defaults */
  variants: Record<string, VariantDefinition>
  /** Composition relationships */
  composition: ComponentComposition
  /** Related components (similar purpose or structure) */
  related: string[]
  /** Usage guidelines */
  guidelines: string
}

/**
 * Token metadata for design token documentation
 */
export interface TokenMeta {
  /** Token name (e.g., --surface-0) */
  name: string
  /** Token value */
  value: string
  /** Purpose/when to use this token */
  purpose: string
  /** Token category */
  category: 'color' | 'typography' | 'spacing' | 'animation' | 'border' | 'shadow'
}
