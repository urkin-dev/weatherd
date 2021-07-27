import { styled } from '@linaria/react'
import Search from './Search'
import { theme } from '@lib/theme'
import { Divider } from 'antd'
import { ReactComponent as Example } from '@assets/weather/03d.svg'
import { ReactComponent as Example1 } from '@assets/weather/09d.svg'

export default function Sidebar() {
	return (
		<SidebarContainer>
			<Search />
			<WeatherIconExample />
			<WeatherValue>12&#176;C</WeatherValue>
			<DateContainer>
				<WeekDay>Monday,</WeekDay>
				<DateValue>16:00</DateValue>
			</DateContainer>
			<Divider />
			<MetaInfoItem>
				<Example width="20" height="20" />
				<MetaInfoValue>Mostly Cloudy</MetaInfoValue>
			</MetaInfoItem>
			<MetaInfoItem>
				<Example1 width="20" height="20" />
				<MetaInfoValue>Rain - 30%</MetaInfoValue>
			</MetaInfoItem>
		</SidebarContainer>
	)
}

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const WeatherIconExample = styled.div`
	margin-top: 30px;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: #fee25c;
`

const WeatherValue = styled.p`
	margin-top: 30px;
	font-size: ${theme.font.size.megahuge}px;
	color: ${theme.color.black};
	padding: 0;
`

const DateContainer = styled.div`
	display: flex;
`

const WeekDay = styled.p`
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
