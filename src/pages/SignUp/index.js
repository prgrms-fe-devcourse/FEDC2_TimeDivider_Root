import styled from 'styled-components'
import SignUpForm from './components/SignUpForm'
import apis from 'shared/api'
import { useNavigate } from 'react-router-dom'
import Logo from 'shared/components/Logo'

import NavBar from 'shared/components/NavBar'

const SignUp = () => {
	const navigate = useNavigate()
	const handleSignUpSubmit = async userInfo => {
		const { isSuccess, message } = await apis.signup(userInfo)

		if (isSuccess) {
			alert(message)
			await apis.createPost()
			navigate('/')
		}

		if (!isSuccess) {
			alert(message)
		}
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

const Input = styled.input`
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	align-items: center;
	font-size: 2.5rem;
`
