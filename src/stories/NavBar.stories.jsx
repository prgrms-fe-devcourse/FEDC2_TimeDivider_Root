import NavBar from 'shared/components/NavBar'

export default {
	title: 'Component/NavBar',
	component: NavBar,
	argTypes: {
		children: { defaultValue: 'Nav', control: { type: 'text' } },
		backIcon: { control: { type: 'boolean' } },
	},
}

export const Default = args => {
	return <NavBar {...args}></NavBar>
}
