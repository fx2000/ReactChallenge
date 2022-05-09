import React, {useState, useRef, useEffect} from 'react'
import styles from './Grid.module.scss'

import Reminder from '../Reminder'

import {ReactComponent as CrossIcon} from '../../../assets/cross.svg'

import {useClickOutside} from '../../../hooks/useClickOutside.js'

import {getCalendarDates} from '../../../utils/calendar.js'

import {
  format,
  isSameMonth,
  isSameDay,
  isWeekend
} from 'date-fns'

const Grid = ({
  reminderModal,
  setReminderModal,
  selectedReminder,
  addReminder,
  editReminder,
  selectedMonth,
  reminders,
  weekdays
}) => {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(null)
  const [dates, setDates] = useState([])
  const gridRef = useRef(null)

  // Deselect date when clicking outside of calendar
  useClickOutside(gridRef, () => setSelectedDate(null))

  // Update current month dates when selected month changes
  useEffect(() => {
    setDates(getCalendarDates(selectedMonth))
  }, [selectedMonth])

  return (
    <article className={styles.grid}>
      <Reminder
        reminderModal={reminderModal}
        setReminderModal={setReminderModal}
        selectedReminder={selectedReminder}
      />

      {/* Weekdays */}
      <div className={styles['grid__weekdays']}>
        {weekdays.map((weekday, index) =>
          <div className={styles['grid__weekdays__day']} key={index}>
            {weekday}
          </div>
        )}
      </div>

      {/* Days */}
      <div className={styles['grid__dates']} ref={gridRef}>
        {dates.map((element, index) =>
          <div
            className={
              styles['grid__dates__date'] +
              (isSameDay(element, today) ? ' ' + styles['grid__dates__date--today'] : '') +
              (!isSameMonth(element, selectedMonth) ? ' ' + styles['grid__dates__date--other'] : '') +
              (isWeekend(element) ? ' ' + styles['grid__dates__date--weekend'] : '') +
              (isSameDay(element, selectedDate) ? ' ' + styles['grid__dates__date--selected'] : '')
            }
            key={index}
            onClick={() => setSelectedDate(element)}
          >
            <div className={styles['grid__dates__date--header']}>
              {format(element, 'd')}
              {isSameDay(selectedDate, element) && (
                <button
                  aria-label={'Add reminder'}
                  className={styles['grid__dates__date--header__button']}
                  onClick={() => addReminder()}
                  title={'Add reminder'}
                >
                  <CrossIcon />
                </button>
              )}
            </div>
            {/* Reminders */}
            <ul className={styles['grid__dates__date--reminders']} >
              {reminders?.map((reminder, index) => {
                if (isSameDay(new Date(reminder?.date), element)) {
                  return (
                    <li key={index}>
                      <button
                        className={styles['grid__dates__date--reminder']}
                        onClick={() => editReminder(reminder)}
                      >
                        {reminder.title}
                      </button>
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Secondary Controls */}
      <div className={styles['grid__secondary-controls']}>
        <button
          className={styles['grid__secondary-controls__button']}
          onClick={() => addReminder()}
          title={'Add reminder'}
        >
          Add new reminder...
        </button>
      </div>
    </article>
  )
}

export default Grid
