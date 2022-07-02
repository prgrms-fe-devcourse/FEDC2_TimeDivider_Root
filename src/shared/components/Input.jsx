import styled from 'styled-components'
import { colors } from 'shared/constants/colors'

const Input = ({ width = 20, fontSize = 2.5, ...props }) => {
	return <StyledInput width={width} fontSize={fontSize} {...props} />
}

const StyledInput = styled.input`
	width: ${props => `${props.width}rem`};
	font-size: ${props => `${props.fontSize}rem`};
	border: none;
	border-bottom: 1px solid ${colors.blue};
	outline: none;
	text-align: center;
`

export default Input
