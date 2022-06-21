import API from '../API'

export const getAllUserList = async () => {
	try {
		const { data } = await API.get('/users/get-users')
		return data
	} catch (error) {
		return error
	}
}

export const uploadImage = async formData => {
	try {
		const response = await API.post('/users/upload-photo', formData)
		return response
	} catch (error) {
		return error
	}
}
export const requestChangeFullName = async fullName => {
	try {
		const response = await API.put('/settings/update-user', {
			fullName,
			username: fullName,
		})
		return response
	} catch (error) {
		return error
	}
}
export const getUser = async userId => {
	try {
		const response = await API.get(`/users/${userId}`)
		return response
	} catch (error) {
		return error
	}
}
