import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import NavBar from '../components/NavBar'
import TaskTimeForm from '../components/TaskTimeForm'
import TaskBox from '../components/TaskBox'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const ButtonArea = styled.div`
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

const BoxContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
`

export const CreateTimeDivider = () => {
	const location = useLocation()
	const [tasks, setTasks] = useState(
		location.state.tasks.map(task => {
			return { ...task, hour: '00', minute: '00' }
		}),
	)
	const [selectedTask, setSelectedTask] = useState(null)

	const handleSubmit = selectedTask => {
		setTasks(
			tasks.map(task => {
				if (task.id === selectedTask.id) {
					task.hour = selectedTask.hour
					task.minute = selectedTask.minute
				}
				return task
			}),
		)
		setSelectedTask(null)
	}

	return (
		<>
			<NavBar backIcon>시간을 분배해요</NavBar>
			<BoxContainer>
				{tasks.map(task => (
					<TaskBox
						key={task.id}
						task={task}
						onClick={() => {
							setSelectedTask(task)
						}}
					/>
				))}
			</BoxContainer>
			{selectedTask && <TaskTimeForm targetTask={selectedTask} onSubmit={handleSubmit} />}
			<ButtonArea>
				<Link to="/updateDivider" state={{ tasks }}>
					<Button>{BUTTON_TEXT.VALID}</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default CreateTimeDivider
