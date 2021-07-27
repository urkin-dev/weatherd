import { http } from '@lib/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const getCurrentWeather = createAsyncThunk('weather/getCurrentWeather', async () => {
	const response = await http.get(`/weather?q=Moscow&appid=${process.env.REACT_APP_API_KEY}}`)
	return response.data
})

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
			console.log(action.payload)
		})
	}
})

export default weatherSlice.reducer
