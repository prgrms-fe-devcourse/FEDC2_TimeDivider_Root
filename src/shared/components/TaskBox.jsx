import { colors, themeColors } from 'shared/constants/colors'
import styled from 'styled-components'
import Text from './Text'

const TaskBox = ({ task, ...props }) => {
	const { hour, minute } = task
	return (
		<BoxContainer {...props}>
			<BoxWrapper>
				<Text size={1.3} color={themeColors.primary}>
					{task.task}
				</Text>
				<Text size={1.3}>
					{hour} : {minute}
				</Text>
			</BoxWrapper>
		</BoxContainer>
	)
}

export default TaskBox

const BoxContainer = styled.div`
	padding: 1.6rem 1.6rem;
	background-color: ${themeColors.labelBackground};
	cursor: pointer;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
	border-radius: 1rem;
	box-sizing: border-box;
`

const BoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
