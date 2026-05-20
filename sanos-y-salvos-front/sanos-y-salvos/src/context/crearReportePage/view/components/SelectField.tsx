import type { ComponentPropsWithoutRef } from 'react'
import { FormField, inputClassName } from '../../../commons/components/formField/FormField'

interface Option {
  value: string
  label: string
}

interface SelectFieldProps extends ComponentPropsWithoutRef<'select'> {
  label: string
  options: Option[]
  placeholder?: string
  error?: string
}

export const SelectField = ({ label, options, placeholder, error, ...selectProps }: SelectFieldProps) => (
  <FormField label={label} error={error}>
    <select
      {...selectProps}
      className={`${inputClassName} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23505f76'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center] bg-[length:20px]`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </FormField>
)
