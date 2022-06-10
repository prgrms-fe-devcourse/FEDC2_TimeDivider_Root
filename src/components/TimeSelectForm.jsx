import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import Select from './Select'
import Text from './Text'

const HOUR_NUMBERS = Array.from({ length: 24 }, (_, i) => {
	return { label: `${i}`, value: i }
})
const MINUTE_NUMBERS = Array.from({ length: 6 }, (_, i) => {
	return { label: `${i * 10}`, value: i * 10 }
})

const Form = styled.form`
	display: flex;
	align-items: flex-end;
	gap: 1rem;
`

const TimeSelectForm = ({ targetTask, onSubmit, ...props }) => {
	const [selectedTask, setSelectedTask] = useState({ hour: '0', minute: '0' })

	const handleChange = e => {
		const { name, value } = e.target
		setSelectedTask({ ...selectedTask, [name]: value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(selectedTask)
		setSelectedTask({})
	}

	useEffect(() => {
		setSelectedTask(targetTask)
	}, [targetTask])

	return (
		<Form {...props} onSubmit={handleSubmit}>
			<Text>{selectedTask.task}</Text>
			<Select
				name={'hour'}
				value={selectedTask.hour}
				data={HOUR_NUMBERS}
				label={'시간'}
				onChange={handleChange}
			/>
			<Select
				name={'minute'}
				value={selectedTask.minute}
				data={MINUTE_NUMBERS}
				label={'분'}
				onChange={handleChange}
			/>
			<Button size="sm" rect style={{ height: '1.75rem' }}>
				Set
			</Button>
		</Form>
	)
}

export default TimeSelectForm
