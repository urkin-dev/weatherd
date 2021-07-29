import weatherSlice from './weatherSlice'
import { changeMeasurement, setCity, getCoords, updateCity, getWeather } from './weatherSlice'
import { measurementType, ICity } from './weatherSlice'
import { IDailyItem } from './weatherTypes'

export { weatherSlice, changeMeasurement, setCity, getCoords, updateCity, getWeather }
export type { measurementType, ICity, IDailyItem }
