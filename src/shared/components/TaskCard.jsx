import styled from 'styled-components'
import Avatar from './Avatar'
import { IoMdHeart } from 'react-icons/io'
import Text from './Text'
import { themeColors } from 'shared/constants/colors'

const CardContainer = styled.div`
	display: flex;
	width: ${({ width }) => `${width}rem`};
	height: ${({ height }) => `${height}rem`};
	background-color: ${themeColors.labelBackground};
	box-shadow: 0 0.25rem 0.75rem rgba(55, 31, 31, 0.2);
	border-radius: 1rem;
	box-sizing: border-box;
	margin-top: 2rem;
`

const CardHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 6rem;
	padding: 2rem;
	box-sizing: border-box;
`

const TaskCard = ({ width = 33, height = 22.5, ...props }) => {
	return (
		<CardContainer width={width} height={height} {...props}>
			<CardHeader>
				<Avatar src="https://picsum.photos/200" alt="avatar" size={4.5} />
				<Text size={1.4}>김경현님의 할일</Text>
				<IoMdHeart fontSize={'3rem'} />
			</CardHeader>
		</CardContainer>
	)
}

export default TaskCard
