import { axiosInstance } from '../API'

export const getAllUserList = async () => {
	try {
		const { data } = await axiosInstance.get('/users/get-users')
		return data
	} catch (error) {
		return error
	}
}
