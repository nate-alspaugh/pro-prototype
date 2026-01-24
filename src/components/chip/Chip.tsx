import React from 'react'

/**
 * @component Chip
 * @purpose Display status indicators, tags, or compact categorical information
 * @where Tables, cards, filters, tag lists, status displays
 * @not-for User identity (use Avatar), primary actions (use Button), navigation
 *
 * @variant variant - success | error | warning | info | neutral - Semantic color
 * @variant filled - true | false - Solid fill vs outline style
 *
 * @uses None (atomic component)
 * @related Avatar (both display compact info), Badge
 */

interface ChipProps {
  children: React.ReactNode
  variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral'
  filled?: boolean
  className?: string
}
export default function Chip({ children, variant = 'neutral', filled = true, className = '' }: ChipProps) {
  const variantClass = `chip-${variant}`
  const styleClass = filled ? 'chip-filled' : 'chip-outline'
  
  return (
    <span className={`chip ${variantClass} ${styleClass} ${className}`}>
      {children}
    </span>
  )
}
