import LoginForm from './components/LoginForm'
import apis from 'shared/api'
import { useSetRecoilState } from 'recoil'
import { loginUserState } from 'atom'

const Login = () => {
	const setUserInfo = useSetRecoilState(loginUserState)
	const handleLogin = async loginInfo => {
		const result = await apis.login(loginInfo)
		setUserInfo(result)
	}
	return (
		<>
			<LoginForm onSubmit={handleLogin}></LoginForm>
		</>
	)
}

export default Login
