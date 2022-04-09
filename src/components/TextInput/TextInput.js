import React from 'react'
import styles from './TextInput.module.scss'

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
