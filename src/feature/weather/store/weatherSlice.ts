import { http } from '@lib/http'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { store } from '@feature/app'
import { ForecastListItem, WeatherCurrentDataProps, WeatherForecastDataProps } from './weatherType'

export type measurementType = 'metric' | 'imperial'

// Default State
interface IStateProps {
	current: WeatherCurrentDataProps | null
	measurement: measurementType
	forecast: WeatherForecastDataProps | null
	city: string
	nearestForecast: ForecastListItem | null
}
// We need nearestForecast because probability of precipitation is not stored inside CurrentWeather in OpenWeatherMap API
const initialState: IStateProps = {
	current: null,
	forecast: null,
	measurement: 'metric',
	city: 'Moscow',
	nearestForecast: null
}

export const getCurrentWeather = createAsyncThunk('weather/getCurrentWeather', async () => {
	const { measurement, city } = store.getState().weather

	const response = await http.get<WeatherCurrentDataProps>(
		`/weather?q=${city}&units=${measurement}&appid=${process.env.REACT_APP_API_KEY}`
	)
	return response.data
})

export const fetchForecast = createAsyncThunk('weather/fetchForecast', async () => {
	const { measurement, city } = store.getState().weather

	const response = await http.get<WeatherForecastDataProps>(
		`forecast?q=${city}&units=${measurement}&appid=${process.env.REACT_APP_API_KEY}`
	)
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
		setCity: {
			reducer: (state, action: PayloadAction<{ city: string }>) => {
				state.city = action.payload.city
			},
			prepare: (city: string) => {
				return { payload: { city } }
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeather.rejected, (state, action) => {
			console.log(action.error.message)
		})
		builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
			state.current = action.payload
		})
		builder.addCase(fetchForecast.rejected, (state, action) => {
			console.log(action.error.message)
		})
		builder.addCase(fetchForecast.fulfilled, (state, action) => {
			state.forecast = action.payload
			state.nearestForecast = action.payload.list[0]
		})
	}
})

export const { changeMeasurement, setCity } = weatherSlice.actions
export default weatherSlice.reducer
