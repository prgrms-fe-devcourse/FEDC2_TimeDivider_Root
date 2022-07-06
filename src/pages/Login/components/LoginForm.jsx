import React from 'react'
import { themeColors } from 'shared/constants/colors'
import styled from 'styled-components'
import { useForm } from 'shared/hooks'
import { Button, Text } from 'shared/components'

const LoginForm = ({ onSubmit }) => {
	const initialValues = {
		email: '',
		password: '',
	}
	const { isLoading, handleChange, handleSubmit } = useForm({
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
		<Wrapper>
			<Text size={3}>로그인</Text>
			<CardForm onSubmit={handleSubmit}>
				<Input
					type="email"
					name="email"
					placeholder="이메일 주소"
					onChange={handleChange}
					autoComplete={'off'}
					required={true}
				/>
				<Input
					type="password"
					name="password"
					placeholder="비밀번호"
					onChange={handleChange}
					required={true}
				/>
				<Button type="submit" disabled={isLoading}>
					로그인
				</Button>
			</CardForm>
		</Wrapper>
	)
}

export default LoginForm

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
