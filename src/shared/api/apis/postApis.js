import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import API from '../API'
import axios from 'axios'
export const createPost = async (
	token,
	postInfo = {
		title: JSON.stringify({ share: 'PRIVATE', timers: [] }),
		image: null,
		channelId: TEST_CHANNEL_ID,
	},
) => {
	try {
		/**
		@description recoil의 state effect를 이용한 sesseionStorage 데이터 세팅 시점과 동기화 불가능하여 임시처리
		TODO: 리팩토링 필요한 API 호출
		*/
		const { data } = await axios.post('/posts/create', postInfo, {
			baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
			timeout: 5000,
			headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
		})

		return data
	} catch (error) {
		return error
	}
}

export const getPosts = async (channelId = TEST_CHANNEL_ID) => {
	try {
		const { data } = await API.get(`/posts/channel/${channelId}`)
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
