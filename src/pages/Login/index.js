import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

import Text from 'shared/components/Text'
import NavBar from 'shared/components/NavBar'
import Button from 'shared/components/Button'
import Logo from 'shared/components/Logo'
import LoginForm from './components/LoginForm'
import Divider from './components/Divider'
import { colors } from 'shared/constants/colors'

import apis from 'shared/api'
import { useUser } from 'shared/hooks/useUser'

const Login = () => {
	const { setLoginData } = useUser()
	const navigate = useNavigate()
	const handleLogInSubmit = async loginInfo => {
		const { isSuccess, message, ...loginedInfo } = await apis.login(loginInfo)

		if (isSuccess) {
			setLoginData(loginedInfo)
			apis.createPost()
			alert(message)
			navigate('/updateTimeDivider')
		}

		if (!isSuccess) {
			alert(message)
		}
	}
	return (
		<>
			<NavBar backIcon />
			<Logo />
			<Wrapper>
				<LoginForm onSubmit={handleLogInSubmit} />

				<Divider type={'horizontal'}></Divider>

				<ButtonArea>
					<Text block={true} size={1.3} textAlign={'start'} color={colors.lightGray}>
						회원이 아니신가요?
					</Text>
					<Link to="/signup">
						<Button backgroundColor={'#fff'} fontColor={colors.blue}>
							회원가입
						</Button>
					</Link>
					<Link to="/home">
						<Button backgroundColor={'#fff'} borderColor={'#505866'} fontColor={'#505866'}>
							비회원으로 이용하기
						</Button>
					</Link>
				</ButtonArea>
			</Wrapper>
		</>
	)
}

export default Login

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`

const ButtonArea = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-between;
	gap: 2rem;
	align-items: center;
`
