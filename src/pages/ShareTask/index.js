import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomBar } from 'shared/components/BottomBar'
import Button from 'shared/components/Button'
import PostCard from 'shared/components/PostCard'
import usePosts from 'shared/hooks/usePosts'
import AvatarItem from './components/AvatarItem'
import { AvatarListArea, ButtonArea, CardArea, Footer, Header } from './style'

const ShareTask = () => {
	const navigate = useNavigate()

	const { posts, isLoading, updateMyPost, makePrivateMyPost } = usePosts()

	const handleUpdateButtonClick = async () => {
		updateMyPost()
	}

	const handleNotShareButtonClick = async () => {
		makePrivateMyPost()
	}

	const handleNavigate = postId => {
		navigate(`/detailPost/${postId}`)
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
						return (
							<AvatarItem
								onClick={() => {
									handleNavigate(post._id)
								}}
								key={post._id}
								postId={post._id}
								imageSrc={post.imageSrc}
								username={post.author.fullName}
							/>
						)
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
							onComentClick={handleNavigate}
							imageSrc={post.imageSrc}
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
