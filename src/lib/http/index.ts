import axios, { AxiosResponse } from 'axios'

export type HttpResponse<T = object> = Promise<AxiosResponse<T>>

export const http = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 5000
})
