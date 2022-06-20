import { atom, useRecoilState } from 'recoil'
import { convertHourMinuteToSeconds } from '../../../shared/utils/convertTime'
import { useCreatingTimers } from '../../../shared/hooks/useCreatingTimers'
import { useEffect, useState } from 'react'

const pendingTimerState = atom({
	key: 'pendingTimerState',
	default: [],
})

export const usePendingTimers = () => {
	const { spareTime, nameIds } = useCreatingTimers()
	const [pendingTimers, setPendingTimers] = useRecoilState(pendingTimerState)
	const [totalTime, setTotalTime] = useState(0)
	const [selectedTask, setSelectedTask] = useState(null)
	const [isTimeOver, setIsTimeOver] = useState(false)

	useEffect(() => {
		const nextTotalTime =
			convertHourMinuteToSeconds(spareTime) -
			pendingTimers.reduce((acc, timer) => acc + timer.time, 0)
		setTotalTime(nextTotalTime)
	}, [spareTime, pendingTimers])

	const checkTimeValidation = (inputTime, currentTime) => {
		return totalTime + currentTime - inputTime >= 0
	}

	const initPendingTimers = () => {
		setPendingTimers(
			nameIds.map(({ id, name }) => {
				return { id, name, time: 0, hour: '0', minute: '0' }
			}),
		)
		setTotalTime(convertHourMinuteToSeconds(spareTime))
	}
	const changeTime = time => {
		const { hour, minute } = time
		const inputTime = convertHourMinuteToSeconds(time)
		const currentTime = selectedTask.time

		if (!checkTimeValidation(inputTime, currentTime)) {
			setIsTimeOver(true)
			return
		}

		const newPendingTimers = pendingTimers.map(task =>
			task.id === selectedTask.id ? { ...task, hour, minute, time: inputTime } : task,
		)

		setPendingTimers(newPendingTimers)
		setIsTimeOver(false)
		setSelectedTask(null)
	}
	const handlePendingTimerBoxClick = task => {
		setIsTimeOver(false)
		setSelectedTask(task)
	}
	return {
		isTimeOver,
		selectedTask,
		totalTime,
		pendingTimers,
		setPendingTimers,
		initPendingTimers,
		changeTime,
		handlePendingTimerBoxClick,
	}
}
