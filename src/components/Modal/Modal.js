import React, {useCallback, useEffect} from 'react'
import styles from './Modal.module.scss'
import {ReactComponent as CloseIcon} from '../../assets/cross.svg'

const Modal = ({
  title,
  children,
  acceptLabel,
  acceptCallback,
  cancelLabel,
  cancelCallback,
  formId,
  weather
}) => {

  // Close modal
  const close = useCallback(() => {
    cancelCallback()
  }, [cancelCallback])

  // Accept modal
  const accept = useCallback(() => {
    acceptCallback()
  }, [acceptCallback])

  // Close modal when pressing ESC key
  useEffect(() => {
    const esc = (event) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', esc, false);

    return () => {
      document.removeEventListener('keydown', esc, false);
    }
  }, [])

  return (
    <div className={styles['modal__background']}>
      <dialog className={styles['modal__container']}>
        <div className={styles['modal__header']}>
          <h2 className={styles['modal__title']}>{title}</h2>
          <button className={styles['modal__close-button']} onClick={() => close()}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles['modal__content']}>
          {children}
        </div>
        <div className={styles['modal__footer']}>
          {weather && (
            <div className={styles['modal__footer__weather']}>
              <img src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${weather.icon}.svg`} alt={`${weather.conditions ?? 'Weather'} icon`} />
              <h4>{weather.conditions ?? ''}</h4>
            </div>
          )}
          <div className={styles['modal__footer__buttons']}>
            {acceptCallback && (
              <button
                className={styles['modal__footer__buttons--accept']}
                form={formId}
                type={'submit'}
                onClick={() => accept()}
              >
                {acceptLabel}
              </button>
            )}
            {cancelCallback && (
              <button className={styles['modal__footer__buttons--cancel']} type={'button'} onClick={() => close()}>
                {cancelLabel}
              </button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Modal
