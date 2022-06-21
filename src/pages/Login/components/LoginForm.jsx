import useForm from 'shared/hooks/useForm'
import Button from 'shared/components/Button'
import Text from 'shared/components/Text'

import * as S from '../style'

const LoginForm = ({ onSubmit }) => {
	const initialValues = {
		email: '',
		password: '',
	}
	const { errors, isLoading, handleChange, handleSubmit } = useForm({
		initialValues,
		onSubmit,
		validate: ({ email, password }) => {
			const newErrors = {}
			if (!email) newErrors.email = '이메일을 입력해주세요.'
			if (!password) newErrors.password = '비밀번호를 입력해주세요.'
			return newErrors
		},
	})

	return (
		<S.Wrapper>
			<Text size={3}>로그인</Text>
			<S.CardForm onSubmit={handleSubmit}>
				<S.Input type="email" name="email" placeholder="이메일 주소" onChange={handleChange} />
				{errors.email && <Text color="red">{errors.email}</Text>}
				<S.Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
				{errors.password && <Text color="red">{errors.password}</Text>}
				<Button type="submit" disabled={isLoading}>
					Login
				</Button>
			</S.CardForm>
		</S.Wrapper>
	)
}

export default LoginForm
