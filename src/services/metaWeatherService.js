import {metaWeatherApi} from '../config/api'

export const getWoeid = (location) => {
  return metaWeatherApi.get(`/location/search/?query=${location}`)
}

export const getWeatherLocation = (woeid) => {
  return metaWeatherApi.get(`/location/${woeid}`)
}

export const getWeatherLocationDate = (woeid, date) => {
  return metaWeatherApi.get(`/location/${woeid}/${date}`)
}
