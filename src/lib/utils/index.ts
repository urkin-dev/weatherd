import { persistentStorage } from '@lib/http'

export const capitalizeFirstLetter = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export const setCurrentCity = (city: string) => {
	persistentStorage.setItem('CITY', city)
}
