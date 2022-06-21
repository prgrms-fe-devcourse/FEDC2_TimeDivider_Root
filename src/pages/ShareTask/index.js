import React from 'react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import apis from 'shared/api'
import { BottomBar } from 'shared/components/BottomBar'
import Button from 'shared/components/Button'
import PostCard from 'shared/components/PostCard'
import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import { getSessionStorageUserInfo } from 'shared/utils/storage'
import { timerState } from 'state/timer'
import AvatarItem from './components/AvatarItem'
import { AvatarListArea, ButtonArea, CardArea, Footer, Header } from './style'

const ShareTask = () => {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [timers] = useRecoilState(timerState)
	const fetchPosts = async () => {
		setIsLoading(true)
		const data = await apis.getPosts(TEST_CHANNEL_ID)
		const filteredData = data.filter(post => {
			if (post.title === 'Test') return false
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

	return (
		<div>
			<Header>
				<ButtonArea>
					<Button
						width={8}
						height={3}
						fontSize={1.3}
						backgroundColor={'white'}
						fontColor={'black'}
						borderColor={'black'}
						onClick={handleNotShareButtonClick}
					>
						공유중지
					</Button>
					<Button width={8} height={3} fontSize={1.3} onClick={handleUpdateButtonClick}>
						업데이트
					</Button>
				</ButtonArea>
				<AvatarListArea>
					{posts.map(post => {
						return <AvatarItem key={post._id} username={post.author.fullName} />
					})}
				</AvatarListArea>
			</Header>

			<CardArea>
				{isLoading ? (
					<div>로딩중</div>
				) : (
					posts.map(post => (
						<PostCard
							key={post._id}
							id={post._id}
							author={post.author.fullName}
							timers={post.timers || []}
							like={post.like}
							likeId={post.likeId}
							size={'md'}
							comments={post.comments}
						/>
					))
				)}
			</CardArea>
			<Footer>
				<BottomBar />
			</Footer>
		</div>
	)
}

export default ShareTask
