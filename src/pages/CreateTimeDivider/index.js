import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { TaskBox, Text, TimeSelectForm } from 'shared/components'
import { convertHourMinuteToSeconds, convertSecondsToHourMinute } from 'shared/utils/convertTime'
import { timerObject, timerState } from 'state/timer'
import { themeColors } from 'shared/constants/colors'

import { useCreatingTimers } from 'shared/hooks'
import CreatingTimerLayout from 'shared/layout/CreatingTimerLayout'

const BUTTON_TEXT = Object.freeze({
	VALID: '완료',
	INVALID: '시간을 입력해주세요',
})

const CreateTimeDivider = () => {
	const { spareTime, timerNames } = useCreatingTimers()
	const initialTotal = convertHourMinuteToSeconds(spareTime)

	const setTimers = useSetRecoilState(timerState)

	const [totalTime, setTotalTime] = useState(0)
	const [isTimeOver, setIsTimeOver] = useState(false)
	const [tasks, setTasks] = useState([])
	const [selectedTask, setSelectedTask] = useState(null)

	useEffect(() => {
		setTasks(
			timerNames.map(task => {
				return { ...task, time: 0, hour: '0', minute: '0' }
			}),
		)
		setTotalTime(convertHourMinuteToSeconds(spareTime))
	}, [])

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
		tasks.forEach(({ id, name, time }) => (newTimers[id] = timerObject(time, name)))
		setTimers(newTimers)
	}

	return (
		<>
			<CreatingTimerLayout
				subTitleText="오늘 해야할 일들에 시간을 분배하세요."
				description
				nextStepLink="/updateTimeDivider"
				onButtonClick={handleNextPageClick}
				buttonText={BUTTON_TEXT.VALID}
			>
				<TimeSection>
					<TitleWrapper>
						<Text size={2.0} color={themeColors.primary}>
							남은 분배 가능 시간
						</Text>
					</TitleWrapper>

					<Text size={3.5}>
						{convertSecondsToHourMinute(totalTime).hour} :{' '}
						{convertSecondsToHourMinute(totalTime).minute}
					</Text>
				</TimeSection>
				<TaskArea>
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
				</TaskArea>
				<FormSection>
					{selectedTask && <TimeSelectForm targetTask={selectedTask} onSubmit={handleSubmit} />}
					{isTimeOver && (
						<Text color="red" size={1.4}>
							남은 시간이 부족합니다.
						</Text>
					)}
				</FormSection>
			</CreatingTimerLayout>
		</>
	)
}

export const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

export const BoxContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: center;
`

export const SubTitle = styled.span`
	position: relative;
	left: -2.5rem;
	display: flex;
	flex-direction: column;

	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
`

export const TimeSection = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
	margin-top: 2.4rem;
	margin-bottom: 2.4rem;
`

export const FormSection = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 26rem;
	line-height: 3.2rem;
	text-align: center;
	margin-top: 4.8rem;
	margin-bottom: 2.4rem;
`

export const TaskArea = styled.div`
	position: relative;
	width: 100%;
	height: 20rem;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	padding: 1rem;
	box-sizing: border-box;

	::-webkit-scrollbar {
		display: none;
	}
`
export const TitleWrapper = styled.div`
	margin-bottom: 1rem;
`

export default CreateTimeDivider
