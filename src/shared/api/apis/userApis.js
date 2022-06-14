import API from '../API'

export const getAllUserList = () => {
	API.get('/users/get-users')
		.then(res => {
			return {
				users: res.data,
			}
		})
		.catch(err => {
			console.log(err)
		})
}
