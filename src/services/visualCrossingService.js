import {visualCrossingApi} from '../config/api'

export const getWeather = async (city, date) => {
  try {
    const response = await visualCrossingApi.get(`services/timeline/${city}/${date}/${date}?unitGroup=metric&include=current&key=${process.env.REACT_APP_VISUAL_CROSSING_API_KEY}&contentType=json`)
    if (response.status === 201 || response.status === 200) {
      return response
    } else {
      return null
    }
  } catch(error) {
    console.error(error)
  }
}
