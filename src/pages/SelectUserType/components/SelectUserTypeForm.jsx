import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from 'shared/components/Button'
import CardForm from 'shared/components/CardForm'

export const SelectUserTypeForm = () => {
	return (
		<Wrapper>
			<CardForm>
				<Link to="/login">
					<Button>로그인</Button>
				</Link>
				<Link to="/signup">
					<Button>회원가입</Button>
				</Link>
				<Link to="/home">
					<Button>로그인 없이 사용하기</Button>
				</Link>
			</CardForm>
		</Wrapper>
	)
}

export default SelectUserTypeForm

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`
