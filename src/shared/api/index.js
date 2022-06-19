import * as authApis from './apis/authApis'
import * as userApis from './apis/userApis'
import * as postApis from './apis/postApis'
import * as channelApis from './apis/channelApis'
const apis = {
	...authApis,
	...userApis,
	...postApis,
	...channelApis,
}

export default apis
