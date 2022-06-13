import Button from 'shared/components/Button'

export default {
	title: 'Component/Button',
	component: Button,
	argTypes: {
		children: { defaultValue: 'Button', control: { type: 'text' } },
		size: { control: { type: 'text' } },
		disabled: { control: { type: 'boolean' } },
		inline: { control: { type: 'boolean' } },
		rect: { control: { type: 'boolean' } },
	},
}

export const Default = args => {
	return (
		<div>
			<Button {...args}></Button>
			<Button {...args}></Button>
		</div>
	)
}
