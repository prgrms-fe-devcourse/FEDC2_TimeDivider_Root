import * as authApis from './apis/authApis'
import * as userApis from './apis/userApis'
import * as postApis from './apis/postApis'
import * as channelApis from './apis/channelApis'
import * as likeApis from './apis/likeApis'
import * as commentApis from './apis/commentApis'

const apis = {
	...authApis,
	...userApis,
	...postApis,
	...channelApis,
	...likeApis,
	...commentApis,
}

export default apis
