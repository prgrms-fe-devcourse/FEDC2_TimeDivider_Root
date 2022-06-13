import useForm from '../hooks/useForm'
import Button from './Button'
import Text from './Text'
import Input from './Input'
import CardForm from './CardForm'

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
				{errors.email && <Text style={{ color: 'red', margin: '0.2rem' }}>{errors.email}</Text>}
				<Input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
					style={{ marginTop: 8 }}
				/>
				{errors.password && (
					<Text style={{ color: 'red', margin: '0.2rem' }}>{errors.password}</Text>
				)}
				<Button type="submit" disabled={isLoading} style={{ marginTop: 16 }}>
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
