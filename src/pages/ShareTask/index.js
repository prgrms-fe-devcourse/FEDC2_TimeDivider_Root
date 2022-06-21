import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import apis from 'shared/api'
import Avatar from 'shared/components/Avatar'
import { BottomBar } from 'shared/components/BottomBar'
import Button from 'shared/components/Button'
import NavBar from 'shared/components/NavBar'
import PostCard from 'shared/components/PostCard'
import Text from 'shared/components/Text'
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
					<AvatarItem>
						<Avatar isLoading={false} src="https://picsum.photos/200" alt="avatar" size={4.5} />
						<Text size={1.4}>이지원</Text>
					</AvatarItem>
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

const Header = styled.div`
	width: 37rem;
	height: 18rem;
`
const AvatarItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	box-sizing: border-box;
`
const AvatarListArea = styled.div`
	display: flex;
	width: 100%;
	overflow-x: scroll;
	height: 10rem;

	::-webkit-scrollbar {
		display: none;
	}
`
const ButtonArea = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 2rem;
	gap: 1rem;
	box-sizing: border-box;
`

const CardArea = styled.div`
	position: relative;
	width: 100%;
	height: 55rem;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	::-webkit-scrollbar {
		display: none;
	}
`

const Footer = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
`
