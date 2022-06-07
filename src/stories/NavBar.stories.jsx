import NavBar from '../components/NavBar'

export default {
	title: 'Component/NavBar',
	component: NavBar,
}

export const Default = args => {
	return <NavBar {...args}>{args.children}</NavBar>
}
