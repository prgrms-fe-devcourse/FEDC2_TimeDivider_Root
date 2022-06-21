import { atom, selector } from 'recoil'

const TIME_TYPE = Object.freeze({
	HOUR: 'hour',
	MINUTE: 'minute',
})

export const spareTimeState = atom({
	key: 'spareTimeState',
	default: { [TIME_TYPE.HOUR]: '0', [TIME_TYPE.MINUTE]: '0' },
})

export const isValidSpareTimeState = selector({
	key: 'isValidSpareTimeState',
	get: ({ get }) => {
		const spareTime = get(spareTimeState)
		return spareTime.hour !== '0' || spareTime.minute !== '0'
	},
})

export const timerNamesState = atom({
	key: 'timerNamesState',
	default: [],
})
