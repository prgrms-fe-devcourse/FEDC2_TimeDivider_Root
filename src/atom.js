import { atom } from 'recoil'
const localStorageEffect =
	key =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key)
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue))
		}

		onSet((newValue, _, isReset) => {
			isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
		})
	}
export const timerState = atom({
	key: 'timer',
	default: {}, //{id:{time, name}}, anotherId: {time,name}}
	effects: [localStorageEffect('timer')],
})

export const currentTimerState = atom({
	key: 'currentTimer',
	default: { id: 'root', name: '' },
	effects: [localStorageEffect('currentTimer')],
})
export const combineState = atom({
	key: 'combine',
	default: { id: '', newExpiryTimestamp: undefined },
	effects: [localStorageEffect('combine')],
})
