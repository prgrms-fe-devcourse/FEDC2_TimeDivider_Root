import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import Select from './Select'
import Text from './Text'

export const HOUR_NUMBERS = Array.from({ length: 24 }, (_, i) => {
	return { label: `${i}`, value: i }
})
export const MINUTE_NUMBERS = Array.from({ length: 6 }, (_, i) => {
	return { label: `${i * 10}`, value: i * 10 }
})

const TimeSelectForm = ({ targetTask, onSubmit, ...props }) => {
	const [time, setTime] = useState({ hour: '0', minute: '0' })

	const handleChange = e => {
		const { name, value } = e.target
		setTime({ ...time, [name]: value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(time)
		setTime({ hour: '0', minute: '0' })
	}

	useEffect(() => {
		const { hour, minute } = targetTask
		setTime({ hour, minute })
	}, [targetTask])

	return (
		<Form {...props} onSubmit={handleSubmit}>
			<Text>{targetTask.task}</Text>
			<Select
				name="hour"
				value={time.hour}
				data={HOUR_NUMBERS}
				label="시간"
				onChange={handleChange}
			/>
			<Select
				name="minute"
				value={time.minute}
				data={MINUTE_NUMBERS}
				label="분"
				onChange={handleChange}
			/>
			<Button width={7.9} height={3.9} fontSize={1.6}>
				Set
			</Button>
		</Form>
	)
}

export default TimeSelectForm

const Form = styled.form`
	display: flex;
	align-items: flex-end;
	gap: 1rem;
`
