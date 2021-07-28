import { geoHttp, http } from '@lib/http'
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { store } from '@feature/app'
import { ForecastListItem, ILocation, WeatherCurrentDataProps, WeatherForecastDataProps } from './weatherTypes'
import { setCurrentCity } from '@lib/utils'

export type measurementType = 'metric' | 'imperial'

export interface ICity {
	name: string
	lat: number
	lon: number
}

// Default State
interface IStateProps {
	current: WeatherCurrentDataProps | null
	measurement: measurementType
	forecast: WeatherForecastDataProps | null
	city: ICity
	nearestForecast: ForecastListItem | null
	error: SerializedError | null
}
// We need nearestForecast because probability of precipitation is not stored inside CurrentWeather in OpenWeatherMap API
const initialState: IStateProps = {
	current: null,
	forecast: null,
	measurement: 'metric',
	city: {
		name: 'Moscow',
		lat: 55.7522,
		lon: 37.6156
	},
	nearestForecast: null,
	error: null
}

export const getCurrentWeather = createAsyncThunk('weather/getCurrentWeather', async (newCity?: ICity) => {
	const { measurement } = store.getState().weather

	if (!newCity) {
		newCity = store.getState().weather.city
	}

	const response = await http.get<WeatherCurrentDataProps>(
		`/weather?q=${newCity.name}&units=${measurement}&appid=${process.env.REACT_APP_API_KEY}`
	)

	return response.data
})

export const fetchForecast = createAsyncThunk('weather/fetchForecast', async (newCity?: ICity) => {
	const { measurement } = store.getState().weather

	if (!newCity) {
		newCity = store.getState().weather.city
	}
	const response = await http.get<WeatherForecastDataProps>(
		`forecast?q=${newCity.name}&units=${measurement}&appid=${process.env.REACT_APP_API_KEY}`
	)
	return response.data
})

export const getCoords = createAsyncThunk('weather/getCoords', async (cityName: string) => {
	const response = await geoHttp.get<ILocation[]>(`direct?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`)

	return response.data
})

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		changeMeasurement: {
			reducer: (state, action: PayloadAction<{ measurement: measurementType }>) => {
				state.measurement = action.payload.measurement
			},
			prepare: (measurement: measurementType) => {
				return { payload: { measurement } }
			}
		},
		setCity: (state, action: PayloadAction<ICity>) => {
			state.city = action.payload
		},

		updateCity: (state) => {
			state.city = Object.assign({}, state.city)
			setCurrentCity(state.city)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeather.rejected, (state, action) => {
			state.error = action.error
		})
		builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
			state.current = action.payload
			state.error = null
		})
		builder.addCase(fetchForecast.rejected, (state, action) => {
			state.error = action.error
		})
		builder.addCase(fetchForecast.fulfilled, (state, action) => {
			state.forecast = action.payload
			console.log(action.payload)
			state.nearestForecast = action.payload.list[0]
			state.error = null
		})
		builder.addCase(getCoords.fulfilled, (state, action) => {
			const location = action.payload[0]
			state.city.name = location.name
			state.city.lat = location.lat
			state.city.lon = location.lon
		})
		builder.addCase(getCoords.rejected, (state, action) => {
			state.error = action.error
		})
	}
})

export const { changeMeasurement, setCity, updateCity } = weatherSlice.actions
export default weatherSlice.reducer
