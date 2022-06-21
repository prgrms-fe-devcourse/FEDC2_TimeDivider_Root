import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import API from '../API'

export const createPost = async (
	postInfo = {
		title: JSON.stringify({ share: 'PRIVATE', timers: [] }),
		image: null,
		channelId: TEST_CHANNEL_ID,
	},
) => {
	try {
		await API.post('/posts/create', postInfo)
		return
	} catch (error) {
		return error
	}
}

export const getPosts = async (channelId = TEST_CHANNEL_ID, offset = 0, limit = 5) => {
	try {
		const { data } = await API.get(`/posts/channel/${channelId}?offset=${offset}&limit=${limit}`)
		return data
	} catch (error) {
		return error
	}
}

export const getPostDetail = async postId => {
	try {
		const { data } = await API.get(`/posts/${postId}`)
		return data
	} catch (error) {
		return error
	}
}

export const deletePost = async (id = '') => {
	try {
		await API.delete(`/posts/delete`, { data: { id } })
	} catch (error) {
		return error
	}
}

export const modifyPost = async (
	postInfo = { postId: '', title: {}, image: null, channelId: TEST_CHANNEL_ID },
) => {
	console.log(postInfo)
	const { isSuccess, message, data = {} } = await API.put('/posts/update', postInfo)

	if (isSuccess) {
		return { isSuccess, data, message: '로그인에 성공했습니다.' }
	}

	if (!isSuccess) {
		return { isSuccess, message }
	}
}

export const disablePost = async (postId, channelId) => {
	const disableData = {
		postId,
		title: JSON.stringify({
			share: 'PRIVATE',
		}),
		image: null,
		channelId,
	}

	const { isSuccess, message, data = {} } = await API.put('/posts/update', disableData)

	if (isSuccess) {
		return { isSuccess, data, message: '로그인에 성공했습니다.' }
	}

	if (!isSuccess) {
		return { isSuccess, message }
	}
}

export const enablePost = async (timers, postId, channelId) => {
	const enableData = {
		postId,
		title: JSON.stringify({
			share: 'PUBLIC',
			timers,
		}),
		image: null,
		channelId,
	}

	const { isSuccess, message, data = {} } = await API.put('/posts/update', enableData)

	if (isSuccess) {
		return { isSuccess, data, message: '로그인에 성공했습니다.' }
	}

	if (!isSuccess) {
		return { isSuccess, message }
	}
}
