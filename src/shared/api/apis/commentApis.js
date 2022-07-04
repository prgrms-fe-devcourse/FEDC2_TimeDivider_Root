import API from '../API'

export const createComment = async (comment, postId) => {
	const { isSuccess, message, data } = await API.post('/comments/create', { comment, postId })

	if (!isSuccess) {
		return { isSuccess, message }
	}
	return { isSuccess, data, message: 'Comment Added' }
}
