import { atom } from 'recoil'

export const timerObject = (time, name, isRunning = false, disabled = false) => {
	return { time, name, isRunning, disabled }
}
export const [defaultMode, addMode, doneMode, mergeMode] = [
	'defaultMode',
	'addMode',
	'doneMode',
	'mergeMode',
]

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

const sessionStorageEffect =
	key =>
	({ setSelf, onSet }) => {
		const savedValue = sessionStorage.getItem(key)
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue))
		}

		onSet((newValue, _, isReset) => {
			isReset
				? sessionStorage.removeItem(key)
				: sessionStorage.setItem(key, JSON.stringify(newValue))
		})
	}

export const loginUserState = atom({
	key: 'loginUser',
	default: {
		token: null,
		user: {
			email: '',
			fullName: '',
			posts: [],
		},
	},
	effects: [sessionStorageEffect('loginUser')],
})
