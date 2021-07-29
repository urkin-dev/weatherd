import { geoHttp, http } from '@lib/http'
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { store } from '@feature/app'
import { ICurrent, IDailyItem, ILocation, IWeatherData } from './weatherTypes'
import { setCurrentCity } from '@lib/utils'

export type measurementType = 'metric' | 'imperial'

export interface ICity {
	name: string
	lat: number
	lon: number
}

// Default State
interface IStateProps {
	loading: 'idle' | 'loading' | 'succeeded' | 'failed'
	current: ICurrent | null
	measurement: measurementType
	forecast: IDailyItem[] | null
	city: ICity
	nearestForecast: IDailyItem | null
	error: SerializedError | null
}
// We need nearestForecast because probability of precipitation is not stored inside CurrentWeather in OpenWeatherMap API
const initialState: IStateProps = {
	loading: 'idle',
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

export const getWeather = createAsyncThunk('weather/getWeather', async () => {
	const { measurement, city } = store.getState().weather

	const response = await http.get<IWeatherData>(
		`/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=${measurement}`
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
		builder.addCase(getCoords.fulfilled, (state, action) => {
			const location = action.payload[0]

			if (location) {
				state.city.name = location.name
				state.city.lat = location.lat
				state.city.lon = location.lon
				state.loading = 'succeeded'
				state.error = null
			} else {
				state.error = { message: 'City not found', code: '404', name: 'Error' }
			}
		})
		builder.addCase(getCoords.pending, (state, action) => {
			state.loading = 'loading'
		})
		builder.addCase(getCoords.rejected, (state, action) => {
			state.error = action.error
			state.loading = 'failed'
		})
		builder.addCase(getWeather.rejected, (state, action) => {
			state.error = action.error
			state.loading = 'failed'
		})
		builder.addCase(getWeather.fulfilled, (state, action) => {
			state.current = action.payload.current
			state.forecast = action.payload.daily
			state.nearestForecast = action.payload.daily[0]

			// Because we can't get normal code from getWeather rejected. Redux just doesn't take thunkApi argument without first arguent
			if (state.error && state.error.name !== 'Error') {
				state.error = null
			}

			state.loading = 'succeeded'
		})
		builder.addCase(getWeather.pending, (state, action) => {
			state.loading = 'loading'
		})
	}
})

export const { changeMeasurement, setCity, updateCity } = weatherSlice.actions
export default weatherSlice.reducer
