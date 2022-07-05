import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { NavBar, Button, SubTitle } from 'shared/components'
import TimeSelectForm from './components/TimeSelecForm'
import { useCreatingTimers } from 'shared/hooks'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateSpareTime = () => {
	const { spareTime, updateSpareTime, isValidSpareTime } = useCreatingTimers()

	return (
		<Wrapper>
			<NavBar backIcon />
			<SubTitle>오늘 사용할 수 있는 시간은 얼마인가요?</SubTitle>
			<FormWrapper>
				<TimeSelectForm intialTime={spareTime} handleChangeTime={updateSpareTime}></TimeSelectForm>
			</FormWrapper>

			<ButtonArea>
				<Link to="/createTimerName" state={{ spareTime }}>
					<Button disabled={!isValidSpareTime}>
						{!isValidSpareTime ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</ButtonArea>
		</Wrapper>
	)
}

export default CreateSpareTime

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
	bottom: 1rem;
`

export const FormWrapper = styled.div`
	margin-top: 22rem;
`
