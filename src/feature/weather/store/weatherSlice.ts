import { http } from '@lib/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const getCurrentWeather = createAsyncThunk('weather/getCurrentWeather', async (city: string) => {
	const response = await http.get(`/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
	return response.data
})

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeather.rejected, (state, action) => {
			console.log(action.error.message)
		})
		builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
			return {
				...state,
				...(action.payload as {})
			}
		})
	}
})

export default weatherSlice.reducer
