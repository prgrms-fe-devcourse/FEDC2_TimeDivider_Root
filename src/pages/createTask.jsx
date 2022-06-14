import React, { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { colors } from 'shared/constants/colors'

import NavBar from 'shared/components/NavBar'
import Text from 'shared/components/Text'
import Button from 'shared/components/Button'
import Input from 'shared/components/Input'

const BUTTON_TEXT = Object.freeze({
	VALID: '계속 진행하기',
	INVALID: '할 일을 입력해주세요',
})

export const CreateTask = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const [spareTime, setSpareTime] = useState({ hour: 0, minute: 0 })
	const [task, setTask] = useState('')
	const [tasks, setTasks] = useState([])
	const [isValidTasks, setIsValidTasks] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		const trimmedTask = task.trim()

		if (trimmedTask) {
			setTasks([...tasks, { id: `${Date.now()}${tasks.length}`, task: trimmedTask }])
		}

		setTask('')
	}

	const removeTask = removeId => {
		const filteredTasks = tasks.filter(({ id }) => removeId !== id)
		setTasks(filteredTasks)
	}

	const handleIsValidTask = tasks => {
		if (tasks.length > 0) {
			setIsValidTasks(true)
			return
		}
		setIsValidTasks(false)
	}

	useMemo(() => {
		try {
			const { spareTime } = location.state
			setSpareTime(spareTime)
		} catch {
			navigate('/home')
		}
	}, [location, navigate])

	useMemo(() => {
		handleIsValidTask(tasks)
	}, [tasks])

	return (
		<Wrapper>
			<NavBar backIcon />

			<SubTitle>
				<Text style={{ textAlign: 'start', fontSize: '2.2rem', padding: '0 3rem' }}>
					오늘 해야할 일들은 무엇이 있나요?
				</Text>
				<Text
					style={{ textAlign: 'start', fontSize: '1.3rem', color: '#919191', padding: '0 3rem' }}
				>
					클릭하여 삭제할 수 있습니다.
				</Text>
			</SubTitle>

			<Section>
				<TaskArea>
					{tasks.map(({ id, task }) => (
						<Task key={id}>
							<span onClick={() => removeTask(id)}>{task}</span>
						</Task>
					))}
				</TaskArea>
				<Form onSubmit={e => handleSubmit(e)}>
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
	left: -5rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
`

const TaskArea = styled.div`
	position: relative;
	width: 100%;
	height: 20rem;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	margin: 2rem 3rem 1rem 3rem;
	margin-bottom: 2rem;
`

const Task = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 2rem;
	margin: 0.3rem;
	padding: 0 1.5rem;
	color: ${colors.blue};
	background-color: #fff;
	cursor: grab;
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
