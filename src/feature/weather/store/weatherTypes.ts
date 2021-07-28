import { IconType } from '@feature/app'

// TODO: Find out how to use modules, namespaces and other stuff properly in typescript
export interface WeatherCurrentDataProps {
	coord: {
		lon: number
		lat: number
	}
	weather: [
		{
			id: number
			main: string
			description: string
			icon: IconType
		}
	]
	base: string
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		humidity: number
	}
	visibility: number
	wind: {
		speed: number
		deg: number
	}
	clouds: {
		all: number
	}
	dt: number
	sys: {
		type: number
		id: number
		message: number
		country: string
		sunrise: number
		sunset: number
	}
	timezone: number
	id: number
	name: string
	cod: number
}

export interface ForecastListItem {
	dt: number
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		sea_level: number
		grnd_level: number
		humidity: number
		temp_kf: number
	}
	weather: [
		{
			id: number
			main: string
			description: string
			icon: IconType
		}
	]
	clouds: {
		all: number
	}
	wind: {
		speed: number
		deg: number
		gust: number
	}
	visibility: number
	pop: number
	rain: {
		'3h': number
	}
	sys: {
		pod: string
	}
	dt_txt: string
}

export interface WeatherForecastDataProps {
	cod: number
	message: number
	cnt: number
	list: ForecastListItem[]
	city: {
		id: number
		name: string
		coord: {
			lat: number
			lon: number
		}
		country: string
		timezone: number
		sunrise: number
		sunset: number
	}
}

export interface ILocation {
	name: string
	local_names: Object
	lat: number
	lon: number
	country: string
}
