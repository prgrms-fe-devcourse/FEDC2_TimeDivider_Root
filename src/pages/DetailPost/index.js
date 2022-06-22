import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import CommentForm from 'shared/components/CommentForm'
import CommentList from 'shared/components/CommentList'
import NavBar from 'shared/components/NavBar'
import PostCard from 'shared/components/PostCard'
import useDetailPost from 'shared/hooks/useDetailPost'
import { CommentArea, Footer } from './style'

const DetailPost = () => {
	const { postId } = useParams()
	const { post, commentList, isLoading, createComment } = useDetailPost(postId)
	const ref = useRef(null)

	const handleCommentSubmit = async comment => {
		await createComment(comment)
		console.log(ref.current)
	}

	return (
		<>
			<NavBar backIcon />
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

export default DetailPost
