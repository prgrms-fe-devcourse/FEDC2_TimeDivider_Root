import Text from '../components/Text'

export default {
	title: 'Component/Text',
	component: Text,
	argTypes: {
		size: { control: 'string' },
		strong: { control: 'boolean' },
		underline: { control: 'boolean' },
		delete: { control: 'boolean' },
		color: { control: 'color' },
		block: { control: 'boolean' },
		paragraph: { control: 'boolean' },
		code: { control: 'boolean' },
		mark: { control: 'boolean' },
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
