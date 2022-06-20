import API from '../API'

export const login = async (userInfo = { email: null, password: null }) => {
	const { isSuccess, message, data = {} } = await API.post('/login', userInfo)

	if (isSuccess) {
		const { user, token } = data
		return { isSuccess, user, token, message: '로그인에 성공했습니다.' }
	}

	if (!isSuccess) {
		return { isSuccess, message }
	}
}

export const signup = async (userInfo = { email: null, fullName: 'unknown', password: null }) => {
	const { isSuccess, message, data = {} } = await API.post('/signup', userInfo)

	if (isSuccess) {
		const { user, token } = data
		return { isSuccess: false, user, token, message: '회원가입에 성공했습니다.' }
	}

	if (!isSuccess) {
		return { isSuccess, message }
	}
}

export const requestLogout = async () => {
	const { isSuccess, data } = await API.post('/logout')

	return { isSuccess, message: data }
}
