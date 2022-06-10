import styled from 'styled-components'
import { convertToHourMinute } from '../pages/createTimeDivider'
import Text from './Text'

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

const TaskBox = ({ task, ...props }) => {
	const { hour, minute } = convertToHourMinute(task.time)
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
