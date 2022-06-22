import styled from 'styled-components'
import { themeColors } from '../../shared/constants/colors'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: ${themeColors.labelBackground};
`

export const Header = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 18rem;
`
export const AvatarItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	box-sizing: border-box;
	cursor: pointer;
`

export const AvatarName = styled(Text)`
	width: 6rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
`
export const AvatarListArea = styled.div`
	background-color: ${themeColors.background};
	box-sizing: border-box;
	display: flex;
	width: 100%;
	column-gap: 2rem;
	padding-left: 2rem;
	overflow-x: scroll;
	height: 12rem;

	&:hover::-webkit-scrollbar {
		height: 0.7rem;
	}

	&:hover::-webkit-scrollbar-track {
		background-color: white;
	}

	&:hover::-webkit-scrollbar-thumb {
		border-radius: 1.6rem;
		background-color: lightgray;
	}
`
export const ButtonArea = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	justify-content: flex-end;
	padding: 2rem;
	gap: 1rem;
	background-color: ${themeColors.background};
`

export const CardArea = styled.div`
	position: relative;
	width: 100%;
	flex: 1;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	::-webkit-scrollbar {
		display: none;
	}
`

export const Footer = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
`
