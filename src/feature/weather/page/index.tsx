import { changeMeasurement, getWeather, measurementType } from '@feature/weather'
import { useAppDispatch, useAppSelector } from '@lib/hooks'
import { styled } from '@linaria/react'
import DegreeSwitch from './components/DegreeSwitch'
import ForecastList from './components/ForecastList'

export default function Content() {
	const weatherStore = useAppSelector((state) => state.weather)
	const dispatch = useAppDispatch()
	const measurement = useAppSelector((state) => state.weather.measurement)

	const switchMeasurement = (measurementLetter: string) => {
		let newMeasurement: measurementType

		if (measurementLetter === 'C') {
			newMeasurement = 'metric'
		} else if (measurementLetter === 'F') {
			newMeasurement = 'imperial'
		} else {
			newMeasurement = 'metric'
		}

		if (newMeasurement !== measurement) {
			dispatch(changeMeasurement(newMeasurement))
			dispatch(getWeather())
		}
	}

	return (
		<ContentContainer>
			<DegreeSwitch onClick={switchMeasurement} active={measurement === 'metric' ? 'C' : 'F'} />
			{weatherStore.forecast && <ForecastList forecastData={weatherStore.forecast} />}
		</ContentContainer>
	)
}

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 30px;
	padding-right: 30px;
`
