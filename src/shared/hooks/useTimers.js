import { useRecoilState, useResetRecoilState } from 'recoil'
import { originIdState, timerObject, timerState } from '../../state/timer'

export const useTimers = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	const resetOriginId = useResetRecoilState(originIdState)
	const changeTime = (id, time) => {
		setTimers({
			...timers,
			[id]: { ...timers[id], time },
		})
	}
	const toggleRunning = (id = '') => {
		const newTimers = Object.assign({}, timers)
		Object.keys(newTimers).forEach(timerId => {
			newTimers[timerId] = {
				...newTimers[timerId],
				isRunning: timerId === id ? !newTimers[id].isRunning : false,
			}
		})
		setTimers(newTimers)
	}
	const addTimer = (name, time, id) => {
		setTimers({ ...timers, [id]: timerObject(time, name) })
	}
	const completeTimer = id => {
		setTimers({ ...timers, [id]: { ...timers[id], isRunning: false, disabled: true } })
	}
	const mergeTimer = (originId, targetId) => {
		const newTimers = {
			...timers,
			[targetId]: {
				...timers[targetId],
				time: timers[targetId].time + timers[originId].time,
			},
		}
		delete newTimers[originId]
		resetOriginId()
		setTimers(newTimers)
	}

	return {
		timers,
		changeTime,
		toggleRunning,
		addTimer,
		completeTimer,
		mergeTimer,
	}
}
