import { Link } from 'react-router-dom'

import * as S from './style'
import { colors } from 'shared/constants/colors'

import NavBar from 'shared/components/NavBar'
import Text from 'shared/components/Text'
import Button from 'shared/components/Button'
import Input from 'shared/components/Input'
import Badge from 'shared/components/Badge'
import { useCreatingTimers } from '../../shared/hooks/useCreatingTimers'
import { useMemo } from 'react'
import useNameTags from './hooks/useNameTag'

const BUTTON_TEXT = Object.freeze({
	VALID: '계속 진행하기',
	INVALID: '할 일을 입력해주세요',
})

const CreateNameIds = () => {
	const { nameIds } = useCreatingTimers()
	const { nameTag, setNameTag, removeNameTag, handleNameTagSubmit } = useNameTags()

	const isValidNames = useMemo(() => nameIds.length > 0, [nameIds])

	return (
		<S.Wrapper>
			<NavBar backIcon />

			<S.SubTitle>
				<Text size={2.2} textAlign={'start'}>
					오늘 해야할 일들은 무엇이 있나요?
				</Text>
				<Text size={1.3} textAlign={'start'} color={colors.lightGray}>
					클릭하여 삭제할 수 있습니다.
				</Text>
			</S.SubTitle>

			<S.Section>
				<S.TaskArea>
					{nameIds.map(({ id, name }) => (
						<Badge key={id} onClick={() => removeNameTag(id)}>
							{name}
						</Badge>
					))}
				</S.TaskArea>
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
				<Link to="/divideTime">
					<Button disabled={!isValidNames}>
						{!isValidNames ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</S.ButtonArea>
		</S.Wrapper>
	)
}

export default CreateNameIds
