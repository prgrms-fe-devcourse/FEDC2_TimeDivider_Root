import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
	timeout: 5000,
	headers: { Authorization: null, 'Content-Type': 'application/json' },
})

export default axiosInstance
