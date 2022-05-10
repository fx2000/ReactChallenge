import React from 'react'
import PropTypes from 'prop-types'
import styles from './TextareaInput.module.scss'

/**
 * Standard textarea input component
 * A ref is forwarded to the input element for compatibility with react-hook-form
 */
const TextareaInput = React.forwardRef(({
  id,
  label,
  name,
  required,
  value,
  ...props
}, ref) => {
  return (
    <div
      className={styles.input}
      id={id}
    >
      <label
        className={styles['input__label']}
        htmlFor={name}
        id={`${id}-label`}
      >
        {label}
      </label>
      <textarea
        aria-label={label}
        aria-required={required}
        className={styles['input__field']}
        id={`${id}-input`}
        name={name}
        ref={ref}
        required={required}
        value={value}
        {...props}
      />
    </div>
  )
})

TextareaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string
}

TextareaInput.defaultProps = {
  required: false
}

export default TextareaInput
