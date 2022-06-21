import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	padding-bottom: 3.3rem;
`

export const TaskArea = styled.div`
	position: relative;
	width: 30rem;
	height: 20rem;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: start;
	margin-bottom: 2rem;
`

export const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

export const Form = styled.form`
	display: flex;
	gap: 2rem;
`

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: space-between;
	align-items: center;
	justify-content: center;
`
