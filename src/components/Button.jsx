import styled from 'styled-components'

const StyledButton = styled.button`
	display: block;
	padding: 0.5rem 0.5rem;
	width: 100%;
	height: 2rem;
	background-color: #10d0a3;
	border: none;
	outline: none;
	border-radius: 1rem;
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

const Button = ({ disabled = false, children = 'Button', onClick }) => {
	return (
		<StyledButton disabled={disabled} onClick={onClick}>
			{children}
		</StyledButton>
	)
}

export default Button
