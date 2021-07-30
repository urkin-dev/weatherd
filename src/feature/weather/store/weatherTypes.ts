import { IconType } from '@feature/app'

interface IWeatherItem {
	id: number
	main: string
	description: string
	icon: IconType
}

export interface ICurrent {
	dt: number
	sunrise: number
	sunset: number
	temp: number
	feels_like: number
	pressure: number
	humidity: number
	dew_point: number
	clouds: number
	visibility: number
	wind_speed: number
	wind_deg: number
	weather: IWeatherItem[]
}

export interface IDailyItem {
	dt: number
	sunrise: number
	sunset: number
	moonrise: number
	moonset: number
	moonphase: number
	pressure: number
	humidity: number
	dew_point: number
	clouds: number
	wind_speed: number
	wind_deg: number
	wind_gust: number
	temp: {
		day: number
		min: number
		max: number
		night: number
		eve: number
		morn: number
	}
	feels_like: {
		day: number
		night: number
		eve: number
		morn: number
	}
	weather: IWeatherItem[]
	pop: number
	rain: number
	uvi: number
}

export interface IWeatherData {
	lat: number
	lon: number
	timezone: string
	timezone_offset: string
	current: ICurrent
	daily: IDailyItem[]
}

export interface ILocation {
	name: string
	local_names: Object
	lat: number
	lon: number
	country: string
}
