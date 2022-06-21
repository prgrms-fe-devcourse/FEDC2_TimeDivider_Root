import { spareTimeState, isValidSpareTimeState, timerNamesState } from 'state/creatingTimer'
import { useRecoilState, useRecoilValue } from 'recoil'

const useCreatingTimers = () => {
	const [spareTime, setSpareTime] = useRecoilState(spareTimeState)
	const [timerNames, setTimerNames] = useRecoilState(timerNamesState)
	const isValidSpareTime = useRecoilValue(isValidSpareTimeState)

	const updateSpareTime = newSpareTime => {
		setSpareTime(newSpareTime)
	}

	const addTimerName = (newTimerName = { id: '', name: '' }) => {
		setTimerNames([...timerNames, newTimerName])
	}

	const updateTimerName = newNames => {
		setTimerNames(newNames)
	}

	return {
		spareTime,
		updateSpareTime,
		isValidSpareTime,
		timerNames,
		addTimerName,
		updateTimerName,
	}
}

export default useCreatingTimers
