import SignUpForm from './components/SignUpForm'
import apis from 'shared/api'
import { useNavigate } from 'react-router-dom'

import NavBar from 'shared/components/NavBar'

const SignUp = () => {
	const navigate = useNavigate()
	const handleSignUpSubmit = async userInfo => {
		const { isSuccess, message } = await apis.signup(userInfo)

		if (isSuccess) {
			alert(message)
			navigate('/')
		}

		if (!isSuccess) {
			alert(message)
		}
	}

	return (
		<>
			<NavBar backIcon />
			<SignUpForm onSubmit={handleSignUpSubmit}></SignUpForm>
		</>
	)
}

export default SignUp
