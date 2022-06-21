import { useRecoilState, useResetRecoilState } from 'recoil'
import { loginDataState, userState } from '../../state/user'
import { requestLogout } from '../api/apis/authApis'
import { useTimers } from 'shared/hooks/useTimers'
import { login as requestLogin } from 'shared/api/apis/authApis'
import { getUser, requestChangeFullName, uploadImage } from '../api/apis/userApis'

const dummyUserImage = 'https://tva1.sinaimg.cn/large/e6c9d24egy1h3g25xp63rj20e80e8gm1.jpg'
export const useUser = () => {
	const { resetTimers } = useTimers()
	const [loginData, setLoginData] = useRecoilState(loginDataState)
	const [user, setUser] = useRecoilState(userState)
	const removeLoginData = useResetRecoilState(loginDataState)

	const isLoggedIn = loginData.token !== null

	const changeName = async fullName => {
		await requestChangeFullName(fullName)
	}

	const logout = async () => {
		const response = await requestLogout()
		removeLoginData()
		resetTimers()
		return response
	}
	const changeImage = async image => {
		const formData = new FormData()
		formData.append('image', image)
		formData.append('isCover', false)
		await uploadImage(formData)
	}

	const refreshUser = async () => {
		const response = await getUser(user._id)
		setUser({
			...response.data,
			image: response.data.image ?? dummyUserImage,
		})
	}
	const login = async (userInfo = { email: null, password: null }) => {
		const { isSuccess, message, ...newLoginData } = await requestLogin(userInfo)
		if (isSuccess) {
			setLoginData(newLoginData)
			setUser({ ...newLoginData.user, image: newLoginData.user.image ?? dummyUserImage })
		}
		return { isSuccess, message }
	}

	return {
		user,
		isLoggedIn,
		login,
		changeName,
		changeImage,
		refreshUser,
		logout,
	}
}
