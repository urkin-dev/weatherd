import { getCurrentWeather } from '@feature/weather'
import { useAppDispatch } from '@lib/hooks'
import { persistentStorage } from '@lib/http'
import { PageTemplate } from '@ui'
import { setCity } from '@feature/weather'
import { useEffect } from 'react'
import Sidebar from './components/Sidebar'

const DEFAULT_CITY = 'Moscow'

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
			persistentStorage.setItem('CITY', DEFAULT_CITY)
		}

		dispatch(getCurrentWeather())
	}

	return <PageTemplate left={<Sidebar />} right={<p>Content</p>} />
}

export default App
