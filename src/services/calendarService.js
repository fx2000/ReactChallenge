import {calendarApi} from '../config/api'

export const getReminders = async () => {
  try {
    const response = await calendarApi.get('/reminders')
    if (response.status === 201 || response.status === 200) {
      return response
    } else {
      return null
    }
  } catch(error) {
    throw new Error(error)
  }
}

export const getRemindersByDate = async (date) => {
  try {
    const response = await calendarApi.get(`reminders?date=${date}`)
    if (response.status === 201 || response.status === 200) {
      return response
    } else {
      return null
    }
  } catch(error) {
    throw new Error(error)
  }
}

export const addReminder = async (reminder) => {
  try {
    const response = await calendarApi.post('reminders', reminder)
    if (response.status === 201 || response.status === 200) {
      return response
    } else {
      return null
    }
  } catch(error) {
    throw new Error(error)
  }
}

export const editReminder = async (reminder) => {
  try {
    const response = await calendarApi.put(`reminders/${reminder?.id}`, reminder)
    if (response.status === 201 || response.status === 200) {
      return response
    } else {
      return null
    }
  } catch(error) {
    throw new Error(error)
  }
}
