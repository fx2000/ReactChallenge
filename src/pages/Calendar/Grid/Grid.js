import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './Grid.module.scss'

import Reminder from '../Reminder'

import {ReactComponent as CrossIcon} from '../../../assets/cross.svg'

import {useClickOutside} from '../../../hooks/useClickOutside.js'

import {getCalendarDates} from '../../../utils/calendar.js'

import {
  format,
  isSameDay,
  isSameMonth,
  isWeekend
} from 'date-fns'

/**
 * Grid layout Calendar page
 */
const Grid = ({
  addReminder,
  editReminder,
  reminderModal,
  reminders,
  selectedMonth,
  selectedReminder,
  setReminderModal,
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
        selectedDate={selectedDate}
        selectedReminder={selectedReminder}
        setReminderModal={setReminderModal}
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
                        <span>{reminder.title}</span>
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

Grid.propTypes = {
  addReminder: PropTypes.func.isRequired,
  editReminder: PropTypes.func.isRequired,
  reminderModal: PropTypes.bool.isRequired,
  reminders: PropTypes.array,
  selectedMonth: PropTypes.instanceOf(Date).isRequired,
  selectedReminder: PropTypes.object,
  setReminderModal: PropTypes.func.isRequired,
  weekdays: PropTypes.array.isRequired
}

Grid.defaultProps = {
  reminderModal: false,
  reminders: [],
  selectedReminder: {},
  weekdays: []
}

export default Grid
