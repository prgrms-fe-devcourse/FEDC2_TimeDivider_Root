import * as authApis from './apis/authApis'
import * as userApis from './apis/userApis'

const apis = {
	...authApis,
	...userApis,
}

export default apis
