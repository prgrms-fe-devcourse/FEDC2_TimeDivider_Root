import API from '../API'

export const addPostLike = async postId => {
	const { isSuccess, message, data } = await API.post('/likes/create', { postId })
	if (!isSuccess) {
		return { isSuccess, message }
	}
	return { isSuccess, data, message: 'Successfully Add Like' }
}

export const cancelPostLike = async id => {
	const { isSuccess, message, data } = await API.delete('/likes/delete', { data: { id } })
	if (!isSuccess) {
		return { isSuccess, message }
	}
	return { isSuccess, data, message: 'Successfully Cancel Like' }
}
