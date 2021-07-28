import { http } from '@lib/http'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { store } from '@feature/app'
import { WeatherCurrentDataProps } from './weatherType'

type measurementType = 'metric' | 'imperial'
interface IStateProps {
	current: WeatherCurrentDataProps | null
	measurement: measurementType
	city: string
}

// Default State
const initialState: IStateProps = { current: null, measurement: 'metric', city: 'Moscow' }

export const getCurrentWeather = createAsyncThunk('weather/getCurrentWeather', async () => {
	const { measurement, city } = store.getState().weather

	const response = await http.get(`/weather?q=${city}&units=${measurement}&appid=${process.env.REACT_APP_API_KEY}`)
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
	}
})

export const { changeMeasurement, setCity } = weatherSlice.actions
export default weatherSlice.reducer
