import Button from '../components/Button'

export default {
	title: 'Component/Button',
	component: <Button></Button>,
	argTypes: {
		children: {
			control: { type: 'text' },
		},
		disabled: {
			control: { type: 'boolean' },
		},
		onClick: { action: 'onClick' },
	},
}

export const Default = args => {
	return <Button {...args}>{args.children}</Button>
}
