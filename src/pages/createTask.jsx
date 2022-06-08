import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Text from '../components/Text'
import Button from '../components/Button'
import Input from '../components/Input'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '할 일을 입력해주세요',
})

export const CreateTask = () => {
	const [task, setTask] = useState('')
	const [tasks, setTasks] = useState([])
	const [isValidTasks, setIsValidTasks] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		setTasks([...tasks, task])
		setTask('')
	}

	// TODO: index 외 유일키가 될 id 필터링 방식으로 수정 필요
	// => id 생성 방식 팀원들과 논의 후, 진행
	const removeTask = index => {
		const filteredTasks = tasks.filter((_, taskIndex) => taskIndex !== index)
		setTasks(filteredTasks)
	}

	const handleIsValidTask = () => {
		if (tasks.length > 0) {
			setIsValidTasks(true)
			return
		}
		setIsValidTasks(false)
	}

	useEffect(() => {
		handleIsValidTask()
	}, [tasks])

	return (
		<>
			<NavBar backIcon>오늘의 시간</NavBar>

			<SubTitleArea>
				<Text size={1.5}>추가된 할 일들</Text>
			</SubTitleArea>

			<TaskArea>
				{tasks.map((task, i) => (
					<Task key={i}>
						<span>{task}</span>
						<DelBtn onClick={() => removeTask(i)} />
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
				<Button size="md">추가</Button>
			</Form>

			<ButtonArea>
				<Link to="/createTimeDivider">
					<Button disabled={!isValidTasks}>
						{!isValidTasks ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default CreateTask

const SubTitleArea = styled.div`
	display: flex;
	justify-content: flex-start;
	height: 3vh;
	width: 100%;
	margin: 2rem 1rem 0 2rem;
`

const TaskArea = styled.div`
	height: 20vh;
	width: 100%;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	margin: 2rem 1rem 1rem 2rem;
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
	background-color: #999;
`

const DelBtn = styled.a`
	position: absolute;
	right: 0.3rem;
	top: 0.4rem;
	color: #fff;
	border-radius: 50%;
	font-size: 1.2rem;
	::before {
		content: 'x';
	}
`

const ButtonArea = styled.div`
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

const Form = styled.form`
	display: flex;
	gap: 2rem;
`
