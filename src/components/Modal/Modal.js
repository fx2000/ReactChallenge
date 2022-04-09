import React, {useCallback} from 'react'
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
              <img src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`} alt={'Weather forecast'} />
              <h4>{weather?.weather_state_name}</h4>
            </div>
          )}
          {acceptCallback && (
            <button
              className={styles['modal__footer__accept']}
              form={formId}
              type={'submit'}
              onClick={() => accept()}
            >
              {acceptLabel}
            </button>
          )}
          {cancelCallback && (
            <button className={styles['modal__footer__cancel']} type={'button'} onClick={() => close()}>
              {cancelLabel}
            </button>
          )}
        </div>
      </dialog>
    </div>
  )
}

export default Modal