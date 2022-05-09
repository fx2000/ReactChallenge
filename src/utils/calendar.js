import {
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek
} from 'date-fns'

// Get dates in current calendar month and adjacent dates
const getCalendarDates = (date) => {
  const startDate = startOfMonth(date)
  const endDate = endOfMonth(date)
  const startDay = startOfWeek(startDate)
  const endDay = endOfWeek(endDate)
  const dates = []
  let currentDate = startDay

  while (currentDate <= endDay) {
    dates.push(currentDate)
    currentDate = addDays(currentDate, 1)
  }

  return dates
}

// Get dates in current calendar month
const getDates = (date) => {
  const startDate = startOfMonth(date)
  const endDate = endOfMonth(date)
  const dates = []
  let currentDate = startDate

  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate = addDays(currentDate, 1)
  }

  return dates
}

export {
  getCalendarDates,
  getDates
}
