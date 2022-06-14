import SignUpForm from 'shared/components/SignUpForm'
import apis from 'shared/api'

const SignUp = () => {
	const handleSubmit = userInfo => {
		apis.authSignupUser(userInfo)
	}

	return (
		<>
			<SignUpForm onSubmit={handleSubmit}></SignUpForm>
		</>
	)
}

export default SignUp
