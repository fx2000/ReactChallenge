import React from 'react'
import styles from './TextInput.module.scss'

/**
 * Standard text input component
 * A ref is forwarded to the input element for compatibility with react-hook-form
 */
const TextInput = React.forwardRef(({
  label,
  name,
  value,
  type,
  required,
  ...props
}, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name} className={styles['input__label']}>
        {label}
      </label>
      <input
        aria-label={label}
        aria-required={required}
        className={styles['input__field']}
        type={type}
        name={name}
        value={value}
        required={required}
        ref={ref}
        {...props}
      />
    </div>
  )
})

export default TextInput
