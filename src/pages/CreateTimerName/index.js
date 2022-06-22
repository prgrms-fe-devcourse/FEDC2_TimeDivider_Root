import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import * as S from './style'
import { TaskAreaWrapper } from './style'

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
		<S.Wrapper>
			<NavBar backIcon />

			<SubTitle description={'클릭하여 삭제할 수 있습니다.'}>
				오늘 해야할 일들은 무엇이 있나요?
			</SubTitle>

			<S.Section>
				<TaskAreaWrapper>
					<S.TaskArea>
						{timerNames.map(({ id, name }) => (
							<Badge key={id} onClick={() => removeNameTag(id)}>
								{name}
							</Badge>
						))}
					</S.TaskArea>
				</TaskAreaWrapper>

				<S.Form onSubmit={handleNameTagSubmit}>
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
				</S.Form>
			</S.Section>

			<S.ButtonArea>
				<Link to="/createTimeDivider">
					<Button disabled={!isValidNames}>
						{!isValidNames ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</S.ButtonArea>
		</S.Wrapper>
	)
}

export default CreateTimerNames
