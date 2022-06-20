import SignUpForm from './components/SignUpForm'
import apis from 'shared/api'
import { useNavigate } from 'react-router-dom'

import NavBar from 'shared/components/NavBar'

const SignUp = () => {
	const navigate = useNavigate()
	const handleSignUpSubmit = userInfo => {
		apis.signup(userInfo)
		navigate('/home')
	}

	return (
		<>
			<NavBar backIcon />
			<SignUpForm onSubmit={handleSignUpSubmit}></SignUpForm>
		</>
	)
}

export default SignUp
