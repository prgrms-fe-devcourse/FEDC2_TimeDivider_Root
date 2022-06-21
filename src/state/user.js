import { atom, selector } from 'recoil'
import { sessionStorageEffect } from './utils/storage'

export const loginUserState = atom({
    key: 'loginUser',
    default: {
        token: null,
        user: {
            email: '',
            fullName: '',
            posts: [],
            image: '~~~~~',
        },
    },
    effects: [sessionStorageEffect('loginUser')],
})

export const UserState = selector({
    key: 'UserStatee',
    get: ({get }) => {
        const spareTime = get(loginUserState)
        return spareTime.hour !== '0' || spareTime.minute !== '0'
    },
})