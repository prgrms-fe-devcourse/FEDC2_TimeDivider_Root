import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Text from '../components/Text'
import Button from '../components/Button'
import Input from '../components/Input'

const CreateTime = () => {
	const [task, setTask] = useState('')

	return (
		<>
			<NavBar>오늘의 시간</NavBar>

			<SubTitleArea>
				<Text style={{ fontSize: '1rem' }}>오늘 사용할 수 있는 시간은 얼마인가요?</Text>
			</SubTitleArea>

			<Input type="text" value={task} onChange={e => setTask(e.target.value)}></Input>

			<ButtonArea>
				<Link to="/createTodo">
					<Button disabled={true}>입력해주세요</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default CreateTime

const SubTitleArea = styled.div`
	height: 30vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ButtonArea = styled.div`
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`
