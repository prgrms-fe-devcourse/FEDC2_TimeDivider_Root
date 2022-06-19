import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import API from '../API'

export const createPost = async (
	postInfo = { title: 'Test', image: null, channelId: TEST_CHANNEL_ID },
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

export const deletePost = async (id = '') => {
	try {
		await API.delete(`/posts/delete`, { id })
	} catch (error) {
		return error
	}
}
