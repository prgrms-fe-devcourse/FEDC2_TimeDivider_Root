import API from '../API'

export const authLoginUser = (userInfo = { email: null, password: null }) => {
	API.post('/login', userInfo)
		.then(({ data }) => {
			const { user, token } = data
			return { user, token }
		})
		.catch(err => {
			console.error(err)
		})
}

export const authSignupUser = (userInfo = { email: null, fullName: null, password: null }) => {
	API.post('/signup', userInfo)
		.then(res => {
			const { user, token } = res.data
			return { user, token }
		})
		.catch(err => {
			console.error(err)
		})
}
