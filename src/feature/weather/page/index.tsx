import { useAppSelector } from '@lib/hooks'
import { styled } from '@linaria/react'
import ForecastList from './components/ForecastList'

export default function Content() {
	const forecastStore = useAppSelector((state) => state.weather.forecast)
	return <ContentContainer>{forecastStore && <ForecastList forecastData={forecastStore} />}</ContentContainer>
}

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 30px;
`
