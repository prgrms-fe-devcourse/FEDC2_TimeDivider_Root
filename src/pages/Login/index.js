import LoginForm from './components/LoginForm'
import apis from 'shared/api'
import { useSetRecoilState } from 'recoil'
import { loginUserState } from 'state/user'

const Login = () => {
	const setUserInfo = useSetRecoilState(loginUserState)
	const handleLogin = async loginInfo => {
		const result = await apis.login(loginInfo)
		setUserInfo(result)
	}
	return (
		<>
			<LoginForm onSubmit={handleLogin} />
		</>
	)
}

export default Login
