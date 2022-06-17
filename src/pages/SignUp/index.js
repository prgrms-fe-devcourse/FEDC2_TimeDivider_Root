import SignUpForm from './components/SignUpForm'
import apis from 'shared/api'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
	const navigate = useNavigate()
	const handleSubmit = userInfo => {
		apis.signup(userInfo)
		navigate('/home')
	}

	return (
		<>
			<SignUpForm onSubmit={handleSubmit}></SignUpForm>
		</>
	)
}

export default SignUp
