import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import apis from 'shared/api'
import { BottomBar } from 'shared/components/BottomBar'
import NavBar from 'shared/components/NavBar'
import TaskCard from 'shared/components/TaskCard'
import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import { getSessionStorageUserInfo } from 'shared/utils/storage'
import styled from 'styled-components'

const ShareTask = () => {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true)
			const data = await apis.getPosts(TEST_CHANNEL_ID)
			console.log(data)
			const fetchData = data.map(post => {
				const { title, tasks } = JSON.parse(post.title)
				const user = getSessionStorageUserInfo()
				const userId = user._id
				const like = post.likes.find(like => like.user === userId)

				const likeId = like ? like._id : null
				return { ...post, title, tasks, like, likeId }
			})
			setPosts(fetchData)
			setIsLoading(false)
		}

		fetchPosts()
	}, [])

	return (
		<div>
			<NavBar>할 일 공유</NavBar>
			<CardArea>
				{isLoading ? (
					<div>로딩중</div>
				) : (
					posts.map(post => (
						<TaskCard
							key={post._id}
							id={post._id}
							author={post.author.fullName}
							tasks={post.tasks || []}
							like={post.like}
							likeId={post.likeId}
							comments={post.comments}
						/>
					))
				)}
			</CardArea>
			<ButtonArea>
				<BottomBar />
			</ButtonArea>
		</div>
	)
}

export default ShareTask

const CardArea = styled.div`
	position: relative;
	width: 100%;
	height: 66.5rem;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 1rem;
	box-sizing: border-box;

	::-webkit-scrollbar {
		display: none;
	}
`

const ButtonArea = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
`
