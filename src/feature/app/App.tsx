import { useAppDispatch, useAppSelector } from '@lib/hooks'
import { persistentStorage } from '@lib/http'
import { PageTemplate } from '@ui'
import { Content, setCity } from '@feature/weather'
import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { setCurrentCity } from '@lib/utils'
import { getWeather } from '@feature/weather'
import { Spin } from 'antd'
import { styled } from '@linaria/react'

export const DEFAULT_CITY = {
	name: 'Moscow',
	lat: 55.7522,
	lon: 37.6156
}

function App() {
	const dispatch = useAppDispatch()
	const loading = useAppSelector((state) => state.weather.loading)

	useEffect(() => {
		if (loading === 'idle') {
			restoreSession()
		}
	}, [loading, dispatch])

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

	return (
		<StyledSpin spinning={loading === 'loading'} size="large">
			<PageTemplate left={<Sidebar />} right={<Content />} />
		</StyledSpin>
	)
}

// Center spin loader
const StyledSpin = styled(Spin)`
	top: 50% !important;
	transform: translateY(-50%);
`

export default App
