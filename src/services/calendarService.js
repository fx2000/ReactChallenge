import {calendarApi} from '../config/api'

export const getReminders = () => {
  return calendarApi.get('reminders')
}

export const getRemindersByDate = (date) => {
  return calendarApi.get(`reminders?date=${date}`)
}

export const addReminder = (reminder) => {
  return calendarApi.post('reminders', reminder)
}

export const editReminder = (reminder) => {
  return calendarApi.put(`reminders/${reminder?.id}`, reminder)
}
