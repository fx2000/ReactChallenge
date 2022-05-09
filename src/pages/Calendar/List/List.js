import React, {useState, useEffect, useRef} from 'react'
import styles from './List.module.scss'

import Reminder from '../Reminder'

import {ReactComponent as CrossIcon} from '../../../assets/cross.svg'

import {useClickOutside} from '../../../hooks/useClickOutside.js'

import {getDates} from '../../../utils/calendar.js'

import {
  format,
  isSameDay,
  isWeekend
} from 'date-fns'

const List = ({
  reminderModal,
  setReminderModal,
  selectedReminder,
  addReminder,
  editReminder,
  selectedMonth,
  reminders
}) => {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(null)
  const [dates, setDates] = useState([])
  const listRef = useRef(null)

  // Deselect date when clicking outside of calendar
  useClickOutside(listRef, () => setSelectedDate(null))

  // Update current month dates when selected month changes
  useEffect(() => {
    setDates(getDates(selectedMonth))
  }, [selectedMonth])

  return (
    <article className={styles.list}>
      <Reminder
        reminderModal={reminderModal}
        setReminderModal={setReminderModal}
        selectedReminder={selectedReminder}
      />

      {/* Secondary Controls */}
      <div className={styles['list__secondary-controls']}>
        <button
          className={styles['list__secondary-controls__button']}
          onClick={() => addReminder()}
          title={'Add reminder'}
        >
          Add new reminder...
        </button>
      </div>

      <ul className={styles['list__dates']} ref={listRef}>
        {dates?.map((element, index) => (
          <li
            className={
              styles['list__dates__date'] +
              (isSameDay(element, today) ? ' ' + styles['list__dates__date--today'] : '') +
              (isWeekend(element) ? ' ' + styles['list__dates__date--weekend'] : '') +
              (isSameDay(element, selectedDate) ? ' ' + styles['list__dates__date--selected'] : '')
            }
            key={index}
            onClick={() => setSelectedDate(element)}
          >
            <div className={styles['list__dates__date--header']}>
              <h2>{format(element, 'PPPP')}</h2>
              {isSameDay(selectedDate, element) && (
                <button
                  aria-label={'Add reminder'}
                  className={styles['list__dates__date--header__button']}
                  onClick={() => addReminder()}
                  title={'Add reminder'}
                >
                  <CrossIcon />
                </button>
              )}
            </div>

            {/* Reminders */}
            <ul className={styles['list__dates__date--reminders']} >
              {reminders?.map((reminder, index) => {
                if (isSameDay(new Date(reminder?.date), element)) {
                  return (
                    <li key={index}>
                      <button
                        className={styles['list__dates__date--reminder']}
                        onClick={() => editReminder(reminder)}
                      >
                        <span>{format(new Date(reminder?.date), 'p')}</span>
                        <span>{reminder.title}</span>
                      </button>
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default List