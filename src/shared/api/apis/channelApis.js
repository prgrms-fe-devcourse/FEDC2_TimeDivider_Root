import API from '../API'

export const createChannel = async (
	channelInfo = { authRequired: false, description: 'TestChannel', name: 'Test' },
) => {
	try {
		await API.post('/channels/create', channelInfo)
		return
	} catch (error) {
		return error
	}
}

export const getChannels = async () => {
	try {
		const { data } = await API.get('/channels')
		return data
	} catch (error) {
		return error
	}
}
