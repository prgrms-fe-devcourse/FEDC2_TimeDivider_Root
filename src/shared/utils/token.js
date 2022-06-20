export const getToken = () => {
	try {
		const userInfo = sessionStorage.getItem('loginUser')
		if (userInfo) {
			return JSON.parse(userInfo).token
		}
	} catch (e) {
		return null
	}
}
