import React, { useEffect, useState } from 'react'
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

export const CreateTimeDivider = () => {
	const location = useLocation()
	const initialTotal = convertHourMinuteToSeconds(location.state.spareTime)

	const [timers, setTimers] = useRecoilState(timerState)

	const [totalTime, setTotalTime] = useState(0)
	const [isTimeOver, setIsTimeOver] = useState(false)
	const [tasks, setTasks] = useState([])
	const [selectedTask, setSelectedTask] = useState(null)

	useEffect(() => {
		const { tasks, spareTime } = location.state
		setTasks(
			tasks.map(task => {
				return { ...task, time: 0, hour: '0', minute: '0' }
			}),
		)
		setTotalTime(convertHourMinuteToSeconds(spareTime))
	}, [location])

	useEffect(() => {
		const nextTotalTime = initialTotal - tasks.reduce((acc, task) => acc + task.time, 0)
		setTotalTime(nextTotalTime)
	}, [initialTotal, tasks])

	const checkTimeValidation = (inputTime, currentTime) => {
		const availableTime = totalTime + currentTime
		if (availableTime - inputTime < 0) {
			setIsTimeOver(true)
			return false
		}
		return true
	}

	const handleSubmit = time => {
		const { hour, minute } = time // 타임에서 아워미닛 빼주고
		const inputTime = convertHourMinuteToSeconds(time)
		const currentTime = selectedTask.time

		if (!checkTimeValidation(inputTime, currentTime)) return

		const nextTasks = tasks.map(task =>
			task.id === selectedTask.id ? { ...task, hour, minute, time: inputTime } : task,
		)

		setTasks(nextTasks)
		setIsTimeOver(false)
		setSelectedTask(null)
	}

	const handleTaskBoxClick = task => {
		setIsTimeOver(false)
		setSelectedTask(task)
	}

	const handleNextPageClick = () => {
		const newTimers = {}
		tasks.forEach(({ id, task, time }) => (newTimers[id] = { name: task, time, isRunning: false }))
		setTimers(newTimers)
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
							handleTaskBoxClick(task)
						}}
					/>
				))}
			</BoxContainer>
			{selectedTask && <TimeSelectForm targetTask={selectedTask} onSubmit={handleSubmit} />}
			{isTimeOver && <Text color="red">남은 시간이 부족합니다.</Text>}
			<ButtonArea>
				<Link to="/updateTimeDivider" state={{ tasks }}>
					<Button onClick={handleNextPageClick}>{BUTTON_TEXT.VALID}</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default CreateTimeDivider

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
