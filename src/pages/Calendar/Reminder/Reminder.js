import React, {useState, useEffect} from 'react'
import Modal from '../../../components/Modal'
import styles from './Reminder.module.scss'
import TextInput from '../../../components/TextInput'
import TextareaInput from '../../../components/TextareaInput'
import {getWoeid, getWeatherLocationDate} from '../../../services/metaWeatherService'
import {addReminder, editReminder} from '../../../services/calendarService'
import {useForm} from 'react-hook-form'

import {format} from 'date-fns'

const Reminder = ({
  reminderModal,
  selectedReminder,
  setReminderModal
}) => {
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState(null)

  const {register, reset, handleSubmit} = useForm()

  const onSubmit = async (formData) => {
    // If it's an existing reminder, set the ID
    formData.id = selectedReminder?.id || null

    // Get woeid value from Weather API if a city was specified
    if (formData.city !== '') {
      const {data} = await getWoeid(formData.city)
      formData.woeid = data[0]?.woeid ?? null
    }

    // Add/update reminder to Calendar API
    const reminderFunction = selectedReminder ? editReminder : addReminder
    const response = await reminderFunction(formData)
    if (response.status === 201 || response.status === 200) {
      reset({})
      setWeather(null)
      setReminderModal(false)
    } else {
      setError('Unable to add reminder, please try again')
    }
  }

  useEffect(() => {
    const fetchWeather = async (woeid, date) => {
      const {data} = await getWeatherLocationDate(woeid, date)
      setWeather(data[0])
    }

    if (selectedReminder) {
      fetchWeather(selectedReminder.woeid, format(new Date(selectedReminder.date), 'yyyy/M/dd'))
      reset({
        title: selectedReminder.title,
        description: selectedReminder.description,
        date: selectedReminder.date,
        city: selectedReminder.city,
        woeid: selectedReminder.woeid
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
          title={selectedReminder ? 'Reminder' : 'Add Reminder'}
          formId={'add-reminder-form'}
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
              label={'Title'}
              name={'title'}
              type={'text'}
              required={true}
              maxLength={30}
              {...register('title')}
            />
            <TextareaInput
              label={'Description'}
              name={'description'}
              rows={5}
              maxLength={120}
              {...register('description')}
            />
            <TextInput
              label={'Date & Time'}
              name={'date'}
              type={'datetime-local'}
              required={true}
              {...register('date')}
            />
            <TextInput
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

export default Reminder
