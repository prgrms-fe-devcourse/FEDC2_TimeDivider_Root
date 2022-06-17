import useForm from 'shared/hooks/useForm'
import Button from 'shared/components/Button'
import Text from 'shared/components/Text'
import Input from 'shared/components/Input'
import CardForm from 'shared/components/CardForm'

import styled from 'styled-components'

const LoginForm = ({ onSubmit }) => {
	const { errors, isLoading, handleChange, handleSubmit } = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit,
		validate: ({ email, password }) => {
			const newErrors = {}
			if (!email) newErrors.email = '이메일을 입력해주세요.'
			if (!password) newErrors.password = '비밀번호를 입력해주세요.'
			return newErrors
		},
	})

	return (
		<Container>
			<CardForm onSubmit={handleSubmit}>
				<Text size={2}>Login</Text>
				<Input type="email" name="email" placeholder="Email" onChange={handleChange} />
				{errors.email && <Text color="red">{errors.email}</Text>}
				<Input type="password" name="password" placeholder="Password" onChange={handleChange} />
				{errors.password && <Text color="red">{errors.password}</Text>}
				<Button type="submit" disabled={isLoading}>
					Login
				</Button>
			</CardForm>
		</Container>
	)
}

export default LoginForm

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80%;
	height: 100%;
`
