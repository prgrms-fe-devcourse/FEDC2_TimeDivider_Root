import Badge from 'shared/components/Badge'

export default {
	title: 'Component/Badge',
	component: Badge,
	argTypes: {
		children: { defaultValue: 'Badge', control: { type: 'text' } },
	},
}

export const Default = ({ text = 'Badge', ...args }) => {
	return (
		<div>
			<Badge text={text} {...args}></Badge>
		</div>
	)
}
