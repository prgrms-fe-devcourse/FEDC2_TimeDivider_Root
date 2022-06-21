import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { loginDataState, userState } from '../../state/user'
import { requestLogout } from '../api/apis/authApis'
import { useTimers } from 'shared/hooks/useTimers'
import { getUser, requestChangeFullName, uploadImage } from '../api/apis/userApis'

export const useUser = () => {
	const { resetTimers } = useTimers()
	const loginData = useRecoilValue(loginDataState)
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
		setUser(response.data)
	}
	return {
		user,
		isLoggedIn,
		changeName,
		changeImage,
		refreshUser,
		logout,
	}
}
