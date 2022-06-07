import { atom } from 'recoil'

export const timerState = atom({
	key: 'time', // unique ID (with respect to other atoms/selectors)
	default: {}, // default value (aka initial value)
})
export const currentTimerState = atom({
	key: 'currentTimer',
	default: { id: 'root', name: '' },
})
