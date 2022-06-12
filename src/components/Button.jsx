import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Button = ({ rect = false, size, inline = false, ...props }) => {
	return <StyledButton {...props} inline={inline} size={size} rect={rect} />
}

Text.propTypes = {
	rect: PropTypes.bool,
	size: PropTypes.string,
	inline: PropTypes.bool,
}

export default Button

const StyledButton = styled.button`
	display: ${props => (props.inline ? 'inline' : 'block')};
	${props => {
		switch (props.size) {
			case 'sm':
				return css`
					width: 3.5rem;
					hegiht: 1.25rem;
				`
			case 'md':
				return css`
					width: 6.5rem;
					height: 2rem;
				`
			case 'lg':
				return css`
					width: 13rem;
					height: 2.25rem;
				`
			default:
				return css`
					width: 100%;
					hegiht: 2rem;
				`
		}
	}}
	padding: 0.5rem 0.5rem;
	background-color: #10d0a3;
	border: none;
	outline: none;
	text-align: center;
	border-radius: ${props => (props.rect ? '0.5rem' : '1rem')};
	color: white;
	box-sizing: border-box;
	cursor: pointer;

	&:hover {
		background-color: #00dfab;
	}

	&:active {
		background-color: #00efab;
	}

	&:disabled {
		background-color: gray;
		cursor: default;
	}
`
