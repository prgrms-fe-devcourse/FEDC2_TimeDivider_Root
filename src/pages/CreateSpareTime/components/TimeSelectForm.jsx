import React, { useState } from 'react'
import styled from 'styled-components'
import { Select, Text } from 'shared/components'

export const HOUR_NUMBERS = Array.from({ length: 24 }, (_, i) => {
	return { label: `${i}`, value: i }
})
export const MINUTE_NUMBERS = Array.from({ length: 6 }, (_, i) => {
	return { label: `${i * 10}`, value: i * 10 }
})

const TimeSelectForm = ({ initialTime, handleChangeTime }) => {
	const [time, setTime] = useState(initialTime)

	const handleChange = e => {
		const { name, value } = e.target
		setTime({ ...time, [name]: value })
		handleChangeTime({ ...time, [name]: value })
	}

	return (
		<Wrapper>
			<Content>
				<Select
					fontSize={3}
					name="hour"
					value={time.hour}
					data={HOUR_NUMBERS}
					onChange={handleChange}
				/>
				<Text size={2.6}>시간</Text>
				<Select
					fontSize={3}
					name="minute"
					value={time.minute}
					data={MINUTE_NUMBERS}
					onChange={handleChange}
				/>
				<Text size={2.6}>분</Text>
			</Content>
		</Wrapper>
	)
}

export default TimeSelectForm

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`
const Wrapper = styled.div`
	position: relative;
	width: 100%;
	margin: auto 0;
`
