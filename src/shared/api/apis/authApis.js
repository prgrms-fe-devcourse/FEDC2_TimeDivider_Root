import API from '../API'

export const requestLogin = async(userInfo = { email: null, password: null }) => {
    const { isSuccess, message, data = {} } = await API.post('/login', userInfo)
    if (!isSuccess) {
        return { isSuccess, message }
    }
    const { user, token } = data
    return { isSuccess, user, token, message: '로그인에 성공했습니다.' }
}

export const requestSignup = async(
    userInfo = { email: null, fullName: 'unknown', password: null },
) => {
    const { isSuccess, message, data = {} } = await API.post('/signup', userInfo)

    if (!isSuccess) {
        return { isSuccess, message }
    }

    const { user, token } = data
    return { isSuccess, user, token, message: '회원가입에 성공했습니다.' }
}

export const requestLogout = async() => {
    const { isSuccess, data } = await API.post('/logout')

    return { isSuccess, message: data }
}