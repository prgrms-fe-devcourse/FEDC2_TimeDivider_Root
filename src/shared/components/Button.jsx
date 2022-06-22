import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors, themeColors } from 'shared/constants/colors'

const Button = ({
	children,
	width = 33,
	height = 5.8,
	fontSize = 2.0,
	fontColor = colors.white,
	backgroundColor = colors.blue,
	borderColor = colors.blue,
	hoverColor = themeColors.primary,
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
			hoverColor={hoverColor}
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
	display: ${props => (props.inline ? 'inline' : 'flex')};
	justify-content: center;
	align-items: center;
	width: ${props => `${props.width}rem`};
	height: ${props => `${props.height}rem`};
	font-size: ${props => `${props.fontSize}rem`};
	padding: 0.8rem 0.8rem;
	background-color: ${props => props.backgroundColor};
	border: 0.1rem solid ${props => (props.disabled ? 'transparent' : props.borderColor)};
	outline: none;
	text-align: center;
	border-radius: 0.8rem;
	color: ${props => props.fontColor};
	box-sizing: border-box;
	cursor: pointer;
	box-shadow: 0 0.2rem 0.2rem ${colors.lightGray};

	&:hover {
		background-color: ${props => props.hoverColor};
		color: white;
		border: transparent;
	}

	&:active {
		background-color: #0070ee;
		color: white;
		border: transparent;
	}

	&:disabled {
		background-color: ${colors.lightGray};
		cursor: default;
	}
`
