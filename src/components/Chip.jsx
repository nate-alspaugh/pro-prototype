import React from 'react'

/**
 * Chip component for status indicators and badges.
 * 
 * @param {string} children - The text content of the chip
 * @param {string} variant - The color variant ('success' | 'error' | 'warning' | 'info' | 'neutral')
 * @param {boolean} filled - Whether the chip should have a background color
 * @param {string} className - Optional extra classes
 */
function Chip({ children, variant = 'neutral', filled = true, className = '' }) {
  const variantClass = `chip-${variant}`
  const styleClass = filled ? 'chip-filled' : 'chip-outline'
  
  return (
    <span className={`chip ${variantClass} ${styleClass} ${className}`}>
      {children}
    </span>
  )
}

export default Chip
