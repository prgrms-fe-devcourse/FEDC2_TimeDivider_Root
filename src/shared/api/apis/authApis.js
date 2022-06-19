import API from '../API'

export const login = async (userInfo = { email: null, password: null }) => {
	try {
		const { data } = await API.post('/login', userInfo)
		const { user, token } = data
		alert('로그인에 성공했습니다.')
		return { user, token }
	} catch (error) {
		return error
	}
}

export const signup = async (userInfo = { email: null, fullName: 'unknown', password: null }) => {
	// INFO: 회원가입시 이름 외 Email, Password 입력하도록 임시처리
	userInfo.fullName = userInfo.email

	try {
		const { data } = await API.post('/signup', userInfo)
		const { user, token } = data
		alert('회원가입에 성공했습니다.')
		return { user, token }
	} catch (error) {
		return error
	}
}
