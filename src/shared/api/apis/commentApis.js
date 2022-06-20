import API from '../API'

export const createComment = async (comment, postId) => {
	try {
		const { data } = await API.post('/comments/create', { comment, postId })
		return data
	} catch (error) {
		return error
	}
}
