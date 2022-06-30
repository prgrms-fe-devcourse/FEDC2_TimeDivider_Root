import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/constants/colors'

//원래 쓰든 안쓰든 잇는 prop
const Badge = ({ fontSize, ...props }) => {
	return <StyledBadge fontSize={fontSize} {...props} />
}

Badge.propTypes = {
	text: PropTypes.string,
}

const StyledBadge = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${({ fontSize }) => fontSize}rem;
	text-align: center;
	border-radius: 1rem;
	height: 2rem;
	margin: 0.3rem;
	padding: 1.5rem 1.5rem;
	color: ${colors.blue};
	background-color: ${colors.badgeGray};
	box-sizing: border-box;
	cursor: pointer;
`

export default Badge
