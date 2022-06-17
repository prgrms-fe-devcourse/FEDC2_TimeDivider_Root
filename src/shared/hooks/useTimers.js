import { useRecoilState } from 'recoil'
import { originIdState, timerObject, timerState } from '../../state/timer'

export const useTimers = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	const [originId, setOriginId] = useRecoilState(originIdState)

	const changeTime = (id, time) => {
		setTimers({
			...timers,
			[id]: { ...timers[id], time },
		})
	}

	const addTimer = (name, time, id) => {
		setTimers({ ...timers, [id]: timerObject(time, name) })
	}
	const completeTimer = id => {
		const newTimers = Object.assign({}, timers)
		newTimers[id] = {
			...newTimers[id],
			isRunning: false,
			disabled: true,
		}
		setTimers(newTimers)
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
		setOriginId(null)
		setTimers(newTimers)
	}
	return {
		timers,
		changeTime,
		addTimer,
		completeTimer,
		mergeTimer,
	}
}
