import { fetchForecast, getCurrentWeather } from '@feature/weather'
import { useAppDispatch } from '@lib/hooks'
import { persistentStorage } from '@lib/http'
import { PageTemplate } from '@ui'
import { setCity } from '@feature/weather'
import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { setCurrentCity } from '@lib/utils'

export const DEFAULT_CITY = 'Moscow'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		restoreSession()
	}, [])

	const restoreSession = async () => {
		const city = persistentStorage.getItem('CITY')

		if (city) {
			dispatch(setCity(city))
		} else {
			setCurrentCity(DEFAULT_CITY)
		}

		dispatch(getCurrentWeather())
		dispatch(fetchForecast())
	}

	return <PageTemplate left={<Sidebar />} right={<p>Content</p>} />
}

export default App
