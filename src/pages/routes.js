import Home from 'pages/Home'

import Login from 'pages/Login'
import Signup from 'pages/SignUp'
import MyPage from 'pages/MyPage'
import SelectUserType from 'pages/SelectUserType'

import CreateTime from 'pages/CreateTime'
import CreateTask from 'pages/CreateTask'
import CreateTimeDivider from 'pages/CreateTimeDivider'
import UpdateTimeDivider from 'pages/UpdateTimeDivider'
import ShareTask from 'pages/ShareTask'

import NotFound from 'pages/NotFound'
import MyPageEdit from 'pages/MyPageEdit'

const routes = [
	{ path: 'myPageEdit', view: MyPageEdit },
	{ path: 'selectUserType', view: SelectUserType },
	{ path: 'signup', view: Signup },
	{ path: 'login', view: Login },
	{ path: 'signup', view: Signup },
	{
		path: 'myPage',
		view: MyPage,
		title: '마이페이지',
	},
	{
		path: 'home',
		view: Home,
		title: '첫 화면',
	},
	{
		path: 'createTime',
		view: CreateTime,
		title: '오늘의 시간',
	},
	{
		path: 'createTask',
		view: CreateTask,
		title: '해야 할 일을 적어요',
	},
	{
		path: 'createTimeDivider',
		view: CreateTimeDivider,
		title: '시간을 분배해요',
	},
	{
		path: 'updateTimeDivider',
		view: UpdateTimeDivider,
		title: '모래시계 편집하기',
	},
	{
		path: 'shareTask',
		view: ShareTask,
		title: '할일 공유 게시판',
	},
	{
		path: '*',
		view: NotFound,
		title: '404',
	},
]

export default routes
