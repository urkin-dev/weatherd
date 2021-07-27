import { getCurrentWeather } from '@feature/weather'
import { persistentStorage } from '@lib/http'
import { PageTemplate } from '@ui'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Sidebar from './components/Sidebar'

const DEFAULT_CITY = 'Moscow'

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		restoreSession()
	}, [])

	const restoreSession = async () => {
		const city = persistentStorage.getItem('CITY')

		if (city) {
			dispatch(getCurrentWeather(city))
		} else {
			dispatch(getCurrentWeather(DEFAULT_CITY))
			persistentStorage.setItem('CITY', DEFAULT_CITY)
		}
	}

	return <PageTemplate left={<Sidebar />} right={<p>Content</p>} />
}

export default App
