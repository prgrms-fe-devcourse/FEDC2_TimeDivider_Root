import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Text from '../components/Text'
import Button from '../components/Button'

const TIME_REGEX = Object.freeze({
	HOUR: '(([1-2][0-4])|([1][5-9])|[0-9])',
	MINUTE: '(([1-5][0-9])|([2][0-9])|[0-9])',
})

const TIME_TYPE = Object.freeze({
	HOUR: 'hours',
	MINUTE: 'minutes',
})

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateTime = () => {
	const [spareTime, setSpareTime] = useState({ [TIME_TYPE.HOUR]: '', [TIME_TYPE.MINUTE]: '' })
	const [isValidSpareTime, setIsValidSpareTime] = useState(false)

	const handleSpareTime = (name, value) => {
		const newSpareTime = { ...spareTime, [name]: value }
		setSpareTime(newSpareTime)
	}

	const handleIsValidSpareTime = newSpareTime => {
		if (newSpareTime[TIME_TYPE.HOUR] > 0 || newSpareTime[TIME_TYPE.MINUTE] > 0) {
			setIsValidSpareTime(true)
			return
		}
		setIsValidSpareTime(false)
	}

	useEffect(() => {
		handleIsValidSpareTime(spareTime)
	}, [spareTime])

	return (
		<>
			<NavBar>오늘의 시간</NavBar>

			<SubTitleArea>
				<Text style={{ fontSize: '1.3rem' }}>오늘 사용할 수 있는 시간은 얼마인가요?</Text>
			</SubTitleArea>

			<InputBox>
				<Label>시간(hour)</Label>
				<Input
					type="text"
					maxLength={2}
					name="hours"
					value={spareTime[TIME_TYPE.HOUR]}
					autoFocus={true}
					pattern={TIME_REGEX.HOUR}
					onChange={e => handleSpareTime(TIME_TYPE.HOUR, e.target.value)}
				></Input>
			</InputBox>

			<InputBox>
				<Label>분(minutes)</Label>
				<Input
					type="text"
					maxLength={2}
					value={spareTime[TIME_TYPE.MINUTE]}
					pattern={TIME_REGEX.MINUTE}
					onChange={e => handleSpareTime(TIME_TYPE.MINUTE, e.target.value)}
				></Input>
			</InputBox>

			<ButtonArea>
				<Link to="/createTask">
					<Button disabled={!isValidSpareTime}>
						{!isValidSpareTime ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
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

const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin: 1rem;
`

const Label = styled.label`
	font-size: 1.2rem;
`

const Input = styled.input`
	width: 13rem;
	height: 2rem;
	font-size: 1.5rem;
	border: none;
	border-bottom: 1px solid #00dfabed;
	outline: none;
	text-align: center;
	:valid {
		border: #00dfabed solid 3px;
	}
	:invalid {
		border: #ff0000 solid 3px;
	}
`
