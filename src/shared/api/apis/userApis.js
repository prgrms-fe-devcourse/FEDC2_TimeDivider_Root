import { axiosInstance } from '../API'

export const getAllUserList = () => {
	axiosInstance
		.get('/users/get-users')
		.then(res => {
			return {
				users: res.data,
			}
		})
		.catch(err => {
			console.log(err)
		})
}
