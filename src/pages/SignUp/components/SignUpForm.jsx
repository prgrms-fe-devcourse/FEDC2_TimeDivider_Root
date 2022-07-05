import styled from 'styled-components'

import { useForm } from 'shared/hooks'
import { Button, Text } from 'shared/components'
import { themeColors } from 'shared/constants/colors'

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
				<Input
					type="email"
					name="email"
					placeholder="이메일"
					onChange={handleChange}
					required={true}
				/>
				<Input
					type="text"
					name="fullName"
					placeholder="닉네임"
					onChange={handleChange}
					required={true}
				/>
				<Input
					type="password"
					name="password"
					placeholder="비밀번호"
					onChange={handleChange}
					required={true}
				/>
				<Input
					type="password"
					name="passwordConfirm"
					placeholder="비밀번호 확인"
					onChange={handleChange}
					required={true}
				/>
				{errors.passwordConfirm && (
					<Text size={1.3} color="red">
						{errors.passwordConfirm}
					</Text>
				)}

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

export const ButtonWrapper = styled.div`
	margin-top: 2.2rem;
`
export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`

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
export const CardForm = styled.form`
	padding: 1.5rem;
	width: 100%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	row-gap: 1rem;
	align-items: center;
	margin-top: 2rem;
`
