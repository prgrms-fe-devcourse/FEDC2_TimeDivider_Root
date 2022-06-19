import { atom } from 'recoil'
import { sessionStorageEffect } from './utils/storage'

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
