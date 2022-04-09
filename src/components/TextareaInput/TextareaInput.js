import React from 'react'
import styles from './TextareaInput.module.scss'

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
