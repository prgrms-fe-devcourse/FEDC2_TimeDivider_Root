import styled from 'styled-components'
import { colors, themeColors } from '../../shared/constants/colors'

export const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background-color: ${themeColors.labelBackground};
`
export const Input = styled.input`
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	align-items: center;
	font-size: 1.5rem;
	flex: 1;
`
export const Title = styled.div`
	width: 6rem;
	font-size: 1.5rem;
`

export const Done = styled.div`
	position: absolute;
	top: 3rem;
	right: 1.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 8.2rem;
	height: 2.6rem;
	border-radius: 0.6rem;
	font-size: 1.6rem;
	font-weight: ${props => (props.edited ? 700 : 400)};
	color: ${props => (props.edited ? themeColors.primary : colors.timeoutDarkGray)};
`

export const ImageInput = styled(Input)``
