import React, { useMemo } from 'react'
import styled from 'styled-components'

import TimeSelectForm from './components/TimeSelectForm'
import { useCreatingTimers } from 'shared/hooks'
import CreateTimerLayout from 'shared/layout/CreatingTimerLayout'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateSpareTime = () => {
	const { spareTime, updateSpareTime, isValidSpareTime } = useCreatingTimers()
	const buttonText = useMemo(
		() => (isValidSpareTime ? BUTTON_TEXT.VALID : BUTTON_TEXT.INVALID),
		[isValidSpareTime],
	)

	return (
		<CreateTimerLayout
			subTitleText="오늘 사용할 수 있는 시간은 얼마인가요?"
			nextStepLink="/createTimerName"
			disabled={!isValidSpareTime}
			buttonText={buttonText}
		>
			<FormWrapper>
				<TimeSelectForm initialTime={spareTime} handleChangeTime={updateSpareTime}></TimeSelectForm>
			</FormWrapper>
		</CreateTimerLayout>
	)
}

export default CreateSpareTime

export const FormWrapper = styled.div`
	margin-top: 22rem;
`
