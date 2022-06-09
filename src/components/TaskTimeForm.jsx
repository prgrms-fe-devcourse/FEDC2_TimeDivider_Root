import { useState } from 'react'
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
	const [selectedTask, setSelectedTask] = useState(targetTask)

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(selectedTask)
		setSelectedTask('')
	}

	return (
		<Form {...props} id={selectedTask.id} onSubmit={handleSubmit}>
			<Text>{selectedTask.task}</Text>
			<Input
				style={{ width: '4rem' }}
				type="text"
				value={`${selectedTask.hour}`}
				onChange={e => {
					setSelectedTask({ ...selectedTask, hour: e.target.value })
				}}
				autoFocus={true}
				required
			/>
			<Input
				type="text"
				style={{ width: '4rem' }}
				value={`${selectedTask.minute}`}
				onChange={e => {
					setSelectedTask({ ...selectedTask, minute: e.target.value })
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
