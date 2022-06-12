import PropTypes from 'prop-types'
import styled from 'styled-components'
import { IoIosArrowBack } from 'react-icons/io'
import Text from './Text'

const NavBar = ({ children = '시간 분배', backIcon, ...props }) => {
	return (
		<NavBarContainer {...props}>
			{backIcon && (
				<GoBackIcon>
					<IoIosArrowBack />
				</GoBackIcon>
			)}
			<Text size={2}>{children}</Text>
		</NavBarContainer>
	)
}

Text.propTypes = {
	children: PropTypes.node,
	backIcon: PropTypes.bool,
	link: PropTypes.string,
}

export default NavBar

const NavBarContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	position: relative;
	padding: 1.25rem;
	border-bottom: 0.05rem solid #999;
`

const GoBackIcon = styled.a`
	font-size: 2rem;
	position: absolute;
	left: 1.5rem;
	top: 1.25rem;
	cursor: pointer;
`
