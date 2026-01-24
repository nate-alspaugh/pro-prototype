import { ReactNode } from 'react'
import { cn } from '../../utils/cn'

/**
 * @component Avatar
 * @purpose Display user or entity identity with consistent sizing and shape
 * @where Profile headers, comment threads, user lists, command palette rows
 * @not-for Decorative images (use img), logo marks, icon-only buttons
 *
 * @variant size - xs | sm | md | lg | xl - Controls dimensions (24-64px)
 * @variant shape - circle | rounded - Circle for people, rounded for entities
 * @variant variant - default | placeholder - Placeholder when no content available
 *
 * @uses None (atomic component)
 * @related Chip (both display compact identity info)
 */

interface AvatarProps {
  children?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'rounded'
  variant?: 'default' | 'placeholder'
  className?: string
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs', // 24px
  sm: 'w-8 h-8 text-xs', // 32px
  md: 'w-10 h-10 text-sm', // 40px
  lg: 'w-12 h-12 text-base', // 48px
  xl: 'w-16 h-16 text-lg' // 64px
}

const shapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-lg' // 8px
}

export default function Avatar({ 
  children, 
  size = 'md', 
  shape = 'rounded',
  variant = 'default',
  className 
}: AvatarProps) {
  return (
    <div 
      className={cn(
        'avatar',
        sizeClasses[size],
        shapeClasses[shape],
        variant === 'placeholder' && 'avatar-placeholder',
        className
      )}
    >
      {children}
    </div>
  )
}
