import styled from 'styled-components'
import { IoIosArrowBack } from 'react-icons/io'
import Text from './Text'

const NavBarContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.25rem;
	border-bottom: 0.05rem solid #999;
`

const GoBackIcon = styled.a`
	font-size: 2rem;
	position: fixed;
	left: 1.5rem;
	top: 2.5rem;
	cursor: pointer;
`

const NavBar = ({ children = '시간 분배' }) => {
	return (
		<NavBarContainer>
			<GoBackIcon href="/">
				<IoIosArrowBack />
			</GoBackIcon>
			<Text size="2">{children}</Text>
		</NavBarContainer>
	)
}

export default NavBar
