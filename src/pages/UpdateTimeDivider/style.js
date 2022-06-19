import styled from 'styled-components'
import { themeColors } from '../../shared/constants/colors'

export const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`
export const TimerArea = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 31.6rem;
	margin: 1rem auto auto;
	gap: 0.5rem;
`
export const ToolBar = styled.div`
	display: flex;
	column-gap: 1rem;
	justify-content: end;
	width: 100%;
	height: 3rem;
	padding-right: 7rem;
	padding-top: 10rem;
	padding-bottom: 2rem;
`
export const Description = styled.div`
	display: flex;
	width: 90%;
	align-items: start;
	color: ${themeColors.fontDescription};
	font-size: 1.3rem;
	padding-left: 2rem;
	margin-bottom: 1rem;
`
export const BottomBarArea = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
`
