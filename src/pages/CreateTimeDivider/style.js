import styled from 'styled-components'

export const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

export const BoxContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: center;
`

export const SubTitle = styled.span`
	position: relative;
	left: -2.5rem;
	display: flex;
	flex-direction: column;

	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
`

export const TimeSection = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
	margin-top: 2.4rem;
	margin-bottom: 2.4rem;
`

export const FormSection = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 26rem;
	line-height: 3.2rem;
	text-align: center;
	margin-top: 4.8rem;
	margin-bottom: 2.4rem;
`

export const TaskArea = styled.div`
	position: relative;
	width: 100%;
	height: 20rem;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	padding: 1rem;
	box-sizing: border-box;

	::-webkit-scrollbar {
		display: none;
	}
`
export const TitleWrapper = styled.div`
	margin-bottom: 1rem;
`
