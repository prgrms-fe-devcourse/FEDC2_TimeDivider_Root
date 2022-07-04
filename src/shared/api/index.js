import * as authApis from './apis/authApis'
import * as userApis from './apis/userApis'
import * as postApis from './apis/postApis'
import * as likeApis from './apis/likeApis'
import * as commentApis from './apis/commentApis'

const apis = {
	...authApis,
	...userApis,
	...postApis,
	...likeApis,
	...commentApis,
}

export default apis
