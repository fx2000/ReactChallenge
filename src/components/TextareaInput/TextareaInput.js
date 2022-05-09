import React from 'react'
import styles from './TextareaInput.module.scss'

/**
 * Standard textarea input component
 * A ref is forwarded to the input element for compatibility with react-hook-form
 */
const TextareaInput = React.forwardRef(({
  label,
  name,
  value,
  type,
  required,
  ...props
}, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name} className={styles['input__label']}>{label}</label>
      <textarea
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

export default TextareaInput
