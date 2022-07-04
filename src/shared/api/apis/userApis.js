import API from '../API'

export const getAllUserList = async () => {
	const { isSuccess, message, data } = await API.get('/users/get-users')
	if (!isSuccess) {
		return { isSuccess, message }
	}
	return { isSuccess, data, message: 'Succesfully Get AllUserList' }
}

export const uploadImage = async formData => {
	const { isSuccess, message, data } = await API.post('/users/upload-photo', formData)

	if (!isSuccess) {
		return { isSuccess, message }
	}

	return { isSuccess, data, message: 'Succesfully Get AllUserList' }
}

export const requestChangeFullName = async fullName => {
	const { isSuccess, message, data } = await API.put('/settings/update-user', {
		fullName,
		username: fullName,
	})

	if (!isSuccess) {
		return { isSuccess, message }
	}

	return { isSuccess, data, message: 'Succesfully Change Fullname' }
}

export const getUser = async userId => {
	const { isSuccess, message, data } = await API.get(`/users/${userId}`)
	if (!isSuccess) {
		return { isSuccess, message }
	}

	return { isSuccess, data, message: 'Succesfully Get User' }
}
