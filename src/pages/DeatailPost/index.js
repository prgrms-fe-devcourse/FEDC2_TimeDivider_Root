import { useEffect } from 'react'
import { useState } from 'react'
import apis from 'shared/api'
import CommentForm from 'shared/components/CommentForm'
import CommentList from 'shared/components/CommentList'
import NavBar from 'shared/components/NavBar'
import PostCard from 'shared/components/PostCard'
import { getSessionStorageUserInfo } from 'shared/utils/storage'
import { Footer } from './style'

const DeatailPost = () => {
	const [commentList, setCommentList] = useState([])

	useEffect(() => {
		setCommentList()
		// comments.map(comment => {
		// 	return {
		// 		author: comment.author.fullName,
		// 		comment: comment.comment,
		// 	}
		// }),
	}, [])
	const handleCommentSubmit = async comment => {
		setCommentList([...commentList, { author: getSessionStorageUserInfo().fullName, comment }])
		//await apis.createComment(comment)
	}
	return (
		<>
			<NavBar backIcon />
			<PostCard isLargeCard />
			{/* <CommentList comments={commentList} /> */}
			<Footer>
				<CommentForm onSubmit={handleCommentSubmit} />
			</Footer>
		</>
	)
}

export default DeatailPost
