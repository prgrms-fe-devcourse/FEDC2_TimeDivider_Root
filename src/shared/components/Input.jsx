import styled from 'styled-components'
import { colors } from 'shared/constants/colors'

const Input = ({ ...props }) => {
	return <StyledInput {...props} />
}

export default Input

const StyledInput = styled.input`
	width: 20rem;
	font-size: 2.5rem;
	border: none;
	border-bottom: 1px solid ${colors.tossBlue};
	outline: none;
	text-align: center;
`
