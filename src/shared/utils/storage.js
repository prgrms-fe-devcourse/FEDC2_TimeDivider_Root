export const getSessionStorageUserInfo = () => {
	try {
		const userInfo = sessionStorage.getItem('loginUser')
		if (userInfo) {
			return JSON.parse(userInfo).user
		}
	} catch (e) {
		return null
	}
}
