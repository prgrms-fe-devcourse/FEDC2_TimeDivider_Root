import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/constants/colors'

const Badge = ({ children, text, ...props }) => {
	return <StyledBadge {...props}>{text}</StyledBadge>
}

export default Badge

Badge.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fontSize: PropTypes.number,
	fontColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	borderColor: PropTypes.string,
	inline: PropTypes.bool,
}

const StyledBadge = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 2rem;
	margin: 0.3rem;
	padding: 0 1.5rem;
	color: ${colors.blue};
	background-color: ${colors.brightGray};
	cursor: grab;
`
