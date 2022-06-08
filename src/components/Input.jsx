import styled from 'styled-components'

const StyledInput = styled.input`
	width: 13rem;
	height: 2rem;
	font-size: 1.5rem;
	border: none;
	border-bottom: 1px solid #00dfab;
	outline: none;
	text-align: center;
`

const Input = ({ ...props }) => {
	return <StyledInput {...props} />
}

export default Input
