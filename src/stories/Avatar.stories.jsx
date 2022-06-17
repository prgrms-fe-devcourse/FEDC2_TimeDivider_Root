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
	},
}

export const Default = args => <Avatar {...args} />
