import LoginForm from './components/LoginForm'
import apis from 'shared/api'
import { useSetRecoilState } from 'recoil'
import { loginUserState } from 'state/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const setUserInfo = useSetRecoilState(loginUserState)
	const handleLogin = async loginInfo => {
		const result = await apis.login(loginInfo)
		setUserInfo(result)
		navigate('/home')
	}
	return (
		<>
			<LoginForm onSubmit={handleLogin} />
		</>
	)
}

export default Login
