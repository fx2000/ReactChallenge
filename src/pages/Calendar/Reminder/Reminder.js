import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './Reminder.module.scss'

import Modal from '../../../components/Modal'
import TextInput from '../../../components/TextInput'
import TextareaInput from '../../../components/TextareaInput'

import {getWeather} from '../../../services/visualCrossingService'
import {addReminder, editReminder} from '../../../services/calendarService'

import {useForm} from 'react-hook-form'
import {format} from 'date-fns'

const Reminder = ({
  reminderModal,
  selectedDate,
  selectedReminder,
  setReminderModal
}) => {
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState(null)

  const {register, reset, handleSubmit} = useForm()

  const onSubmit = async (formData) => {
    // If it's an existing reminder, set the ID
    formData.id = selectedReminder?.id || null

    // Add/update reminder to Calendar API
    const reminderFunction = selectedReminder ? editReminder : addReminder
    const response = await reminderFunction(formData)

    if (response?.data) {
      reset({})
      setWeather(null)
      setReminderModal(false)
    } else {
      setError(`Unable to ${selectedReminder ? 'edit' : 'add'} reminder, please try again`)
    }
  }

  useEffect(() => {
    const fetchWeather = async (city, date) => {
      const response = await getWeather(city, date)
      setWeather(response?.data?.days[0] ?? null)
    }

    if (selectedReminder) {
      if (selectedReminder?.city) fetchWeather(selectedReminder?.city, format(new Date(selectedReminder.date), 'yyyy-M-dd'))
      reset({
        title: selectedReminder?.title,
        description: selectedReminder?.description,
        date: selectedReminder?.date,
        city: selectedReminder?.city
      })
    }
  }, [selectedReminder, reset])

  return (
    <>
      {reminderModal && (
        <Modal
          acceptCallback={() => handleSubmit(onSubmit)}
          acceptLabel={selectedReminder ? 'Save' : 'Add'}
          cancelCallback={() => {
            reset({})
            setWeather(null)
            setReminderModal(false)
          }}
          cancelLabel={'Cancel'}
          formId={'add-reminder-form'}
          title={selectedReminder ? 'Reminder' : 'Add Reminder'}
          weather={weather}
        >
          {error && (
            <div className={styles['form__error']}>
              {error}
            </div>
          )}
          <form
            className={styles.form}
            id={'add-reminder-form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              id={'title'}
              label={'Title'}
              maxLength={30}
              name={'title'}
              required={true}
              type={'text'}
              {...register('title')}
            />
            <TextareaInput
              id={'description'}
              label={'Description'}
              maxLength={120}
              name={'description'}
              rows={5}
              {...register('description')}
            />
            <TextInput
              id={'date'}
              defaultValue={selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : null}
              label={'Date & Time'}
              name={'date'}
              required={true}
              type={'datetime-local'}
              {...register('date')}
            />
            <TextInput
              id={'city'}
              label={'City'}
              name={'city'}
              type={'text'}
              {...register('city')}
            />
          </form>
        </Modal>
      )}
    </>
  )
}

Reminder.propTypes = {
  reminderModal: PropTypes.bool.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  selectedReminder: PropTypes.object,
  setReminderModal: PropTypes.func.isRequired
}

Reminder.defaultProps = {
  reminderModal: false,
  selectedReminder: {}
}

export default Reminder
