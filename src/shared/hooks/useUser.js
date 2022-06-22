import { useRecoilState, useResetRecoilState } from 'recoil'
import { loginDataState, userState } from 'state/user'
import { requestSignup, requestLogin, requestLogout } from 'shared/api/apis/authApis'
import { getUser, requestChangeFullName, uploadImage } from 'shared/api/apis/userApis'
import { createPost } from 'shared/api/apis/postApis'
import { useTimers } from 'shared/hooks/useTimers'

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
		const { isSuccess, message, user, ...newLoginData } = await requestLogin(userInfo)

		if (!isSuccess) {
			return { isSuccess, message }
		}

		setLoginData(newLoginData)
		setUser({ ...user, image: user.image ?? dummyUserImage })

		return { isSuccess, message }
	}

	const signup = async (userInfo = { email: null, fullName: 'unknown', password: null }) => {
		const { isSuccess, message, user, token, ...newLoginData } = await requestSignup(userInfo)
		if (!isSuccess) {
			return { isSuccess, message }
		}

		await createPost(token)
		await login(userInfo)
		return { isSuccess, message: '회원가입에 성공했습니다.' }
	}

	return {
		user,
		isLoggedIn,
		login,
		signup,
		changeName,
		changeImage,
		refreshUser,
		logout,
	}
}
