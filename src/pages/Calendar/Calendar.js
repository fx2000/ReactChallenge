import React, {useState, useEffect, useRef} from 'react'
import styles from './Calendar.module.scss'
import {ReactComponent as ChevronLeft} from '../../assets/chevronLeft.svg'
import {ReactComponent as ChevronRight} from '../../assets/chevronRight.svg'
import {getCalendarDates} from '../../utils/calendar.js'
import {getReminders} from '../../services/calendarService.js'
import {useClickOutside} from '../../hooks/useClickOutside.js'
import Reminder from './Reminder'

import {
  startOfWeek,
  addDays,
  format,
  isSameMonth,
  addMonths,
  subMonths,
  isSameDay,
  isWeekend
} from 'date-fns'

const Calendar = () => {
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(today)
  const [selectedDate, setSelectedDate] = useState(null)
  const [dates, setDates] = useState([])
  const [reminders, setReminders] = useState([])
  const [reminderModal, setReminderModal] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState(null)
  const calendarRef = useRef(null)

  // Deselect date when clicking outside of calendar
  useClickOutside(calendarRef, () => setSelectedDate(null))

  // Get days of the week
  const weekdays = Array.from(Array(7)).map(
    (_element, index) => format(addDays(startOfWeek(new Date()), index), 'EEE')
  )

  // Get reminders from API
  useEffect(() => {
    let isCancelled = false

    const fetchData = async () => {
      try {
        const {data} = await getReminders()
        if (!isCancelled) {
          setReminders(data)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    if (!reminderModal) fetchData()

    return () => {
      isCancelled = true
    }
  }, [reminderModal])

  // Update current month dates when selected month changes
  useEffect(() => {
    setDates(getCalendarDates(selectedMonth))
  }, [selectedMonth])

  // Go to previous month
  const prev = () => {
    setSelectedMonth(prevState => subMonths(prevState, 1))
  }

  // Go to next month
  const next = () => {
    setSelectedMonth(prevState => addMonths(prevState, 1))
  }

  // Add a new reminder
  const addReminder = () => {
    setSelectedReminder(null)
    setReminderModal(true)
  }

  // Edit an existing reminder
  const editReminder = (reminder) => {
    setSelectedReminder(reminder)
    setReminderModal(true)
  }

  return (
    <article className={styles.calendar}>

      <Reminder
        reminderModal={reminderModal}
        setReminderModal={setReminderModal}
        selectedReminder={selectedReminder}
      />

      {/* Controls */}
      <div className={styles['calendar__controls']}>
        <button
          className={styles['calendar__controls__button']}
          onClick={() => prev()}
        >
          <ChevronLeft />
        </button>
        <h1>{format(selectedMonth, 'MMMM yyyy')}</h1>
        <button
          className={styles['calendar__controls__button']}
          onClick={() => next()}
        >
          <ChevronRight />
        </button>
      </div>

      {/* Weekdays */}
      <div className={styles['calendar__weekdays']}>
        {weekdays.map((weekday, index) =>
          <div className={styles['calendar__weekdays__day']} key={index}>
            {weekday}
          </div>
        )}
      </div>

      {/* Days */}
      <div className={styles['calendar__dates']} ref={calendarRef}>
        {dates.map((element, index) =>
          <div
            className={
              styles['calendar__dates__date'] +
              (isSameDay(element, today) ? ' ' + styles['calendar__dates__date--today'] : '') +
              (!isSameMonth(element, selectedMonth) ? ' ' + styles['calendar__dates__date--other'] : '') +
              (isWeekend(element) ? ' ' + styles['calendar__dates__date--weekend'] : '') +
              (isSameDay(element, selectedDate) ? ' ' + styles['calendar__dates__date--selected'] : '')
            }
            key={index}
            onClick={() => setSelectedDate(element)}
          >
            {format(element, 'd')}
            {reminders?.map((reminder, index) => {
              if (isSameDay(new Date(reminder?.date), element)) {
                return (
                  <div
                    className={styles['calendar__dates__date--reminder']}
                    key={index}
                    role={'button'}
                    onClick={() => editReminder(reminder)}
                  >
                    {reminder.title}
                  </div>
                )
              }
              return null
            })}
          </div>
        )}
      </div>

      {/* Secondary Controls */}
      <div className={styles['calendar__secondary-controls']}>
        <button
          className={styles['calendar__secondary-controls__button']}
          onClick={() => addReminder()}
        >
          Add new reminder...
        </button>
      </div>
    </article>
  )
}

export default Calendar
