import React from 'react'
import styled from 'styled-components'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import NavBar from 'shared/components/NavBar'
import Button from 'shared/components/Button'
import Input from 'shared/components/Input'
import Badge from 'shared/components/Badge'
import SubTitle from 'shared/components/SubTitle'
import useCreatingTimers from 'shared/hooks/useCreatingTimers'
import useNameTags from './hooks/useNameTag'

const BUTTON_TEXT = Object.freeze({
	VALID: '계속 진행하기',
	INVALID: '할 일을 입력해주세요',
})

const CreateTimerNames = () => {
	const { timerNames } = useCreatingTimers()
	const { nameTag, setNameTag, removeNameTag, handleNameTagSubmit } = useNameTags()

	const isValidNames = useMemo(() => timerNames.length > 0, [timerNames])

	return (
		<Wrapper>
			<NavBar backIcon />

			<SubTitle description={'클릭하여 삭제할 수 있습니다.'}>
				오늘 해야할 일들은 무엇이 있나요?
			</SubTitle>

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

			<ButtonArea>
				<Link to="/createTimeDivider">
					<Button disabled={!isValidNames}>
						{!isValidNames ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</ButtonArea>
		</Wrapper>
	)
}

export default CreateTimerNames

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

	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
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
export const TaskAreaWrapper = styled.div`
	height: 20rem;
	overflow-y: scroll;
`
