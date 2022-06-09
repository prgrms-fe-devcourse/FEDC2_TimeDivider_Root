import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import NavBar from '../components/NavBar'
import TaskTimeForm from '../components/TaskTimeForm'
import TaskBox from '../components/TaskBox'
import Text from '../components/Text'

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

const convertToSeconds = time => {
	return parseInt(time.hours) * 3600 + parseInt(time.minutes) * 60
}

export const convertToHourMinute = time => {
	const hour = String(parseInt(time / 3600))
	const minute = String(parseInt((time % 3600) / 60))

	return { hour, minute }
}

export const CreateTimeDivider = () => {
	const location = useLocation()
	const initalTotal = convertToSeconds(location.state.spareTime)
	const [totalTime, setTotalTime] = useState(convertToSeconds(location.state.spareTime))

	const [tasks, setTasks] = useState(
		location.state.tasks.map(task => {
			return { ...task, time: 0, hour: '0', minute: '0' }
		}),
	)
	const [selectedTask, setSelectedTask] = useState(null)

	const handleSubmit = selectedTask => {
		const usedTime = convertToSeconds({ hours: selectedTask.hour, minutes: selectedTask.minute })
		if (totalTime - usedTime < 0) {
			setSelectedTask(null)
			return
		}
		setTasks(
			tasks.map(task => {
				if (task.id === selectedTask.id) {
					task.hour = selectedTask.hour
					task.minute = selectedTask.minute
					task.time = usedTime
					setTotalTime(initalTotal - tasks.reduce((acc, task) => acc + task.time, 0))
				}
				return task
			}),
		)

		setSelectedTask(null)
	}

	return (
		<>
			<NavBar backIcon>시간을 분배해요</NavBar>
			<Text>
				{convertToHourMinute(totalTime).hour} : {convertToHourMinute(totalTime).minute}
			</Text>
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
