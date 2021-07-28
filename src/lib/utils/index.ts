import { ICity } from '@feature/weather'
import { persistentStorage } from '@lib/http'

export const capitalizeFirstLetter = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export const setCurrentCity = (city: ICity) => {
	persistentStorage.setItem('CITY', city.name)
	persistentStorage.setItem('LAN', String(city.lat))
	persistentStorage.setItem('LON', String(city.lon))
}
