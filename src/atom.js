import { atom } from 'recoil'

export const timerState = atom({
	key: 'time',
	default: {}, //{id:{time, name}}, anotherId: {time,name}}
})

export const currentTimerState = atom({
	key: 'currentTimer',
	default: { id: 'root', name: '' },
})
export const combineState = atom({
	key: 'combine',
	default: { id: '', newExpiryTimestamp: undefined },
})
