import useForm from 'shared/hooks/useForm'
import Button from 'shared/components/Button'
import Text from 'shared/components/Text'
import Input from 'shared/components/Input'
import CardForm from 'shared/components/CardForm'

import styled from 'styled-components'

const SignUpForm = ({ onSubmit }) => {
	const initialValues = {
		email: '',
		password: '',
		passwordConfirm: '',
	}

	const validateSignUp = ({ email, password, passwordConfirm }) => {
		const newErrors = {}
		if (!email) newErrors.email = '이메일을 입력해주세요.'
		if (!password) newErrors.password = '비밀번호를 입력해주세요.'
		if (password !== passwordConfirm) newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
		return newErrors
	}

	const { errors, isLoading, handleChange, handleSubmit } = useForm({
		initialValues,
		onSubmit,
		validate: validateSignUp,
	})

	return (
		<Wrapper>
			<CardForm onSubmit={handleSubmit}>
				<Text size={3}>회원가입</Text>
				<Input type="email" name="email" placeholder="이메일" onChange={handleChange} />
				{errors.email && <Text color="red">{errors.email}</Text>}
				<Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
				{errors.password && <Text color="red">{errors.password}</Text>}
				<Input
					type="password"
					name="passwordConfirm"
					placeholder="비밀번호 확인"
					onChange={handleChange}
				/>
				{errors.passwordConfirm && <Text color="red">{errors.passwordConfirm}</Text>}
				<Button type="submit" disabled={isLoading}>
					가입하기
				</Button>
			</CardForm>
		</Wrapper>
	)
}

export default SignUpForm

const Wrapper = styled.div`
	display: flex;
	gap: 2rem;
	justify-content: center;
	align-items: center;
	height: 100%;
`
