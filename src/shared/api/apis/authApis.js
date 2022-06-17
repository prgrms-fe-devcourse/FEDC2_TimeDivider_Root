import API from '../API'

export const login = (userInfo = { email: null, password: null }) => {
	API.post('/login', userInfo)
		.then(({ data }) => {
			const { user, token } = data
			alert('로그인에 성공했습니다.')
			return { user, token }
		})
		.catch(err => {
			alert('로그인에 실패했습니다.')
			console.error(err)
		})
}

export const signup = (userInfo = { email: null, fullName: 'unknown', password: null }) => {
	// INFO: 회원가입시 이름 외 Email, Password 입력하도록 임시처리
	userInfo.fullName = userInfo.email

	API.post('/signup', userInfo)
		.then(res => {
			const { user, token } = res.data
			alert('회원가입에 성공했습니다.')
			return { user, token }
		})
		.catch(err => {
			alert('회원가입에 실패했습니다.')
			console.error(err)
		})
}
