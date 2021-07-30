import weatherSlice from './weatherSlice'
import {
	changeMeasurement,
	setCity,
	getCoords,
	updateCity,
	getWeather,
	setError,
	getCityByCoords,
	ICoords,
	setLoading
} from './weatherSlice'
import { measurementType, ICity } from './weatherSlice'
import { IDailyItem } from './weatherTypes'

export {
	weatherSlice,
	changeMeasurement,
	setCity,
	getCoords,
	updateCity,
	getWeather,
	setError,
	getCityByCoords,
	setLoading
}
export type { measurementType, ICity, IDailyItem, ICoords }
