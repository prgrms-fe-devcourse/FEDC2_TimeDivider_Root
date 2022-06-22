import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

import Text from 'shared/components/Text'
import NavBar from 'shared/components/NavBar'
import Button from 'shared/components/Button'
import Logo from 'shared/components/Logo'
import LoginForm from './components/LoginForm'
import Divider from './components/Divider'
import { colors } from 'shared/constants/colors'

import { useUser } from 'shared/hooks/useUser'

const Login = () => {
	const { login } = useUser()
	const navigate = useNavigate()

	const handleLogInSubmit = async loginInfo => {
		const { isSuccess, message } = await login(loginInfo)

		if (!isSuccess) {
			alert(message)
			return
		}
		alert(message)
		navigate('/updateTimeDivider')
	}
	return (
		<Wrapper>
			<NavBar />
			<Logo size={'LOGIN'} />
			<InnerWrapper>
				<LoginForm onSubmit={handleLogInSubmit} />
				<Divider type={'horizontal'}> </Divider>
				<ButtonArea>
					<Text block={true} size={1.3} textAlign={'start'} color={colors.lightGray}>
						회원이 아니신가요 ?
					</Text>
					<Link to="/signup">
						<Button backgroundColor={colors.white} fontColor={colors.blue}>
							회원가입
						</Button>
					</Link>
					<Link to="/home">
						<Button
							backgroundColor={colors.white}
							borderColor={colors.timeoutDarkGray}
							fontColor={colors.timeoutDarkGray}
						>
							비회원으로 이용하기
						</Button>
					</Link>
				</ButtonArea>
			</InnerWrapper>
		</Wrapper>
	)
}

export default Login

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

const ButtonArea = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: center;
`
