import Home from '../pages/home'
import CreateTime from '../pages/createTime'
import CreateTodo from '../pages/createTodo'
import CreateTimeDivider from '../pages/createTimeDivider'
import UpdateTimeDivider from '../pages/updateTimeDivider'
import DoneToDoTimeDivider from '../pages/doneToDoTimeDivider'
import AddToDoTimeDivider from '../pages/addToDoTimeDivider'
import NotFound from '../pages/notFound'

const routes = [
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
		path: 'createTodo',
		view: CreateTodo,
		title: '해야 할 일을 적어요',
	},
	{
		path: 'createTimeDivider',
		view: CreateTimeDivider,
		title: '시간을 분배해요',
	},
	{
		path: 'updateDivider',
		view: UpdateTimeDivider,
		title: '모래시계 편집하기',
	},
	{
		path: 'doneTodo',
		view: DoneToDoTimeDivider,
		title: '할 일 완료하기',
	},
	{
		path: 'addTodo',
		view: AddToDoTimeDivider,
		title: '할 일 추가하기',
	},
	{
		path: '*',
		view: NotFound,
		title: '404',
	},
]

export default routes
