import { colors } from 'shared/constants/colors'
import styled from 'styled-components'
import Text from './Text'

const CommentList = ({ comments, ...props }) => {
	return (
		<CommentContainer>
			<CommentLabel>Comments</CommentLabel>
			<CommentsList {...props}>
				{comments.map((comment, idx) => (
					<CommentItem key={idx}>
						<CommentAuthor>{comment.author}</CommentAuthor>
						<Text block size={2}>
							{comment.comment}
						</Text>
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
