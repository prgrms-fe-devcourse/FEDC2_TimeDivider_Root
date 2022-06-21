import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import apis from 'shared/api'
import { BottomBar } from 'shared/components/BottomBar'
import NavBar from 'shared/components/NavBar'
import TaskCard from 'shared/components/TaskCard'
import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import { getSessionStorageUserInfo } from 'shared/utils/storage'
import { timerState } from 'state/timer'
import styled from 'styled-components'

//공유 누르면 전역 상태에서 API
//취소 누르면? 내 게시물 이름을 바꿔서 보내
//

const ShareTask = () => {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [timers] = useRecoilState(timerState)

	const fetchPosts = async () => {
		setIsLoading(true)
		const data = await apis.getPosts(TEST_CHANNEL_ID)
		const filteredData = data.filter(post => {
			const { share } = JSON.parse(post.title)
			return share === 'PUBLIC'
		})
		const fetchData = filteredData.map(post => {
			const { timers } = JSON.parse(post.title)
			const user = getSessionStorageUserInfo()
			const userId = user._id
			const like = post.likes.find(like => like.user === userId)
			const likeId = like ? like._id : null
			return { ...post, timers, like, likeId }
		})

		setPosts(fetchData)
		setIsLoading(false)
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	const handleUpdateButtonClick = async () => {
		const timersData = Object.keys(timers).map((key, idx) => {
			return {
				id: idx,
				name: timers[key].name,
			}
		})
		const data = JSON.stringify({
			share: 'PUBLIC',
			timers: timersData,
		})
		const postId = getSessionStorageUserInfo().posts[0]._id
		await apis.modifyPost({ postId, title: data, image: null, channelId: TEST_CHANNEL_ID })
		await fetchPosts()
	}

	const handleNotShareButtonClick = async () => {
		const postId = getSessionStorageUserInfo().posts[0]._id
		await apis.disablePost(postId, TEST_CHANNEL_ID)
		await fetchPosts()
	}

	const handleAddButtonClick = async () => {
		const timersData = Object.keys(timers).map((key, idx) => {
			return {
				id: idx,
				name: timers[key].name,
			}
		})
		const data = JSON.stringify({
			share: 'PUBLIC',
			timers: timersData,
		})
		await apis.createPost({ title: data, image: null, channelId: TEST_CHANNEL_ID })
	}

	return (
		<div>
			<NavBar>할 일 공유</NavBar>
			<button onClick={handleAddButtonClick}>게시물 추가</button>
			<button onClick={handleNotShareButtonClick}>공유 안해</button>
			<button onClick={handleUpdateButtonClick}>포스트 업데이트</button>
			<CardArea>
				{isLoading ? (
					<div>로딩중</div>
				) : (
					posts.map(post => (
						<TaskCard
							key={post._id}
							id={post._id}
							author={post.author.fullName}
							timers={post.timers || []}
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
