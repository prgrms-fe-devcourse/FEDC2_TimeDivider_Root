import { authorizedInstance, axiosInstance } from '../API'

export const createPost = async (
	postInfo = { title: 'Test', image: null, channelId: '62aef0cb0c40db04a896388f' },
) => {
	try {
		await authorizedInstance.post('/posts/create', postInfo)
		return
	} catch (error) {
		return error
	}
}

export const getPosts = async (channelId = '62aef0cb0c40db04a896388f') => {
	try {
		const { data } = await axiosInstance.get(`/posts/channel/${channelId}`)
		return data
	} catch (error) {
		return error
	}
}
