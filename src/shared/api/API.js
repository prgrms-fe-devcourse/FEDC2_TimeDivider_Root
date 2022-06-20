import axios from 'axios'
import { getToken } from 'shared/utils/token'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
	timeout: 5000,
	headers: { Authorization: `bearer ${getToken()}`, 'Content-Type': 'application/json' },
})

export default axiosInstance
