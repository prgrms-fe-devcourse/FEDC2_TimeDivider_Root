import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import NavBar from 'shared/components/NavBar'
import Text from 'shared/components/Text'
import Button from 'shared/components/Button'
import Select from 'shared/components/Select'

const HOUR_NUMBERS = Array.from({ length: 24 }, (_, i) => {
	return { label: `${i}`, value: i }
})

const MINUTE_NUMBERS = Array.from({ length: 6 }, (_, i) => {
	return { label: `${i * 10}`, value: i * 10 }
})

const TIME_TYPE = Object.freeze({
	HOUR: 'hour',
	MINUTE: 'minute',
})

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateTime = () => {
	const [spareTime, setSpareTime] = useState({ [TIME_TYPE.HOUR]: '0', [TIME_TYPE.MINUTE]: '0' })
	const [isValidSpareTime, setIsValidSpareTime] = useState(false)

	const handleSpareTime = e => {
		const { name, value } = e.target
		setSpareTime({ ...spareTime, [name]: value })
	}

	const handleIsValidSpareTime = spareTime => {
		if (spareTime.hour === '0' && spareTime.minute === '0') {
			setIsValidSpareTime(false)
			return
		}
		setIsValidSpareTime(true)
	}

	useMemo(() => {
		handleIsValidSpareTime(spareTime)
	}, [spareTime])

	return (
		<>
			<NavBar backIcon>오늘의 시간</NavBar>
			<SubTitleArea>
				<Text size={1.3}>오늘 사용할 수 있는 시간은 얼마인가요?</Text>
			</SubTitleArea>
			<Select
				name={'hour'}
				data={HOUR_NUMBERS}
				style={{ width: '10rem' }}
				label={'시간'}
				onChange={handleSpareTime}
				placeholder={'시간 선택하기'}
			/>
			<Select
				name={'minute'}
				data={MINUTE_NUMBERS}
				style={{ width: '10rem' }}
				label={'분'}
				onChange={handleSpareTime}
				placeholder={'분 선택하기'}
			/>
			<ButtonArea>
				<Link to="/createTask" state={{ spareTime }}>
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
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`
