import { themeColors } from 'shared/constants/colors'
import styled from 'styled-components'
import Text from './Text'

const TaskBox = ({ task, ...props }) => {
	const { hour, minute } = task

	return (
		<BoxContainer {...props}>
			<BoxWrapper>
				<Text size={1.4} color={themeColors.primary}>
					{task.name}
				</Text>
				<Text style={{ marginTop: '0.8rem', fontSize: '1.4rem' }}>
					{hour.length === 1 ? `0${hour}` : hour} : {minute === '0' ? '00' : minute}
				</Text>
			</BoxWrapper>
		</BoxContainer>
	)
}

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

export default TaskBox
