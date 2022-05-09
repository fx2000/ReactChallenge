import {visualCrossingApi} from '../config/api'

export const getWeather = (city, date) => {
  return visualCrossingApi.get(`services/timeline/${city}/${date}/${date}?unitGroup=metric&include=current&key=${process.env.REACT_APP_VISUAL_CROSSING_API_KEY}&contentType=json`)
}
