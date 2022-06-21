import LoginForm from './components/LoginForm'
import { useNavigate } from 'react-router-dom'

import NavBar from 'shared/components/NavBar'

import apis from 'shared/api'
import { useUser } from 'shared/hooks/useUser'

const Login = () => {
	const { setLoginData } = useUser()
	const navigate = useNavigate()
	const handleLogInSubmit = async loginInfo => {
		const { isSuccess, message, ...loginedInfo } = await apis.login(loginInfo)

		if (isSuccess) {
			setLoginData(loginedInfo)
			alert(message)
			navigate('/updateTimeDivider')
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
