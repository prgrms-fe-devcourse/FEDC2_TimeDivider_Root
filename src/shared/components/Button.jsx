import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/constants/colors'

const Button = ({
	children,
	width = 33,
	height = 5.8,
	fontSize = 2.0,
	fontColor = colors.white,
	backgroundColor = colors.tossBlue,
	borderColor = colors.tossBlue,
	inline = false,
	...props
}) => {
	return (
		<StyledButton
			{...props.style}
			{...props}
			width={width}
			height={height}
			fontSize={fontSize}
			fontColor={fontColor}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			inline={inline}
		>
			{children}
		</StyledButton>
	)
}

Button.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fontSize: PropTypes.number,
	fontColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	borderColor: PropTypes.string,
	inline: PropTypes.bool,
}

export default Button

const StyledButton = styled.button`
	display: ${props => (props.inline ? 'inline' : 'block')};
	width: ${props => `${props.width}rem`};
	height: ${props => `${props.height}rem`};
	font-size: ${props => `${props.fontSize}rem`};
	padding: 0.8rem 0.8rem;
	background-color: ${props => props.backgroundColor};
	border: 0.1rem solid ${props => props.borderColor};
	outline: none;
	text-align: center;
	border-radius: 0.8rem;
	color: ${props => props.fontColor};
	box-sizing: border-box;
	cursor: pointer;

	&:hover {
		background-color: #2880ee;
		color: white;
	}

	&:active {
		background-color: #0070ee;
		color: white;
	}

	&:disabled {
		background-color: ${colors.lightGray};
		cursor: default;
	}
`
