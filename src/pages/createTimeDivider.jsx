import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import NavBar from '../components/NavBar'
import TaskBox from '../components/TaskBox'
import Text from '../components/Text'
import TimeSelectForm from '../components/TimeSelectForm'
import { convertHourMinuteToSeconds, convertSecondsToHourMinute } from '../utils/convertTime'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'

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

	const [timers, setTimers] = useRecoilState(timerState)

	const initialTotal = convertHourMinuteToSeconds(location.state.spareTime)
	const [totalTime, setTotalTime] = useState(convertHourMinuteToSeconds(location.state.spareTime))
	const [isTimeOver, setIsTimeOver] = useState(false)
	const [tasks, setTasks] = useState(
		location.state.tasks.map(task => {
			return { ...task, time: 0, hour: '0', minute: '0' }
		}),
	)
	const [selectedTask, setSelectedTask] = useState(null)

	const handleSubmit = selectedTask => {
		const usedTime = convertHourMinuteToSeconds({
			hour: selectedTask.hour,
			minute: selectedTask.minute,
		})
		const findTask = tasks.find(({ id }) => id === selectedTask.id)
		const availableTime = totalTime + findTask.time
		if (availableTime - usedTime < 0) {
			setIsTimeOver(true)
			return
		}
		setTasks(
			tasks.map(task => {
				if (task.id === selectedTask.id) {
					task.hour = selectedTask.hour
					task.minute = selectedTask.minute
					task.time = usedTime
					setTotalTime(initialTotal - tasks.reduce((acc, task) => acc + task.time, 0))
				}
				return task
			}),
		)
		setIsTimeOver(false)
		setSelectedTask(null)
	}

	return (
		<>
			<NavBar backIcon>시간을 분배해요</NavBar>
			<Text size={3.5}>
				{convertSecondsToHourMinute(totalTime).hour} :{' '}
				{convertSecondsToHourMinute(totalTime).minute}
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
			{selectedTask && <TimeSelectForm targetTask={selectedTask} onSubmit={handleSubmit} />}
			{isTimeOver && <Text color={'red'}>남은 시간이 부족합니다.</Text>}
			<ButtonArea>
				<Link to="/updateTimeDivider" state={{ tasks }}>
					<Button
						onClick={() => {
							const newTimers = {}
							tasks.forEach(
								({ id, task, time, hour, minute }) =>
									(newTimers[id] = { name: task, time, isRunning: false }),
							)
							setTimers(newTimers)
						}}
					>
						{BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default CreateTimeDivider
