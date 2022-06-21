import styled from 'styled-components'
import Avatar from './Avatar'
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from 'react-icons/io'
import Text from './Text'
import { colors, themeColors } from 'shared/constants/colors'
import useToggle from 'shared/hooks/useToggle'
import Badge from './Badge'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import apis from 'shared/api'
import Comment from './Comment'
import { getSessionStorageUserInfo } from 'shared/utils/storage'

const TaskCard = ({
	width = 33,
	height = 22.5,
	id,
	likeId,
	author,
	like,
	comments,
	timers = [],
	onLikeClick,
	...props
}) => {
	const [likeState, toggleLikeState] = useToggle(like)
	const [loadMore, toggleLoadMore] = useToggle()
	const [commentList, setCommentList] = useState([])
	const wrapper = useRef(null)

	useEffect(() => {
		setCommentList(
			comments.map(comment => {
				return {
					author: comment.author.fullName,
					comment: comment.comment,
				}
			}),
		)
	}, [])

	useEffect(() => {
		wrapper.current.style.height = loadMore ? 'auto' : '10.5rem'
	}, [loadMore])

	const handleLikeClick = async () => {
		toggleLikeState()
		if (likeState) {
			await apis.cancelPostLike(likeId)
		} else {
			await apis.addPostLike(id)
		}
	}

	const handleLoadMoreClick = () => {
		toggleLoadMore(!loadMore)
		wrapper.current.style.height = 'auto'
	}

	const handleCommentSubmit = async comment => {
		setCommentList([...commentList, { author: getSessionStorageUserInfo().fullName, comment }])
		await apis.createComment(comment, id)
	}

	return (
		<CardContainer width={width} height={height} {...props}>
			<CardHeader>
				<Avatar isLoading={false} src="https://picsum.photos/200" alt="avatar" size={4.5} />
				<Text size={1.4}>{author}님의 할일</Text>
				<IoMdHeart
					onClick={handleLikeClick}
					color={likeState ? '#E95721' : 'gray'}
					fontSize={'3rem'}
				/>
			</CardHeader>
			<ContentWrapper ref={wrapper}>
				{timers.map(task => (
					<Badge key={task.id} fontSize={1.6}>
						{task.name}
					</Badge>
				))}
				{loadMore && (
					<CommentContainer>
						<CommentLabel>Comments</CommentLabel>
						<CommentsList>
							{commentList.map((comment, idx) => (
								<CommentItem key={idx}>
									<CommentAuthor>{comment.author}</CommentAuthor>
									<Text block size={2}>
										{comment.comment}
									</Text>
								</CommentItem>
							))}
						</CommentsList>
					</CommentContainer>
				)}

				{loadMore && <Comment onSubmit={handleCommentSubmit} />}
			</ContentWrapper>
			<LoadMore onClick={handleLoadMoreClick}>
				{loadMore ? <IoIosArrowUp fontSize={'4rem'} /> : <IoIosArrowDown fontSize={'4rem'} />}
			</LoadMore>
		</CardContainer>
	)
}

export default TaskCard

const CommentContainer = styled.div`
	width: 100%;
`

const CommentLabel = styled.div`
	font-size: 2rem;
	color: ${colors.lightGray};
	padding: 1rem;
	box-sizing: border-box;
`

const CommentsList = styled.ul`
	text-decoration: none;
	width: 100%;
`

const CommentItem = styled.li`
	border-top: 1px solid lightgray;
	width: 100%;
	height: 6rem;
	padding: 1rem;
	box-sizing: border-box;
`

const CommentAuthor = styled.div`
	margin-bottom: 1rem;
	font-size: 1.5rem;
`

const LoadMore = styled.div`
	width: 100%;
	height: 4rem;
	text-align: center;
	cursor: pointer;
`

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
	overflow: hidden;
	height: 10.5rem;
	padding: 1rem;
	gap: 1.5rem;
	margin-top: 2rem;
	box-sizing: border-box;
`
