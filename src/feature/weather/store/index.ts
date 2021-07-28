import weatherSlice from './weatherSlice'
import { getCurrentWeather, changeMeasurement, setCity, fetchForecast, getCoords, updateCity } from './weatherSlice'
import { measurementType, ICity } from './weatherSlice'

export { weatherSlice, getCurrentWeather, changeMeasurement, setCity, fetchForecast, getCoords, updateCity }
export type { measurementType, ICity }
