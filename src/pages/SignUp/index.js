import SignUpForm from './components/SignUpForm'
import Logo from 'shared/components/Logo'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'shared/hooks/useUser'

import NavBar from 'shared/components/NavBar'

const SignUp = () => {
	const { signup } = useUser()
	const navigate = useNavigate()
	const handleSignUpSubmit = async userInfo => {
		const { isSuccess, message } = await signup(userInfo)

		if (!isSuccess) {
			alert(message)
			return
		}
		alert(message)
		navigate('/updateTimeDivider')
	}

	return (
		<>
			<NavBar backIcon />
			<Logo />
			<SignUpForm onSubmit={handleSignUpSubmit}></SignUpForm>
		</>
	)
}

export default SignUp
