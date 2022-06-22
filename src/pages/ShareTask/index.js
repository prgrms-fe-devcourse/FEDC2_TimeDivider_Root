import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomBar } from 'shared/components/BottomBar'
import Button from 'shared/components/Button'
import PostCard from 'shared/components/PostCard'
import usePosts from 'shared/hooks/usePosts'
import AvatarItem from './components/AvatarItem'
import { AvatarListArea, ButtonArea, CardArea, Footer, Loading, Wrapper } from './style'
import { colors } from '../../shared/constants/colors'
import { Description, NotLoggedInWrapper } from '../MyPage/style'
import Text from '../../shared/components/Text'
import { useUser } from '../../shared/hooks/useUser'
import loadingImage from 'shared/images/loading.gif'
import Avatar from '../../shared/components/Avatar'

const ShareTask = () => {
	const navigate = useNavigate()
	const { isLoggedIn } = useUser()
	const { posts, isLoading, updateMyPost, makePrivateMyPost } = usePosts()

	const handleLogin = () => {
		navigate('/')
	}

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
		<Wrapper>
			{!isLoggedIn && (
				<NotLoggedInWrapper>
					<Description>
						<Text style={{ wordBreak: 'keep-all', fontSize: '2.2rem', lineHeight: '1.5' }}>
							게시판을 이용하려면 로그인하여야합니다.
						</Text>
					</Description>
					<Button onClick={handleLogin}>로그인 페이지로 이동</Button>
				</NotLoggedInWrapper>
			)}
			{isLoggedIn && (
				<>
					<ButtonArea>
						<Loading>{isLoading && <Avatar src={loadingImage} size={3} />}</Loading>
						<Button
							width={8}
							height={3}
							fontSize={1.3}
							backgroundColor={colors.white}
							fontColor={colors.timeoutDarkGray}
							borderColor={colors.timeoutDarkGray}
							hoverColor={colors.red}
							style={{ boxShadow: 'none' }}
							onClick={handleNotShareButtonClick}
						>
							공유중지
						</Button>
						<Button
							width={8}
							height={3}
							fontSize={1.3}
							style={{ boxShadow: 'none' }}
							onClick={handleUpdateButtonClick}
						>
							업데이트
						</Button>
					</ButtonArea>
					<AvatarListArea>
						{posts.map(post => (
							<AvatarItem
								onClick={() => {
									handleNavigate(post._id)
								}}
								key={post._id}
								postId={post._id}
								imageSrc={post.imageSrc}
								username={post.author.fullName}
							/>
						))}
					</AvatarListArea>

					<CardArea>
						{posts.map(post => (
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
						))}
					</CardArea>
				</>
			)}
			<Footer>
				<BottomBar />
			</Footer>
		</Wrapper>
	)
}

export default ShareTask
