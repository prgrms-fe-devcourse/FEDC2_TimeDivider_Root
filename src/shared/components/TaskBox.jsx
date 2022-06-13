import styled from 'styled-components'
import Text from './Text'

const TaskBox = ({ task, ...props }) => {
	const { hour, minute } = task
	return (
		<BoxWrapper {...props}>
			<div>{task.task}</div>
			<Text>
				{hour} : {minute}
			</Text>
		</BoxWrapper>
	)
}

export default TaskBox

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
