import { authorizedInstance, axiosInstance } from '../API'

export const createPost = async (
	postInfo = { title: 'Test', image: null, channelId: '62aef0cb0c40db04a896388f' },
) => {
	try {
		await authorizedInstance.post('/posts/create', postInfo)
		return
	} catch (err) {
		console.log(err)
	}
}

export const getChannels = async () => {
	try {
		const { data } = await axiosInstance.get('/channels')
		return data
	} catch (err) {
		console.log(err)
	}
}
