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
	const isValidSpareTime = useMemo(
		() => spareTime.hour !== '0' || spareTime.minute !== '0',
		[spareTime],
	)

	const handleSpareTime = e => {
		const { name, value } = e.target
		setSpareTime({ ...spareTime, [name]: value })
	}

	return (
		<Wrapper>
			<NavBar backIcon />

			<SubTitle>
				<Text style={{ textAlign: 'start', fontSize: '2.2rem', padding: '0 3rem' }}>
					오늘 사용할 수 있는 시간은 얼마인가요?
				</Text>
			</SubTitle>

			<Section>
				<Select
					name={'hour'}
					data={HOUR_NUMBERS}
					style={{ width: '10rem' }}
					onChange={handleSpareTime}
				/>
				<Text size={2}>시간</Text>
				<Select
					name={'minute'}
					data={MINUTE_NUMBERS}
					style={{ width: '10rem' }}
					onChange={handleSpareTime}
				/>
				<Text size={2}>분</Text>
			</Section>

			<ButtonArea>
				<Link to="/createTask" state={{ spareTime }}>
					<Button disabled={!isValidSpareTime}>
						{!isValidSpareTime ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</ButtonArea>
		</Wrapper>
	)
}

export default CreateTime

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	padding-bottom: 3.3rem;
`
const SubTitle = styled.span`
	position: relative;
	left: -5rem;
	display: flex;
	align-items: flex-start;
	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
`

const Section = styled.section`
	display: flex;
	height: 50rem;
	gap: 1rem;
	justify-content: space-between;
	align-items: center;
	justify-content: center;
`

const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`
