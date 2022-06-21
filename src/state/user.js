import { atom, selector } from 'recoil'
import { sessionStorageEffect } from './utils/storage'

export const loginDataState = atom({
	key: 'loginDataState',
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
export const userState = selector({
	key: 'userState',
	get: ({ get }) => {
		const loginData = get(loginDataState)
		return loginData.user
	},
	set: ({ get, set }, newUserState) => {
		set(loginDataState, { ...get(loginDataState), user: newUserState })
	},
})
