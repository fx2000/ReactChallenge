// Sort reminders by date
const sortReminders = (reminders) => {
  return reminders.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateA - dateB
  })
}

export {
  sortReminders
}
