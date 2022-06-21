import AvatarItem from 'pages/ShareTask/components/AvatarItem'
import styled from 'styled-components'
import Avatar from './Avatar'
import Text from './Text'

const CommentList = ({ comments, ...props }) => {
	return (
		<CommentContainer>
			<CommentsList {...props}>
				{comments.map((comment, idx) => (
					<CommentItem key={idx}>
						<AvatarItem imageSrc={comment.imageSrc} username={comment.author} size={5} />
						{/* <CommentAuthor>{comment.author}</CommentAuthor> */}
						<Comment block size={2}>
							{comment.comment}
						</Comment>
					</CommentItem>
				))}
			</CommentsList>
		</CommentContainer>
	)
}

export default CommentList

const CommentContainer = styled.div`
	width: 100%;
`

const CommentsList = styled.ul`
	text-decoration: none;
	width: 100%;
`

const CommentItem = styled.li`
	display: flex;
	width: 100%;
	border-top: 1px solid lightgray;
	padding: 1rem;
	gap: 1rem;
	box-sizing: border-box;
`

const CommentAuthor = styled.div`
	margin-bottom: 1rem;
	font-size: 1.5rem;
`

const Comment = styled.div`
	font-size: 1.6rem;
	width: 100%;
	display: flex;
	align-items: center;
`
