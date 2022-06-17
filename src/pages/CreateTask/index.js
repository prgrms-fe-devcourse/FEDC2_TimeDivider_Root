import useCreateTasks from 'shared/hooks/useCreateTasks'
import useNavigation from 'shared/hooks/useNavigation'
import { Link, useLocation } from 'react-router-dom'

import * as S from './style'
import { colors } from 'shared/constants/colors'

import NavBar from 'shared/components/NavBar'
import Text from 'shared/components/Text'
import Button from 'shared/components/Button'
import Input from 'shared/components/Input'
import Badge from 'shared/components/Badge'

const BUTTON_TEXT = Object.freeze({
	VALID: '계속 진행하기',
	INVALID: '할 일을 입력해주세요',
})

const CreateTask = () => {
	const location = useLocation()
	const { tasks, task, spareTime, setSpareTime, setTask, removeTask, handleSubmit, isValidTasks } =
		useCreateTasks()

	const navigationValidator = () => {
		const { spareTime } = location.state
		setSpareTime(spareTime)
	}

	useNavigation(navigationValidator)

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
					{tasks.map(({ id, task }) => (
						<Badge text={task} key={id} onClick={() => removeTask(id)} />
					))}
				</S.TaskArea>
				<S.Form onSubmit={handleSubmit}>
					<Input
						type="text"
						value={task}
						onChange={e => setTask(e.target.value)}
						autoFocus={true}
						required
					/>
					<Button width={7.9} height={3.9} fontSize={1.6}>
						추가
					</Button>
				</S.Form>
			</S.Section>

			<S.ButtonArea>
				<Link to="/createTimeDivider" state={{ spareTime, tasks }}>
					<Button disabled={!isValidTasks}>
						{!isValidTasks ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</S.ButtonArea>
		</S.Wrapper>
	)
}

export default CreateTask
