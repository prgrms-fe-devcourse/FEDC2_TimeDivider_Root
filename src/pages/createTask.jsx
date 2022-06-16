import useCreateTasks from 'shared/hooks/useCreateTasks'
import useNavigation from 'shared/hooks/useNavigation'
import { Link, useLocation } from 'react-router-dom'

import styled from 'styled-components'
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

export const CreateTask = () => {
	const location = useLocation()
	const { tasks, task, spareTime, setSpareTime, setTask, removeTask, handleSubmit, isValidTasks } =
		useCreateTasks()

	const navigationValidator = () => {
		const { spareTime } = location.state
		setSpareTime(spareTime)
	}

	useNavigation(navigationValidator)

	return (
		<Wrapper>
			<NavBar backIcon />

			<SubTitle>
				<Text size={2.2} textAlign={'start'}>
					오늘 해야할 일들은 무엇이 있나요?
				</Text>
				<Text size={1.3} textAlign={'start'} color={'#919191'}>
					클릭하여 삭제할 수 있습니다.
				</Text>
			</SubTitle>

			<Section>
				<TaskArea>
					{tasks.map(({ id, task }) => (
						<Badge text={task} key={id} onClick={() => removeTask(id)} />
					))}
				</TaskArea>
				<Form onSubmit={handleSubmit}>
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
				</Form>
			</Section>

			<ButtonArea>
				<Link to="/createTimeDivider" state={{ spareTime, tasks }}>
					<Button disabled={!isValidTasks}>
						{!isValidTasks ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</ButtonArea>
		</Wrapper>
	)
}

export default CreateTask
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	padding-bottom: 3.3rem;
`

const SubTitle = styled.span`
	position: relative;
	left: -2.5rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
`

const TaskArea = styled.div`
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

const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

const Form = styled.form`
	display: flex;
	gap: 2rem;
`

const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: space-between;
	align-items: center;
	justify-content: center;
`
