import LoginForm from './components/LoginForm'
import apis from 'shared/api'
import { useSetRecoilState } from 'recoil'
import { loginUserState } from 'state/user'
import { useNavigate } from 'react-router-dom'

import NavBar from 'shared/components/NavBar'

const Login = () => {
	const navigate = useNavigate()
	const setUserInfo = useSetRecoilState(loginUserState)
	const handleLogInSubmit = async loginInfo => {
		const { isSuccess, message, ...loginedInfo } = await apis.login(loginInfo)

		if (isSuccess) {
			setUserInfo(loginedInfo)
			alert(message)
			navigate('/myPage')
		}

		if (!isSuccess) {
			alert(message)
		}
	}
	return (
		<>
			<NavBar backIcon />
			<LoginForm onSubmit={handleLogInSubmit} />
		</>
	)
}

export default Login
