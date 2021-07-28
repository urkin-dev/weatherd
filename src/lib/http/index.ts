import axios, { AxiosResponse } from 'axios'

export const persistentStorage =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? sessionStorage : localStorage

export type HttpResponse<T = object> = Promise<AxiosResponse<T>>

export const http = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 5000
})

export const geoHttp = axios.create({
	baseURL: process.env.REACT_APP_API_GEO,
	timeout: 5000
})
