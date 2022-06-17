import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import * as S from './style'

import Button from 'shared/components/Button'
import NavBar from 'shared/components/NavBar'
import TaskBox from 'shared/components/TaskBox'
import Text from 'shared/components/Text'
import TimeSelectForm from 'shared/components/TimeSelectForm'
import { convertHourMinuteToSeconds, convertSecondsToHourMinute } from 'shared/utils/convertTime'
import { useSetRecoilState } from 'recoil'
import { timerObject, timerState } from 'atom'
import { themeColors } from 'shared/constants/colors'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateTimeDivider = () => {
	const location = useLocation()
	const initialTotal = convertHourMinuteToSeconds(location.state.spareTime)

	const setTimers = useSetRecoilState(timerState)

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
		return totalTime + currentTime - inputTime >= 0 ? true : false
	}

	const handleSubmit = time => {
		const { hour, minute } = time
		const inputTime = convertHourMinuteToSeconds(time)
		const currentTime = selectedTask.time

		if (!checkTimeValidation(inputTime, currentTime)) {
			setIsTimeOver(true)
			return
		}

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
		tasks.forEach(({ id, task, time }) => (newTimers[id] = timerObject(time, task)))
		setTimers(newTimers)
	}

	return (
		<>
			<NavBar backIcon />
			<S.SubTitle>
				<Text size={2.2} textAlign={'start'}>
					오늘 해야할 일들에 시간을 분배하세요.
				</Text>
			</S.SubTitle>
			<S.TimeSection>
				<Text
					size={2.0}
					color={themeColors.primary}
					style={{ fontSize: '2.0rem', marginBottom: '1rem' }}
				>
					남은 분배 가능 시간
				</Text>
				<Text size={3.5}>
					{convertSecondsToHourMinute(totalTime).hour} :{' '}
					{convertSecondsToHourMinute(totalTime).minute}
				</Text>
			</S.TimeSection>
			<S.TaskArea>
				<S.BoxContainer>
					{tasks.map(task => (
						<TaskBox
							key={task.id}
							task={task}
							onClick={() => {
								handleTaskBoxClick(task)
							}}
						/>
					))}
				</S.BoxContainer>
			</S.TaskArea>
			<S.FormSection>
				{selectedTask && <TimeSelectForm targetTask={selectedTask} onSubmit={handleSubmit} />}
				{isTimeOver && (
					<Text color="red" size={1.4}>
						남은 시간이 부족합니다.
					</Text>
				)}
			</S.FormSection>
			<S.ButtonArea>
				<Link to="/updateTimeDivider" state={{ tasks }}>
					<Button onClick={handleNextPageClick}>{BUTTON_TEXT.VALID}</Button>
				</Link>
			</S.ButtonArea>
		</>
	)
}

export default CreateTimeDivider
