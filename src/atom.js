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
export const timerObject = (time, name, isRunning = false, disabled = false) => {
	return { time, name, isRunning, disabled }
}
export const [defaultMode, addMode, doneMode] = ['defaultMode', 'addMode', 'doneMode']

export const timerState = atom({
	key: 'timer',
	default: {}, //timerObject
	effects: [localStorageEffect('timer')],
})

export const modeState = atom({
	key: 'mode',
	default: defaultMode,
})

export const originIdState = atom({
	key: 'originId',
	default: null,
})
