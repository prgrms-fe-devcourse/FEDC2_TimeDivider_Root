import { useState } from 'react'

const dummyUser = {
	profileImg: 'https://tva1.sinaimg.cn/large/e6c9d24egy1h3bief308rj20dw0dwwem.jpg',
	name: '김경현',
	email: 'codeisneverodd@gmail.com',
	shareAllowed: false,
}
export const useUser = () => {
	const [user, setUser] = useState(dummyUser)

	const changeName = name => {
		setUser({ ...user, name })
	}
	const changeEmail = email => {
		setUser({ ...user, email })
	}

	return {
		user,
		changeName,
		changeEmail,
	}
}
