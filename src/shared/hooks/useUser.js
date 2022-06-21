import { useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { loginUserState } from '../../state/user'
import { requestLogout } from '../api/apis/authApis'
import { useTimers } from 'shared/hooks/useTimers'

export const useUser = () => {
	const { resetTimers } = useTimers()
	const [loginData, setLoginData] = useRecoilState(loginUserState)
	const removeLoginData = useResetRecoilState(loginUserState)
	const [user, setUser] = useState(loginData.user)

	const isLoggedIn = loginData.token !== null

	const changeName = fullName => {
		setUser({ ...user, fullName })
	}
	const changeEmail = email => {
		setUser({ ...user, email })
	}

	const logout = async () => {
		const response = await requestLogout()
		removeLoginData()
		resetTimers()
		return response
	}

	return {
		user,
		setLoginData,
		isLoggedIn,
		changeName,
		changeEmail,
		logout,
	}
}
