import API from '../API'

export const getAllUserList = async () => {
	try {
		const { data } = await API.get('/users/get-users')
		return data
	} catch (error) {
		return error
	}
}
