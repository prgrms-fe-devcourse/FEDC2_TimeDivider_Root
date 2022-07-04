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
	/**
		@description recoil의 state effect를 이용한 sesseionStorage 데이터 세팅 시점과 동기화 불가능하여 임시처리
		TODO: 리팩토링 필요한 API 호출
	*/

	const { isSuccess, message, data } = await axios.post('/posts/create', postInfo, {
		baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PORT,
		timeout: 5000,
		headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
	})

	if (!isSuccess) {
		return { isSuccess, message }
	}

	return data
}

export const getPosts = async (channelId = TEST_CHANNEL_ID) => {
	const { isSuccess, message, data } = await API.get(`/posts/channel/${channelId}`)

	if (!isSuccess) {
		return { isSuccess, message }
	}

	return { isSuccess, data, message: 'Succesfully Get Posts' }
}

export const getPostDetail = async postId => {
	const { isSuccess, message, data } = await API.get(`/posts/${postId}`)
	if (!isSuccess) {
		return { isSuccess, message }
	}
	return { isSuccess, data, message: 'Succesfully Get DeatailPost' }
}

export const deletePost = async (id = '') => {
	const { isSuccess, message } = await API.delete(`/posts/delete`, { data: { id } })
	if (!isSuccess) {
		return { isSuccess, message }
	}
}

export const modifyPost = async (
	postInfo = { postId: '', title: {}, image: null, channelId: TEST_CHANNEL_ID },
) => {
	const { isSuccess, message, data = {} } = await API.put('/posts/update', postInfo)
	if (!isSuccess) {
		return { isSuccess, message }
	}

	return { isSuccess, data, message: 'Succesfully update Post' }
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

	if (!isSuccess) {
		return { isSuccess, message }
	}

	return { isSuccess, data, message: 'Succesfully disable Post' }
}
