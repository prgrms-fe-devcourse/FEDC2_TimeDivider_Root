import axios from 'axios'

export default axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
	timeout: 5000,
	headers: { Authorization: null, 'Content-Type': 'application/json' },
})
