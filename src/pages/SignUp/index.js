import SignUpForm from './components/SignUpForm'
import Logo from 'shared/components/Logo'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'shared/hooks/useUser'

import NavBar from 'shared/components/NavBar'
import styled from 'styled-components'

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
		<Wrapper>
			<NavBar backIcon />
			<Logo size={'LOGIN'} />
			<InnerWrapper>
				<SignUpForm onSubmit={handleSignUpSubmit}></SignUpForm>
			</InnerWrapper>
		</Wrapper>
	)
}

export default SignUp
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
