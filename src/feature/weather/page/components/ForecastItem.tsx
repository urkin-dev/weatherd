import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import { Icon } from '@feature/app'
import { IDailyItem } from 'feature/weather/store'

interface IProps {
	data: IDailyItem
}

export default function ForecastItem({ data }: IProps) {
	return (
		<Card>
			<CardTextItem>{data.weather[0].main}</CardTextItem>
			<IconWrapper>
				<Icon name={data.weather[0].icon} />
			</IconWrapper>
			<CardTextItem>
				{Math.round(data.temp.max)}&#176;<MinDeg>{Math.round(data.temp.min)}&#176;</MinDeg>
			</CardTextItem>
		</Card>
	)
}

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 10px;
	background-color: ${theme.color.white};
	border-radius: 15px;
	padding: 15px;
	width: 130px;
	margin-top: 10px;
`

const CardTextItem = styled.p`
	text-align: center;
	padding: 0;
	color: ${theme.color.black};
`

const IconWrapper = styled.div`
	width: 60px;
	height: 60px;
	margin: 10px 0;
	width: 100%;
`

const MinDeg = styled.span`
	color: ${theme.color.lightgray};
`
