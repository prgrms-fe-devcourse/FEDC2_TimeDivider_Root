import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import apis from 'shared/api'
import CommentForm from 'shared/components/CommentForm'
import CommentList from 'shared/components/CommentList'
import NavBar from 'shared/components/NavBar'
import PostCard from 'shared/components/PostCard'
import useDetailPost from 'shared/hooks/useDetailPost'
import { useUser } from 'shared/hooks/useUser'
import { parsePostData } from 'shared/utils/postData'
import { CommentArea, Footer } from './style'

const DetailPost = () => {
	const { postId } = useParams()
	// const [isLoading, setIsLoading] = useState(true)
	// const [post, setPost] = useState({})
	// const [commentList, setCommentList] = useState([])
	const { user } = useUser()
	const { post, commentList, isLoading, getDetailPost, createComment } = useDetailPost(user, postId)

	useEffect(() => {
		getDetailPost()
	}, [])

	const handleCommentSubmit = async comment => {
		createComment(comment)
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
			<CommentArea>
				<CommentList comments={commentList} />
			</CommentArea>

			<Footer>
				<CommentForm onSubmit={handleCommentSubmit} />
			</Footer>
		</>
	)
}

export default DetailPost
