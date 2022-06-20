import { useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { loginUserState } from '../../state/user'
import { requestLogout } from '../api/apis/authApis'

export const useUser = () => {
	const loginData = useRecoilValue(loginUserState)
	const removeLoginData = useResetRecoilState(loginUserState)
	const [user, setUser] = useState(loginData.user)

	const changeName = fullName => {
		setUser({ ...user, fullName })
	}
	const changeEmail = email => {
		setUser({ ...user, email })
	}
	const logout = async () => {
		const response = await requestLogout()
		removeLoginData()
		return response
	}

	return {
		user,
		changeName,
		changeEmail,
		logout,
	}
}
