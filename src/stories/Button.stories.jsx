import { colors } from 'shared/constants/colors'
import Button from 'shared/components/Button'

export default {
	title: 'Component/Button',
	component: Button,
	argTypes: {
		children: { defaultValue: 'Button', control: { type: 'text' } },
		width: { defaultValue: 33, control: { type: 'number' } },
		height: { defaultValue: 5.8, control: { type: 'number' } },
		backgroundColor: { defaultValue: colors.blue, control: { type: 'color' } },
		fontSize: { control: { type: 'number' } },
		fontColor: { defaultValue: colors.white, control: { type: 'color' } },
		borderColor: { control: { type: 'color' } },
		disabled: { defaultValue: false, control: { type: 'boolean' } },
		inline: { control: { type: 'boolean' } },
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
