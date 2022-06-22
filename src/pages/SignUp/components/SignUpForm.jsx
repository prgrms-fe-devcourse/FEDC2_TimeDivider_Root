import useForm from 'shared/hooks/useForm'
import Button from 'shared/components/Button'
import Text from 'shared/components/Text'

import styled from 'styled-components'
import { themeColors } from '../../../shared/constants/colors'
import { CardForm, Wrapper } from '../../Login/style'

const SignUpForm = ({ onSubmit }) => {
	const initialValues = {
		email: '',
		fullName: '',
		password: '',
		passwordConfirm: '',
	}

	const validateSignUp = ({ email, fullName, password, passwordConfirm }) => {
		const newErrors = {}
		if (!email) newErrors.email = '이메일을 입력해주세요.'
		if (!fullName) newErrors.fullName = '닉네임을 입력해주세요.'
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
			<Text size={3}>회원가입</Text>
			<CardForm onSubmit={handleSubmit}>
				<Input type="email" name="email" placeholder="이메일" onChange={handleChange} />
				{errors.email && <Text color="red">{errors.email}</Text>}
				<Input type="text" name="fullName" placeholder="닉네임" onChange={handleChange} />
				{errors.fullName && <Text color="red">{errors.fullName}</Text>}
				<Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
				{errors.password && <Text color="red">{errors.password}</Text>}
				<Input
					type="password"
					name="passwordConfirm"
					placeholder="비밀번호 확인"
					onChange={handleChange}
				/>
				{errors.passwordConfirm && <Text color="red">{errors.passwordConfirm}</Text>}

				<ButtonWrapper>
					<Button type="submit" disabled={isLoading}>
						회원가입
					</Button>
				</ButtonWrapper>
			</CardForm>
		</Wrapper>
	)
}

export default SignUpForm

export const Input = styled.input`
	box-sizing: border-box;
	width: 33.3rem;
	height: 5rem;
	padding: 1.5rem;
	margin: 0;
	border: none;
	outline: none;
	align-items: center;
	font-size: 1.5rem;
	border-radius: 1.1rem;
	background-color: ${themeColors.labelBackground};
`
export const ButtonWrapper = styled.div`
	margin-top: 2.2rem;
`
