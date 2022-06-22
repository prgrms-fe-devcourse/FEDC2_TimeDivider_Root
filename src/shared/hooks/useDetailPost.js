import { useState } from 'react'
import apis from 'shared/api'
import { parsePostData } from 'shared/utils/postData'

const useDetailPost = (user, postId) => {
	const [post, setPost] = useState({})
	const [commentList, setCommentList] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const getDetailPost = async () => {
		setIsLoading(true)

		const data = await apis.getPostDetail(postId)
		const { timers } = parsePostData(data.title)
		const like = data.likes.find(like => like.user === user._id)
		const likeId = like ? like._id : null

		setPost({ ...data, timers, like, likeId, imageSrc: data.author.image })
		setCommentList(
			data.comments.map(commentData => {
				const { fullName, image } = commentData.author

				return {
					author: fullName,
					imageSrc: image,
					comment: commentData.comment,
				}
			}),
		)

		setIsLoading(false)
	}

	const createComment = async comment => {
		setCommentList([...commentList, { author: user.fullName, comment, imageSrc: user.image }])
		await apis.createComment(comment, postId)
	}

	return { post, commentList, isLoading, getDetailPost, createComment }
}

export default useDetailPost
