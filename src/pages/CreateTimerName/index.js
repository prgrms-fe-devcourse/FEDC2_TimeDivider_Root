import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useCreatingTimers } from 'shared/hooks'
import useNameTags from './hooks/useNameTag'
import CreateTimerLayout from 'shared/layout/CreatingTimerLayout'
import { TimerNames, TimerNamesForm } from './components'

const BUTTON_TEXT = Object.freeze({
	VALID: '계속 진행하기',
	INVALID: '할 일을 입력해주세요',
})

const CreateTimerNames = () => {
	const { timerNames } = useCreatingTimers()
	const { nameTag, setNameTag, removeNameTag, handleNameTagSubmit } = useNameTags()

	const isValidNames = useMemo(() => timerNames.length > 0, [timerNames])
	const buttonText = useMemo(
		() => (isValidNames ? BUTTON_TEXT.VALID : BUTTON_TEXT.INVALID),
		[isValidNames],
	)

	return (
		<CreateTimerLayout
			subTitleText="오늘 해야할 일들은 무엇이 있나요?"
			description="클릭하여 삭제할 수 있습니다."
			nextStepLink="/createTimeDivider"
			disabled={!isValidNames}
			buttonText={buttonText}
		>
			<Wrapper>
				<TimerNames items={timerNames} remove={removeNameTag} />
				<TimerNamesForm
					onSubmit={handleNameTagSubmit}
					value={nameTag}
					onChange={setNameTag}
				></TimerNamesForm>
			</Wrapper>
		</CreateTimerLayout>
	)
}

export default CreateTimerNames

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: space-between;
	align-items: center;
	justify-content: center;
`
