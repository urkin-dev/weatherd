import { useAppDispatch } from '@lib/hooks'
import { persistentStorage } from '@lib/http'
import { PageTemplate } from '@ui'
import { Content, setCity } from '@feature/weather'
import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { setCurrentCity } from '@lib/utils'
import { getWeather } from '@feature/weather'

export const DEFAULT_CITY = {
	name: 'Moscow',
	lat: 55.7522,
	lon: 37.6156
}

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		restoreSession()
	}, [])

	const restoreSession = async () => {
		const city = persistentStorage.getItem('CITY')
		const lat = Number(persistentStorage.getItem('LAN'))
		const lon = Number(persistentStorage.getItem('LON'))

		if (city && lat && lon) {
			dispatch(setCity({ name: city, lat, lon }))
		} else {
			setCurrentCity(DEFAULT_CITY)
		}

		dispatch(getWeather())
	}

	return <PageTemplate left={<Sidebar />} right={<Content />} />
}

export default App
