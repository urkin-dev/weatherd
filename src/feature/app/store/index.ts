import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { weatherSlice } from '@feature/weather'

export const store = configureStore({
	reducer: { weather: weatherSlice }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
