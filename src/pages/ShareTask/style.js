import styled from 'styled-components'

export const Header = styled.div`
	width: 37rem;
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
	display: flex;
	width: 100%;
	overflow-x: scroll;
	height: 10rem;

	::-webkit-scrollbar {
		height: 0.7rem;
	}

	::-webkit-scrollbar-track {
		background-color: white;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 1.6rem;
		background-color: lightgray;
	}
`
export const ButtonArea = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 2rem;
	gap: 1rem;
	box-sizing: border-box;
`

export const CardArea = styled.div`
	position: relative;
	width: 100%;
	height: 55rem;
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
