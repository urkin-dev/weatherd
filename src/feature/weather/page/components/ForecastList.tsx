import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import { IDailyItem } from '../../store'
import ForecastItem from './ForecastItem'

interface IProps {
	forecastData: IDailyItem[]
}

export default function ForecastList({ forecastData }: IProps) {
	return <Container>{forecastData.map((f, idx) => idx !== 1 && <ForecastItem data={f} key={f.dt} />)}</Container>
}

const Container = styled.div`
	margin-top: 50px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	${theme.media.mobile} {
		justify-content: center;
	}
`
