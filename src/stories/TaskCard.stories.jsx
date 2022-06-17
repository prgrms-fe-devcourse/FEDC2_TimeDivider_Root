import TaskCard from 'shared/components/TaskCard'

export default {
	title: 'Component/TaskCard',
	component: TaskCard,
}
const tasks = [
	{
		id: 1,
		name: '일하기',
	},
	{
		id: 2,
		name: '일하기',
	},
	{
		id: 3,
		name: '일하기',
	},
	{
		id: 4,
		name: '일하기',
	},
	{
		id: 5,
		name: '일하기',
	},
	{
		id: 6,
		name: '일하기',
	},
	{
		id: 7,
		name: '일하기',
	},
]
export const Default = args => <TaskCard tasks={tasks} {...args} />
