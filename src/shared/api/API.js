import axios from 'axios'
import { getToken } from 'shared/utils/token'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
	timeout: 5000,
	headers: { Authorization: null, 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.response.use(
	response => {
		return {
			isSuccess: response.status === 200,
			...response,
		}
	},
	error => {
		const { status } = error
		return {
			...error,
			isSuccess: status === 200,
			message: error.response.data || '알 수 없는 문제가 발생했습니다.',
		}
	},
)

axiosInstance.interceptors.request.use(
	config => {
		config.headers.Authorization = `bearer ${getToken()}`
		return config
	},
	error => {
		return error
	},
)

export default axiosInstance
