import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import apis from 'shared/api'
import CommentForm from 'shared/components/CommentForm'
import CommentList from 'shared/components/CommentList'
import NavBar from 'shared/components/NavBar'
import PostCard from 'shared/components/PostCard'
import { useUser } from 'shared/hooks/useUser'
import { parsePostData } from 'shared/utils/postData'
import { CommentArea, Footer } from './style'

const DetailPost = () => {
	const { postId } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [post, setPost] = useState({})
	const [commentList, setCommentList] = useState([])
	const { user } = useUser()

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		setIsLoading(true)
		const data = await apis.getPostDetail(postId)
		const { timers } = parsePostData(data.title)
		const like = data.likes.find(like => like.user === user._id)
		const likeId = like ? like._id : null
		setPost({ ...data, timers, like, likeId, imageSrc: post.author.image })
		setCommentList(
			data.comments.map(commentData => {
				const { fullName, image } = commentData.auhtor

				return {
					author: fullName,
					imageSrc: image,
					comment: commentData.comment,
				}
			}),
		)

		setIsLoading(false)
	}

	const handleCommentSubmit = async comment => {
		setCommentList([...commentList, { author: user.fullName, comment, imageSrc: user.image }])
		await apis.createComment(comment, postId)
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
