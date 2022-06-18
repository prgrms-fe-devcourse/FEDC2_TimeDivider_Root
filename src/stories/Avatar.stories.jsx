import Avatar from 'shared/components/Avatar'

export default {
	title: 'Component/Avatar',
	compnent: Avatar,
	argTypes: {
		src: { defaultValue: 'https://picsum.photos/200' },
		size: {
			defaultValue: 3,
			control: { type: 'number' },
		},
		isLoading: {
			defaultValue: false,
			control: { type: 'boolean' },
		},
	},
}

export const Default = args => <Avatar {...args} />
