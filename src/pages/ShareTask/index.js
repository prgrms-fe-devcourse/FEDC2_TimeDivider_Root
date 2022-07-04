import React from 'react'
import styled from 'styled-components'
import { colors, themeColors } from 'shared/constants/colors'
import { useNavigate } from 'react-router-dom'
import { usePosts, useUser } from 'shared/hooks'
import { Avatar, Button, BottomBar, Text, PostCard } from 'shared/components'
import AvatarItem from './components/AvatarItem'
import { Description, NotLoggedInWrapper } from '../MyPage'
import loadingImage from 'shared/images/loading.gif'

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

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: ${themeColors.labelBackground};
`

export const Header = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 18rem;
`

export const AvatarName = styled(Text)`
	width: 6rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
`

export const AvatarListArea = styled.div`
	background-color: ${themeColors.background};
	box-sizing: border-box;
	display: flex;
	width: 100%;
	column-gap: 2rem;
	padding-left: 2rem;
	overflow-x: scroll;
	height: 11rem;

	&:hover::-webkit-scrollbar {
		height: 0.7rem;
	}

	&:hover::-webkit-scrollbar-track {
		background-color: white;
	}

	&:hover::-webkit-scrollbar-thumb {
		border-radius: 1.6rem;
		background-color: lightgray;
	}
`

export const ButtonArea = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	justify-content: flex-end;
	padding: 2rem;
	gap: 1rem;
	background-color: ${themeColors.background};
`

export const CardArea = styled.div`
	position: relative;
	width: 100%;
	flex: 1;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	row-gap: 2rem;
	::-webkit-scrollbar {
		display: none;
	}
`

export const Footer = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
`

export const Loading = styled.div`
	flex: 1;
`

export const Description = styled.div`
	width: 24.2rem;
	height: 9rem;
	text-align: center;
	margin-top: 15.6rem;
	margin-bottom: 13.6rem;
`
export const NotLoggedInWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
`

export default ShareTask
