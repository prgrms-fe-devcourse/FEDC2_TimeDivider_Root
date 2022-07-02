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
			<Text size={2.2} strong block>
				{targetTask.task}
			</Text>
			<Content>
				<Select name="hour" value={time.hour} data={HOUR_NUMBERS} onChange={handleChange} />
				<Text size={1.4}>시간</Text>
				<Select name="minute" value={time.minute} data={MINUTE_NUMBERS} onChange={handleChange} />
				<Text size={1.4}>분</Text>
				<Button width={7.9} height={3.9} fontSize={1.6}>
					Set
				</Button>
			</Content>
		</Form>
	)
}

const Form = styled.form``

const Content = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 1rem;
`

export default TimeSelectForm
