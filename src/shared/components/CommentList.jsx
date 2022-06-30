import styled from 'styled-components'
import Avatar from './Avatar'

const CommentList = ({ comments, ...props }) => {
	return (
		<CommentContainer>
			<CommentsList {...props}>
				{comments.map((comment, idx) => (
					<CommentItem key={idx}>
						<Avatar src={comment.imageSrc} size={3} />
						<CommentAuthor>
							<Name>{comment.author}</Name>
						</CommentAuthor>
						<Comment block size={2}>
							{comment.comment}
						</Comment>
					</CommentItem>
				))}
			</CommentsList>
		</CommentContainer>
	)
}

const CommentContainer = styled.div`
	width: 100%;
`

const CommentsList = styled.div`
	text-decoration: none;
	width: 100%;
`

const CommentItem = styled.div`
	display: flex;
	width: 100%;
	padding: 1rem;
	align-items: start;
	gap: 1rem;
	box-sizing: border-box;
`

const CommentAuthor = styled.div`
	width: 5rem;
	line-height: 1.5;
	font-weight: 500;
`

const Comment = styled.div`
	font-size: 1.3rem;
	line-height: 1.5;
	font-weight: 300;
	flex: 1;
	display: flex;
	align-items: center;
`
const Name = styled.p`
	padding: 0;
	font-size: 1.3rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
`

export default CommentList
