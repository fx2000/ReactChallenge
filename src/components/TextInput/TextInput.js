import React from 'react'
import PropTypes from 'prop-types'
import styles from './TextInput.module.scss'

/**
 * Standard text input component
 * A ref is forwarded to the input element for compatibility with react-hook-form
 */
const TextInput = React.forwardRef(({
  id,
  label,
  name,
  required,
  type,
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
      <input
        aria-label={label}
        aria-required={required}
        className={styles['input__field']}
        id={`${id}-input`}
        name={name}
        ref={ref}
        required={required}
        type={type}
        value={value}
        {...props}
      />
    </div>
  )
})

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'datetime-local']),
  value: PropTypes.string
}

TextInput.defaultProps = {
  required: false,
  type: 'text'
}

export default TextInput
