import SignUpForm from '../components/SignUpForm'

export default {
	title: 'Component/SignUpForm',
	component: SignUpForm,
	argTypes: {
		onSubmit: { action: 'onSubmit' },
	},
}

export const Default = args => {
	return <SignUpForm {...args} />
}
