import styled from 'styled-components'
import Avatar from './Avatar'
import { IoMdHeart } from 'react-icons/io'
import Text from './Text'
import { themeColors } from 'shared/constants/colors'
import useToggle from 'shared/hooks/useToggle'
import Badge from './Badge'

const TaskCard = ({ width = 33, height = 22.5, author, tasks = [], ...props }) => {
	const [state, toggle] = useToggle()

	return (
		<CardContainer width={width} height={height} {...props}>
			<CardHeader>
				<Avatar isLoading={false} src="https://picsum.photos/200" alt="avatar" size={4.5} />
				<Text size={1.4}>{author}님의 할일</Text>
				<IoMdHeart onClick={toggle} color={state ? 'hotpink' : 'gray'} fontSize={'3rem'} />
			</CardHeader>
			<ContentWrapper>
				{tasks.map(task => (
					<Badge key={task.id}>{task.name}</Badge>
				))}
			</ContentWrapper>
		</CardContainer>
	)
}

export default TaskCard

const CardContainer = styled.div`
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

const ContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 1rem;
	gap: 3rem 3rem;
	margin-top: 1rem;
`
