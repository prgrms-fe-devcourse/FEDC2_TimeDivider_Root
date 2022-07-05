import React, { useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { CommentForm, CommentList, NavBar, PostCard, Avatar } from 'shared/components'
import { useDetailPost } from 'shared/hooks'
import loadingImage from 'shared/images/loading.gif'

const DetailPost = () => {
	const { postId } = useParams()
	const { post, commentList, isLoading, createComment } = useDetailPost(postId)
	const ref = useRef(null)

	const handleCommentSubmit = async comment => {
		await createComment(comment)
	}

	return (
		<>
			<TopBar>
				<NavBar backIcon />
				{isLoading && (
					<Loading>
						<Avatar src={loadingImage} size={3} />
					</Loading>
				)}
			</TopBar>
			{isLoading || (
				<PostCard
					key={post._id}
					id={post._id}
					author={post.author.fullName}
					timers={post.timers || []}
					like={post.like}
					likeId={post.likeId}
					size={'md'}
					imageSrc={post.imageSrc}
					comments={post.comments}
					isLargeCard
				/>
			)}
			<CommentArea ref={ref}>
				<CommentList comments={commentList} />
			</CommentArea>

			<Footer>
				<CommentForm onSubmit={handleCommentSubmit} />
			</Footer>
		</>
	)
}

export const Footer = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
`

export const CommentArea = styled.div`
	width: 100%;
	overflow: scroll;
	height: 25.2rem;
	::-webkit-scrollbar {
		display: none;
	}
`
export const TopBar = styled.div`
	position: relative;
	width: 100%;
`
export const Loading = styled.div`
	position: absolute;
	top: 3rem;
	right: 3rem;
`

export default DetailPost
