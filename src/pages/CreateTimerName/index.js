import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Badge, Button, Input } from 'shared/components'
import { useCreatingTimers } from 'shared/hooks'
import useNameTags from './hooks/useNameTag'
import CreateTimerLayout from 'shared/layout/CreatingTimerLayout'

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
			<Section>
				<TaskAreaWrapper>
					<TaskArea>
						{timerNames.map(({ id, name }) => (
							<Badge key={id} onClick={() => removeNameTag(id)}>
								{name}
							</Badge>
						))}
					</TaskArea>
				</TaskAreaWrapper>

				<Form onSubmit={handleNameTagSubmit}>
					<Input
						type="text"
						value={nameTag}
						onChange={e => setNameTag(e.target.value)}
						autoFocus={true}
						required
					/>
					<Button width={7.9} height={3.9} fontSize={1.6}>
						추가
					</Button>
				</Form>
			</Section>
		</CreateTimerLayout>
	)
}

export default CreateTimerNames

export const TaskArea = styled.div`
	position: relative;
	width: 30rem;

	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	margin-bottom: 2rem;
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
export const TaskAreaWrapper = styled.div`
	height: 20rem;
	overflow-y: scroll;
`
