import { authorizedInstance } from '../API'

export const createChannel = async (
	channelInfo = { authRequired: false, description: 'TestChannel', name: 'Test' },
) => {
	try {
		await authorizedInstance.post('/channels/create', channelInfo)
		return
	} catch (error) {
		return error
	}
}

export const getChannels = async () => {
	try {
		const { data } = await authorizedInstance.get('/channels')
		return data
	} catch (error) {
		return error
	}
}
