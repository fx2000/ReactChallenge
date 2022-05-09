import React, {useState, useEffect} from 'react'
import styles from './Calendar.module.scss'

import Grid from './Grid'
import List from './List'

import {ReactComponent as ChevronLeft} from '../../assets/chevronLeft.svg'
import {ReactComponent as ChevronRight} from '../../assets/chevronRight.svg'

import {getReminders} from '../../services/calendarService.js'

import {sortReminders} from '../../utils/reminders.js'

import {useWindowSize} from '../../hooks/useWindowSize'

import {
  startOfWeek,
  addDays,
  format,
  addMonths,
  subMonths
} from 'date-fns'

/**
 * Main Calendar page
 */
const Calendar = () => {
  const today = new Date()
  const {width} = useWindowSize()
  const [layout, setLayout] = useState(width > 768 ? 'grid' : 'list')
  const [reminders, setReminders] = useState([])
  const [reminderModal, setReminderModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(today)
  const [selectedReminder, setSelectedReminder] = useState(null)

  // Get reminders from API
  useEffect(() => {
    let isCancelled = false

    const fetchData = async () => {
      try {
        const {data} = await getReminders()
        if (!isCancelled) {
          setReminders(sortReminders(data))
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    // Only fetch data if the reminder modal is closed
    if (!reminderModal) fetchData()

    return () => {
      isCancelled = true
    }
  }, [reminderModal])

  // Set layout according to window size
  useEffect(() => {
    setLayout(width > 768 ? 'grid' : 'list')
  }, [width])

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

  // Get days of the week
  const weekdays = Array.from(Array(7)).map(
    (_element, index) => format(addDays(startOfWeek(new Date()), index), 'EEE')
  )

  // Go to previous month
  const prev = () => {
    setSelectedMonth(prevState => subMonths(prevState, 1))
  }

  // Go to next month
  const next = () => {
    setSelectedMonth(prevState => addMonths(prevState, 1))
  }

  return (
    <article className={styles.calendar}>
      {/* Controls */}
      <div className={styles['calendar__controls']}>
        <button
          aria-label={'Previous month'}
          className={styles['calendar__controls__button']}
          onClick={() => prev()}
          title={'Previous month'}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <h1>{format(selectedMonth, 'MMMM yyyy')}</h1>
        <button
          aria-label={'Next month'}
          className={styles['calendar__controls__button']}
          onClick={() => next()}
          title={'Next month'}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      {layout === 'grid' && (
        <Grid
          reminderModal={reminderModal}
          setReminderModal={setReminderModal}
          selectedReminder={selectedReminder}
          addReminder={addReminder}
          editReminder={editReminder}
          reminders={reminders}
          selectedMonth={selectedMonth}
          prev={prev}
          next={next}
          weekdays={weekdays}
        />
      )}

      {layout === 'list' && (
        <List
          reminderModal={reminderModal}
          setReminderModal={setReminderModal}
          selectedReminder={selectedReminder}
          addReminder={addReminder}
          editReminder={editReminder}
          reminders={reminders}
          selectedMonth={selectedMonth}
          prev={prev}
          next={next}
          weekdays={weekdays}
        />
      )}
    </article>
  )
}

export default Calendar
