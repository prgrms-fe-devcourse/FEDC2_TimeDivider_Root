import Select from 'shared/components/Select'

export default {
	title: 'Component/Select',
	component: Select,
	argTypes: {
		label: {
			control: 'text',
		},
		placeholder: {
			defaultValue: 'Placeholder',
			control: 'text',
		},
		block: {
			defaultValue: false,
			control: 'boolean',
		},
		invalid: {
			defaultValue: false,
			control: 'boolean',
		},
		disabled: {
			defaultValue: false,
			control: 'boolean',
		},
		required: {
			defaultValue: false,
			control: 'boolean',
		},
	},
}

export const Default = args => (
	<div>
		<Select data={['Item 1', 'Item 2', { label: 'Item 3', value: 'value' }]} {...args} />
	</div>
)
