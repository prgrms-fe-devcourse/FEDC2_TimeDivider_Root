import API from '../API'

export const addPostLike = async postId => {
	try {
		const { data } = await API.post('/likes/create', { postId })
		return data
	} catch (error) {
		return error
	}
}

export const cancelPostLike = async id => {
	try {
		const { data } = await API.delete('/likes/delete', { data: { id } })
		return data
	} catch (error) {
		return error
	}
}
