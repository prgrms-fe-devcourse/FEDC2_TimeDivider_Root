import { atom } from 'recoil'
import { localStorageEffect } from './utils/storage'

export const timerObject = (time, name, isRunning = false, disabled = false) => {
	return { time, name, isRunning, disabled }
}

export const [defaultMode, addMode, doneMode, mergeMode, resetMode] = [
	'defaultMode',
	'addMode',
	'doneMode',
	'mergeMode',
	'resetMode',
]

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
