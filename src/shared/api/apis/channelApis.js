import { authorizedInstance } from '../API'

export const createChannel = async (
	channelInfo = { authRequired: false, description: 'TestChannel', name: 'Test' },
) => {
	try {
		await authorizedInstance.post('/channels/create', channelInfo)
		return
	} catch (err) {
		console.log(err)
	}
}

export const getChannels = async () => {
	try {
		const { data } = await authorizedInstance.get('/channels')
		return data
	} catch (err) {
		console.log(err)
	}
}
