import React from 'react'
import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'

/**
 * @component TextField
 * @purpose Text input with glassmorphism styling for forms and search
 * @where Forms, search inputs, settings panels, command palette inputs
 * @not-for Dense data tables (use inline edit), read-only display (use text)
 *
 * @variant size - sm | md | lg - Input height variations
 *
 * @uses Base UI Field, Input
 * @related CommandPalette (has inline search input)
 */

export interface TextFieldProps {
  /** Input size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Optional label above the input */
  label?: string
  /** Helper text below input */
  helperText?: string
  /** Error message (shows error state when provided) */
  error?: string
  /** Placeholder text */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled */
  defaultValue?: string
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Disabled state */
  disabled?: boolean
  /** Field name for forms */
  name?: string
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  /** Additional class name */
  className?: string
}

const sizeClasses = {
  sm: 'h-8 text-xs px-3',
  md: 'h-10 text-sm px-4',
  lg: 'h-12 text-base px-4'
}

export default function TextField({
  size = 'md',
  label,
  helperText,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  name,
  type = 'text',
  className = ''
}: TextFieldProps) {
  return (
    <Field.Root
      name={name}
      disabled={disabled}
      invalid={!!error}
      className="text-field-wrapper"
    >
      {label && (
        <Field.Label className="text-field-label">
          {label}
        </Field.Label>
      )}

      <div className={`text-field-container ${error ? 'text-field-error' : disabled ? 'text-field-disabled' : 'text-field-default'}`}>
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`text-field ${sizeClasses[size]} ${className}`}
        />
        <div className="text-field-border" aria-hidden="true" />
      </div>

      {error && (
        <Field.Error className="text-field-helper text-field-helper-error" forceShow>
          {error}
        </Field.Error>
      )}

      {helperText && !error && (
        <Field.Description className="text-field-helper">
          {helperText}
        </Field.Description>
      )}
    </Field.Root>
  )
}
