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
		const result = await apis.login(loginInfo)
		setUserInfo(result)
		navigate('/myPage')
	}
	return (
		<>
			<NavBar backIcon />
			<LoginForm onSubmit={handleLogInSubmit} />
		</>
	)
}

export default Login
