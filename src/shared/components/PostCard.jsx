import styled from 'styled-components'
import Avatar from './Avatar'
import { IoIosArrowForward, IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { IoChatbubbleOutline } from 'react-icons/io5'
import Text from './Text'
import { themeColors } from 'shared/constants/colors'
import useToggle from 'shared/hooks/useToggle'
import Badge from './Badge'
import apis from 'shared/api'
import React from 'react'

const PostCard = ({
	width = 37.5,
	height = 29,
	id,
	likeId,
	author,
	like,
	comments,
	timers = [],
	onLikeClick,
	onComentClick,
	imageSrc,
	isLargeCard = false,
	...props
}) => {
	const [likeState, toggleLikeState] = useToggle(like)
	const handleLikeClick = async () => {
		toggleLikeState()
		if (likeState) {
			await apis.cancelPostLike(likeId)
		} else {
			await apis.addPostLike(id)
		}
	}
	const handleCommentClick = () => {
		onComentClick(id)
	}

	return (
		<CardContainer width={width} isLargeCard={isLargeCard} {...props}>
			<CardHeader onClick={!isLargeCard && handleCommentClick}>
				<Avatar isLoading={false} src={imageSrc} alt="avatar" size={3.5} />
				<Text size={1.3} strong>
					{author}
				</Text>
			</CardHeader>
			<ContentWrapper isLargeCard={isLargeCard} onClick={!isLargeCard && handleCommentClick}>
				<InnerWrapper>
					{timers.map(task => (
						<CardTag key={task.id} fontSize={1.6}>
							{task.name}
						</CardTag>
					))}
				</InnerWrapper>
			</ContentWrapper>
			<CardFooter>
				{likeState ? (
					<IoMdHeart
						cursor={'pointer'}
						onClick={handleLikeClick}
						color={'#E95721'}
						fontSize={'3rem'}
					/>
				) : (
					<IoMdHeartEmpty onClick={handleLikeClick} fontSize={'3rem'} />
				)}
				<IoChatbubbleOutline onClick={handleCommentClick} cursor={'pointer'} fontSize={'2.7rem'} />
				{!isLargeCard && (
					<More onClick={handleCommentClick}>
						<IoIosArrowForward size={'2.3rem'} />
					</More>
				)}
			</CardFooter>
		</CardContainer>
	)
}

export default PostCard

const CardFooter = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem;
	gap: 1.2rem;
	height: 6rem;
	box-sizing: border-box;
`

const CardTag = styled(Badge)`
	background-color: white;
	color: ${themeColors.primary};
	font-size: 1.6rem;
	padding: 2rem;
`

const CardContainer = styled.div`
	width: 100%;
	height: ${({ isLargeCard }) => (isLargeCard ? '40rem' : '29rem')};
	background-color: white;
	// box-shadow: ${props => !props.isLargeCard && '0 0.25rem 0.75rem rgba(55, 31, 31, 0.2);'}
	box-sizing: border-box;
	//margin-top: 2rem;
`

const CardHeader = styled.div`
	display: flex;
	align-items: center;
	height: 8rem;
	gap: 1rem;
	width: 100%;
	padding: 1rem;
	box-sizing: border-box;
	cursor: pointer;
`

const ContentWrapper = styled.div`
	overflow-y: scroll;
	height: ${({ isLargeCard }) => (isLargeCard ? '26rem' : '15rem')};
	background-color: ${themeColors.labelBackground};
	padding: 1rem;
	gap: 1.5rem;
	box-sizing: border-box;
`
const InnerWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const More = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	padding-right: 1rem;
	flex: 1;
`
