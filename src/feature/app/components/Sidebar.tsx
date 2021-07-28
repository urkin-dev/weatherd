import { styled } from '@linaria/react'
import Search from './Search'
import { theme } from '@lib/theme'
import { Divider } from 'antd'
import { ReactComponent as Example } from '@assets/weather/13d.svg'
import { ReactComponent as Example1 } from '@assets/weather/09d.svg'
import { useAppSelector } from '@lib/hooks'
import { format } from 'date-fns'
import { capitalizeFirstLetter } from '@lib/utils'
import Icon from './Icon'
import { measurementType } from '@feature/weather'

export default function Sidebar() {
	const weatherStore = useAppSelector((state) => state.weather)
	const DATE = format(new Date().getDay(), 'EEEE')
	const HOUR = format(new Date(), 'HH:mm')

	const getDegree = (temp: number, measurement?: measurementType) => {
		if (measurement) {
			return (
				<>
					{Math.round(temp)}&#176;{measurement === 'metric' ? 'C' : 'F'}
				</>
			)
		} else {
			return <>{Math.round(temp)}&#176;</>
		}
	}

	return (
		<SidebarContainer>
			{weatherStore.current && (
				<>
					<Search />
					<WeatherIconContainer>
						<Icon name={weatherStore.current.weather[0].icon} />
					</WeatherIconContainer>
					<WeatherValue>{getDegree(weatherStore.current.main.temp, weatherStore.measurement)}</WeatherValue>
					<RowContainer>
						<CityName>{weatherStore.city}</CityName>
					</RowContainer>
					<RowContainer>
						<RowItem>{DATE},</RowItem>
						<DateValue>{HOUR}</DateValue>
					</RowContainer>
					<RowContainer>
						<RowItem>Feels like: {getDegree(weatherStore.current.main.feels_like, weatherStore.measurement)}</RowItem>
					</RowContainer>
					<Divider />
					<MetaInfoItem>
						<Example width="20" height="20" />
						<MetaInfoValue>{capitalizeFirstLetter(weatherStore.current.weather[0].description)}</MetaInfoValue>
					</MetaInfoItem>
					<MetaInfoItem>
						<Example1 width="20" height="20" />
						<MetaInfoValue>Rain - 30%</MetaInfoValue>
					</MetaInfoItem>
				</>
			)}
		</SidebarContainer>
	)
}

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const WeatherIconContainer = styled.div`
	margin-top: 30px;
	width: 200px;
	height: 200px;
`

const WeatherValue = styled.p`
	margin-top: 30px;
	font-size: ${theme.font.size.megahuge}px;
	color: ${theme.color.black};
	padding: 0;
`

const RowContainer = styled.div`
	display: flex;
`

const RowItem = styled.p`
	padding: 0;
	color: ${theme.color.black};
	font-size: ${theme.font.size.main}px;
`

const DateValue = styled.p`
	padding: 0;
	color: ${theme.color.lightgray};
	font-size: ${theme.font.size.main}px;
	margin-left: 5px;
`

const MetaInfoItem = styled.div`
	display: flex;
`

const MetaInfoValue = styled.div`
	color: ${theme.color.black};
	font-size: ${theme.font.size.small}px;
	margin-left: 5px;
`

const CityName = styled.p`
	font-size: ${theme.font.size.large}px;
	padding: 0;
	color: ${theme.color.lightgray};
`
