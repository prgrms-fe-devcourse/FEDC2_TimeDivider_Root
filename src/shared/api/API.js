import axios from 'axios'
import { getToken } from 'shared/utils/token'

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
	timeout: 5000,
	headers: { Authorization: null, 'Content-Type': 'application/json' },
})

export const authorizedInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
	timeout: 5000,
	headers: { Authorization: `bearer ${getToken()}`, 'Content-Type': 'application/json' },
})
