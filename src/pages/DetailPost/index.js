import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import apis from 'shared/api'
import CommentForm from 'shared/components/CommentForm'
import CommentList from 'shared/components/CommentList'
import NavBar from 'shared/components/NavBar'
import PostCard from 'shared/components/PostCard'
import { useUser } from 'shared/hooks/useUser'
import { getSessionStorageUserInfo } from 'shared/utils/storage'
import { Footer } from './style'

const DetailPost = () => {
	const { postId } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [post, setPost] = useState({})
	const [commentList, setCommentList] = useState([])
	const { user } = useUser()
	const fetchData = async () => {
		setIsLoading(true)
		const data = await apis.getPostDetail(postId)

		const { timers } = JSON.parse(data.title)
		const author = data.author
		const imageSrc = author.image
		const like = data.likes.find(like => like.user === user._id)
		const likeId = like ? like._id : null
		setPost({ ...data, timers, like, likeId, imageSrc })
		setCommentList(
			data.comments.map(comment => {
				return {
					author: comment.author.fullName,
					comment: comment.comment,
				}
			}),
		)
		setIsLoading(false)
	}
	useEffect(() => {
		fetchData()
	}, [])
	const handleCommentSubmit = async comment => {
		setCommentList([...commentList, { author: getSessionStorageUserInfo().fullName, comment }])
		await apis.createComment(comment)
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
			<CommentList comments={commentList} />
			<Footer>
				<CommentForm onSubmit={handleCommentSubmit} />
			</Footer>
		</>
	)
}

export default DetailPost
