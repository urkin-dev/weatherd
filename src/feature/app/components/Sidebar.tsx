import { styled } from '@linaria/react'
import Search from './Search'
import { theme } from '@lib/theme'
import { Divider } from 'antd'
import { ReactComponent as Rain } from '@assets/weather/rain.svg'
import { useAppSelector } from '@lib/hooks'
import { format } from 'date-fns'
import { capitalizeFirstLetter, getDegree } from '@lib/utils'
import Icon from './Icon'

export default function Sidebar() {
	const weatherStore = useAppSelector((state) => state.weather)
	const DATE = format(new Date().getDay(), 'EEEE')
	const HOUR = format(new Date(), 'HH:mm')

	return (
		<SidebarContainer>
			{weatherStore.current && (
				<>
					<Search />
					<WeatherIconContainer>
						<Icon name={weatherStore.current.weather[0].icon} />
					</WeatherIconContainer>
					<WeatherValue>
						{Math.round(weatherStore.current.temp)}&#176;{getDegree(weatherStore.measurement)}
					</WeatherValue>
					<RowContainer>
						<CityName>{weatherStore.city.name}</CityName>
					</RowContainer>
					<RowContainer>
						<RowItem>{DATE},</RowItem>
						<DateValue>{HOUR}</DateValue>
					</RowContainer>
					<RowContainer>
						<RowItem>
							Feels like: {Math.round(weatherStore.current.feels_like)}&#176;{getDegree(weatherStore.measurement)}
						</RowItem>
					</RowContainer>
					{weatherStore.nearestForecast && (
						<>
							<RowContainer>
								<RowItem>
									Min: {Math.round(weatherStore.nearestForecast.temp.min)}&#176;{getDegree(weatherStore.measurement)}
								</RowItem>
							</RowContainer>
							<RowContainer>
								<RowItem>
									Max: {Math.round(weatherStore.nearestForecast.temp.max)}&#176;{getDegree(weatherStore.measurement)}
								</RowItem>
							</RowContainer>
						</>
					)}
					<Divider />
					<MetaInfoItem>
						<WeatherMiniContainer>
							<Icon name={weatherStore.current.weather[0].icon} />
						</WeatherMiniContainer>
						<MetaInfoValue>{capitalizeFirstLetter(weatherStore.current.weather[0].description)}</MetaInfoValue>
					</MetaInfoItem>
					<MetaInfoItem>
						<Rain width="20" height="20" />
						{weatherStore.nearestForecast && (
							<MetaInfoValue>Rain - {weatherStore.nearestForecast.pop * 100}%</MetaInfoValue>
						)}
					</MetaInfoItem>
				</>
			)}
		</SidebarContainer>
	)
}

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	${theme.media.mobile} {
		width: 100%;
	}
`

const WeatherIconContainer = styled.div`
	margin-top: 30px;
	width: 200px;
	height: 200px;
`

const WeatherMiniContainer = styled.div`
	width: 20px;
	height: 20px;
`

const WeatherValue = styled.p`
	margin-top: 30px;
	font-size: ${theme.font.size.megahuge}px;
	color: ${theme.color.black};
	padding: 0;

	${theme.media.mobile} {
		font-size: ${theme.font.size.huge}px;
	}
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
	margin-top: 10px;
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
