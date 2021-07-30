import { Icon } from '@feature/app'
import { changeMeasurement, getWeather, measurementType } from '@feature/weather'
import { useAppDispatch, useAppSelector } from '@lib/hooks'
import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import DegreeSwitch from './components/DegreeSwitch'
import ForecastList from './components/ForecastList'
import HighlightsCard from './components/HighlightsCard'
import { fromUnixTime, format } from 'date-fns'

export default function Content() {
	const weatherStore = useAppSelector((state) => state.weather)
	const dispatch = useAppDispatch()
	const measurement = useAppSelector((state) => state.weather.measurement)

	const getStatus = (value: number, title: string) => {
		title = title.trim().toLowerCase()
		if (title === 'humidity') {
			if (value >= 30 && value <= 50) return 'Normal'
			else if (value < 30) return 'Low'
			else return 'High'
		} else if (title === 'wind speed') {
			if (value >= 6 && value <= 14) return 'Normal'
			else if (value < 6) return 'Low'
			else if (value <= 25) return 'Hight'
			else return 'Dangerous'
		} else if (title === 'visibility') {
			if (value >= 10) return 'Normal'
			else return 'Low'
		}
	}

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
			<SectionTitle>Today's Highlights</SectionTitle>
			<CardSection>
				{weatherStore.current && (
					<>
						<HighlightsCard
							title="Visibility"
							mainValue={Number(weatherStore.current.visibility) / 1000}
							valuePrefix="km"
							status={getStatus(Number(weatherStore.current.visibility) / 1000, 'Visibility')}
						/>
						<HighlightsCard
							title="Humidity"
							mainValue={Number(weatherStore.current.humidity)}
							valuePrefix="%"
							status={getStatus(Number(weatherStore.current.humidity), 'Humidity')}
						/>
						<HighlightsCard
							title="Wind speed"
							mainValue={Number(weatherStore.current.wind_speed)}
							valuePrefix={weatherStore.measurement === 'metric' ? 'met/sec' : 'mil/hour'}
							status={getStatus(Number(weatherStore.current.wind_speed), 'Wind speed')}
						/>
						<HighlightsCard title="Pressure" mainValue={Number(weatherStore.current.pressure)} valuePrefix="hPa" />
						<HighlightsCard title="Sunrize & Sunset">
							<>
								<SunValueContainer>
									<SunIcon>
										<Icon name="01d" />
									</SunIcon>
									<SunValue>{format(fromUnixTime(weatherStore.current.sunrise), 'H:mm aa')}</SunValue>
								</SunValueContainer>
								<SunValueContainer>
									<SunIcon>
										<Icon name="sunset" />
									</SunIcon>
									<SunValue>{format(fromUnixTime(weatherStore.current.sunset), 'H:mm aa')}</SunValue>
								</SunValueContainer>
							</>
						</HighlightsCard>
					</>
				)}
			</CardSection>
		</ContentContainer>
	)
}

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 30px;
	padding-right: 30px;
`

const SectionTitle = styled.h3`
	color: ${theme.color.black};
	font-size: ${theme.font.size.large}px;
	padding: 0;
	margin: 0;
	margin-top: 40px;
`

const CardSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	margin-top: 20px;
`

const SunValueContainer = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
`

const SunValue = styled.p`
	color: ${theme.color.black};
	margin-left: 10px;
`

const SunIcon = styled.div`
	width: 40px;
	height: 40px;
`
