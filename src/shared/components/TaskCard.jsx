import styled from 'styled-components'
import Avatar from './Avatar'
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from 'react-icons/io'
import Text from './Text'
import { themeColors } from 'shared/constants/colors'
import useToggle from 'shared/hooks/useToggle'
import Badge from './Badge'
import { useRef } from 'react'
import { useEffect } from 'react'
import apis from 'shared/api'

const TaskCard = ({
	width = 33,
	height = 22.5,
	id,
	likeId,
	author,
	like,
	tasks = [],
	...props
}) => {
	const [state, toggle] = useToggle(like)
	const [loadMore, toggleLoadMore] = useToggle()
	const wrapper = useRef(null)
	const handleClick = async () => {
		toggle()
		if (state) {
			console.log(likeId)
			await apis.cancelPostLike(likeId)
		} else {
			await apis.addPostLike(id)
		}
	}

	useEffect(() => {
		wrapper.current.style.height = loadMore ? 'auto' : '10.5rem'
	}, [loadMore])

	return (
		<CardContainer width={width} height={height} {...props}>
			<CardHeader>
				<Avatar isLoading={false} src="https://picsum.photos/200" alt="avatar" size={4.5} />
				<Text size={1.4}>{author}님의 할일</Text>
				<IoMdHeart onClick={handleClick} color={state ? 'hotpink' : 'gray'} fontSize={'3rem'} />
			</CardHeader>
			<ContentWrapper ref={wrapper}>
				{tasks.map(task => (
					<Badge key={task.id} fontSize={1.6}>
						{task.name}
					</Badge>
				))}
			</ContentWrapper>
			<LoadMore
				onClick={() => {
					toggleLoadMore(!loadMore)
					wrapper.current.style.height = 'auto'
				}}
			>
				{loadMore ? <IoIosArrowUp fontSize={'4rem'} /> : <IoIosArrowDown fontSize={'4rem'} />}
			</LoadMore>
		</CardContainer>
	)
}

export default TaskCard

const LoadMore = styled.div`
	width: 100%;
	height: 4rem;
	text-align: center;
	cursor: pointer;
`

const CardContainer = styled.div`
	width: ${({ width }) => `${width}rem`};
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
	overflow: hidden;
	height: 10.5rem;
	padding: 1rem;
	gap: 1.5rem;
	margin-top: 2rem;
	box-sizing: border-box;
`
