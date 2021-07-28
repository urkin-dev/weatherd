import weatherSlice from './weatherSlice'
import { getCurrentWeather, changeMeasurement, setCity, fetchForecast } from './weatherSlice'
import { measurementType } from './weatherSlice'

export { weatherSlice, getCurrentWeather, changeMeasurement, setCity, fetchForecast }
export type { measurementType }
