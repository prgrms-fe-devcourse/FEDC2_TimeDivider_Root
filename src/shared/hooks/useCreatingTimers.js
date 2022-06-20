import { atom, useRecoilState } from 'recoil'

export const TIME_TYPE = Object.freeze({
	HOUR: 'hour',
	MINUTE: 'minute',
})

const spareTimeState = atom({
	key: 'spareTimeState',
	default: { [TIME_TYPE.HOUR]: '0', [TIME_TYPE.MINUTE]: '0' },
})
const nameIdState = atom({
	key: 'nameIdState',
	default: [], // {id,name}
})

export const useCreatingTimers = () => {
	const [spareTime, setSpareTime] = useRecoilState(spareTimeState)
	const [nameIds, setNameIds] = useRecoilState(nameIdState)

	const updateSpareTime = (timeType, value) => {
		setSpareTime({ ...spareTime, [timeType]: value })
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
		addNameId,
		updateNameIds,
	}
}
