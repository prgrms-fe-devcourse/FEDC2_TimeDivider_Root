import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Input from '../components/Input'
import Text from './Text'

const Form = styled.form`
	display: flex;
	align-items: center;
	gap: 1rem;
`

const TaskTimeForm = ({ targetTask, onSubmit, ...props }) => {
	const [time, setTime] = useState({ hour: '0', minute: '0' })

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(time)
		setTime({ hour: '0', minute: '0' })
	}

	useEffect(() => {
		const { hour, minute } = targetTask
		setTime({ ...time, hour, minute })
	}, [time, targetTask])

	return (
		<Form {...props} onSubmit={handleSubmit}>
			<Text>{targetTask.task}</Text>
			<Input
				style={{ width: '4rem' }}
				type="text"
				name="hour"
				value={`${time.hour}`}
				onChange={e => {
					setTime({ ...time, [e.target.name]: e.target.value })
				}}
				autoFocus={true}
				required
			/>
			<Input
				type="text"
				name="minute"
				style={{ width: '4rem' }}
				value={`${time.minute}`}
				onChange={e => {
					setTime({ ...time, [e.target.name]: e.target.value })
				}}
				required
			/>

			<Button size="sm" rect>
				설정
			</Button>
		</Form>
	)
}

export default TaskTimeForm
