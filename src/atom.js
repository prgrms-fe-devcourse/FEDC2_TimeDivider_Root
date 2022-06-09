import { atom } from 'recoil'

export const timeState = atom({
	key: 'time',
	default: {}, //{id:time, anotherId: time}
})
export const nameState = atom({
	key: 'name',
	default: {}, //{id:name}
})

export const timerState = atom({
	key: 'timer',
	default: {},
})
export const currentTimerState = atom({
	key: 'currentTimer',
	default: { id: 'root', name: '' },
})
export const combineState = atom({
	key: 'combine',
	default: { id: '', newExpiryTimestamp: undefined },
})
