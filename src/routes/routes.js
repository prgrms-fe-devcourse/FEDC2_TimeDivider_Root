import Home from 'pages/home'

import Login from 'pages/login'
import Signup from 'pages/signUp'
import MyPage from 'pages/myPage'

import CreateTime from 'pages/createTime'
import CreateTask from 'pages/createTask'
import CreateTimeDivider from 'pages/createTimeDivider'
import UpdateTimeDivider from 'pages/updateTimeDivider'
import NotFound from 'pages/notFound'
import ShareTask from 'pages/shareTask'

const routes = [
	{ path: 'login', view: Login },
	{ path: 'signup', view: Signup },
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
		path: 'CreateTask',
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
		path: '*',
		view: NotFound,
		title: '404',
	},
	{
		path: 'myPage',
		view: MyPage,
		title: '마이페이지',
	},
	{
		path: 'shareTask',
		view: ShareTask,
		title: '할일 공유 게시판',
	},
]

export default routes
