import React from 'react'
import styled from 'styled-components'
import { NavBar, Button, SubTitle } from 'shared/components'
import { Link } from 'react-router-dom'

const CreatingTimerLayout = ({
	children,
	subTitleText,
	description,
	nextStepLink,
	disabled,
	buttonText,
	onButtonClick,
}) => {
	return (
		<Wrapper>
			<NavBar backIcon />
			<SubTitle description={description}>{subTitleText}</SubTitle>
			{children}
			<ButtonArea>
				<Link to={nextStepLink}>
					<Button onClick={onButtonClick} disabled={disabled}>
						{buttonText}
					</Button>
				</Link>
			</ButtonArea>
		</Wrapper>
	)
}

export default CreatingTimerLayout

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	padding-bottom: 3.3rem;
`

export const Section = styled.section`
	display: flex;
	height: 50rem;
	gap: 1rem;
	justify-content: space-between;
	align-items: center;
	justify-content: center;
`

export const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: calc(env(safe-area-inset-bottom) + 1rem);
`

export const FormWrapper = styled.div`
	margin-top: 22rem;
`
