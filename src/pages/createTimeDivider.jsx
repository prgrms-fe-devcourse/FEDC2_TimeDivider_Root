import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import NavBar from '../components/NavBar'
import Input from '../components/Input'
import Text from '../components/Text'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const ButtonArea = styled.div`
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

const BoxContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
`

const BoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: 1px solid;
	overflow: hidden;
	width: 8.6rem;
`

const Form = styled.form`
	display: flex;
	align-items: center;
	gap: 1rem;
`

const TaskInputBox = ({ task, ...props }) => {
	return (
		<BoxWrapper {...props}>
			<div>{task.task}</div>
			<Text>
				{task.hour} : {task.minute}
			</Text>
		</BoxWrapper>
	)
}

export const CreateTimeDivider = () => {
	const location = useLocation()

	const [tasks, setTasks] = useState(
		location.state.tasks.map(task => {
			return { ...task, hour: '00', minute: '00' }
		}),
	)

	const [selectedTask, setSelectedTask] = useState('')

	return (
		<>
			<NavBar backIcon>시간을 분배해요</NavBar>

			<BoxContainer>
				{tasks.map(task => (
					<TaskInputBox
						key={task.id}
						task={task}
						onClick={() => {
							setSelectedTask(task)
						}}
					/>
				))}
			</BoxContainer>
			{selectedTask && (
				<Form
					id={selectedTask.id}
					onSubmit={e => {
						e.preventDefault()
						setTasks(
							tasks.map(task => {
								if (task.id === selectedTask.id) {
									task.hour = selectedTask.hour
									task.minute = selectedTask.minute
								}
								return task
							}),
						)
						setSelectedTask('')
					}}
				>
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
			)}
			<ButtonArea>
				<Link to="/updateDivider">
					<Button>{BUTTON_TEXT.VALID}</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default CreateTimeDivider
