import { useState } from 'react'
import styled from 'styled-components'

import Button from 'shared/components/Button'
import Select from 'shared/components/Select'
import Text from 'shared/components/Text'

export const HOUR_NUMBERS = Array.from({ length: 24 }, (_, i) => {
	return { label: `${i}`, value: i }
})
export const MINUTE_NUMBERS = Array.from({ length: 6 }, (_, i) => {
	return { label: `${i * 10}`, value: i * 10 }
})

const TimeSelectForm = ({ intialTime, handleChangeTime }) => {
	const [time, setTime] = useState(intialTime)

	const handleChange = e => {
		const { name, value } = e.target
		setTime({ ...time, [name]: value })
		handleChangeTime({ ...time, [name]: value })
	}

	return (
		<Wrapper>
			<Content>
				<Select name="hour" value={time.hour} data={HOUR_NUMBERS} onChange={handleChange} />
				<Text size={1.4}>시간</Text>
				<Select name="minute" value={time.minute} data={MINUTE_NUMBERS} onChange={handleChange} />
				<Text size={1.4}>분</Text>
			</Content>
		</Wrapper>
	)
}

export default TimeSelectForm

const Content = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 1rem;
`
const Wrapper = styled.div`
	position: relative;
	width: 100%;
	margin: auto 0;
`
