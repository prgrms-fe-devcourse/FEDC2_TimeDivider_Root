import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

export const TIME_TYPE = Object.freeze({
	HOUR: 'hour',
	MINUTE: 'minute',
})

const spareTimeState = atom({
	key: 'spareTimeState',
	default: { [TIME_TYPE.HOUR]: '0', [TIME_TYPE.MINUTE]: '0' },
})

const isValidSpareTimeState = selector({
	key: 'isValidSpareTimeState',
	get: ({ get }) => {
		const spareTime = get(spareTimeState)
		return spareTime.hour !== '0' || spareTime.minute !== '0'
	},
})

const namesState = atom({
	key: 'namesState',
	default: [],
})

const useCreatingTimers = () => {
	const [spareTime, setSpareTime] = useRecoilState(spareTimeState)
	const [nameIds, setNameIds] = useRecoilState(namesState)
	const isValidSpareTime = useRecoilValue(isValidSpareTimeState)

	const updateSpareTime = newSpareTime => {
		setSpareTime(newSpareTime)
	}
	const addNameId = (id, name) => {
		setNameIds([...nameIds, { id, name }])
	}
	const updateNameIds = newNames => {
		setNameIds(newNames)
	}

	return {
		spareTime,
		nameIds,
		updateSpareTime,
		isValidSpareTime,
		addNameId,
		updateNameIds,
	}
}

export default useCreatingTimers
