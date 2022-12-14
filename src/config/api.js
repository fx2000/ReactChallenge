import axios from 'axios'

export const calendarApi = axios.create({
  baseURL: 'http://localhost:3002',
  proxy: 'https://enigmatic-shore-11880.herokuapp.com'
})

export const visualCrossingApi = axios.create({
  baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/'
})
