import styled from 'styled-components'
import { themeColors } from '../../shared/constants/colors'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`

export const Input = styled.input`
	box-sizing: border-box;
	width: 33.3rem;
	height: 5rem;
	padding: 1.5rem;
	margin: 0;
	border: none;
	outline: none;
	align-items: center;
	font-size: 1.5rem;
	border-radius: 1.1rem;
	background-color: ${themeColors.labelBackground};
`
export const CardForm = styled.form`
	padding: 1.5rem;
	width: 100%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	row-gap: 1rem;
	align-items: center;
	margin-top: 2rem;
`
