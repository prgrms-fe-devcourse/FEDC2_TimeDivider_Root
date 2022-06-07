import Hello from '../components/Hello'

export default {
	title: 'Component/Hello',
	component: Hello,
	argTypes: {
		children: { control: 'text' },
	},
}

export const Default = args => <Hello {...args} />
