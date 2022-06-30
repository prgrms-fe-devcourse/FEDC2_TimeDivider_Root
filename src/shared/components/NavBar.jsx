import PropTypes from 'prop-types'
import styled from 'styled-components'
import { IoIosArrowBack } from 'react-icons/io'
import Text from './Text'
import { useNavigate } from 'react-router-dom'

const NavBar = ({ children = '', backIcon, ...props }) => {
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate(-1)
	}
	return (
		<NavBarContainer {...props}>
			{backIcon && (
				<GoBackIcon onClick={handleGoBack}>
					<IoIosArrowBack />
				</GoBackIcon>
			)}
			<Text size={2.2}>{children}</Text>
			<div></div>
		</NavBarContainer>
	)
}

Text.propTypes = {
	children: PropTypes.node,
	backIcon: PropTypes.bool,
	link: PropTypes.string,
}

const NavBarContainer = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 8.6rem;
	position: relative;
	padding: 1.25rem;
`

const GoBackIcon = styled.a`
	display: inline-block;
	font-size: 2.5rem;
	position: absolute;
	left: 1.5rem;
	top: 3.1rem;
	cursor: pointer;
`

export default NavBar
