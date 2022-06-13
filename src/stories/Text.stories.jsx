import Text from 'shared/components/Text'

export default {
	title: 'Component/Text',
	component: Text,
	argTypes: {
		size: { control: 'number' },
		strong: { control: 'boolean' },
		color: { control: 'color' },
		block: { control: 'boolean' },
	},
}

export const Deafult = args => {
	return (
		<>
			<Text {...args}>Text</Text>
			<Text {...args}>Text</Text>
		</>
	)
}
