import styled from 'styled-components'
import Avatar from './Avatar'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { IoChatbubbleOutline } from 'react-icons/io5'
import Text from './Text'
import { themeColors } from 'shared/constants/colors'
import useToggle from 'shared/hooks/useToggle'
import Badge from './Badge'
import apis from 'shared/api'

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

	return (
		<CardContainer width={width} height={height} {...props}>
			<CardHeader>
				<Avatar isLoading={false} src="https://picsum.photos/200" alt="avatar" size={4.5} />
				<Text size={1.6} strong>
					{author}
				</Text>
			</CardHeader>
			<ContentWrapper isLargeCard={isLargeCard}>
				{timers.map(task => (
					<CardTag key={task.id} fontSize={1.6}>
						{task.name}
					</CardTag>
				))}
			</ContentWrapper>
			<CardFooter>
				{likeState ? (
					<IoMdHeart
						cursor={'pointer'}
						onClick={handleLikeClick}
						color={'#E95721'}
						fontSize={'4rem'}
					/>
				) : (
					<IoMdHeartEmpty onClick={handleLikeClick} fontSize={'4rem'} />
				)}
				<IoChatbubbleOutline cursor={'pointer'} fontSize={'3.5rem'} />
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
	height: ${({ height }) => `${height}rem`};
	background-color: white;
	box-shadow: 0 0.25rem 0.75rem rgba(55, 31, 31, 0.2);
	box-sizing: border-box;
	margin-top: 2rem;
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
	display: flex;
	flex-wrap: wrap;
	height: ${({ isLargeCard }) => (isLargeCard ? '26rem' : '15rem')};
	background-color: ${themeColors.labelBackground};
	padding: 1rem;
	gap: 1.5rem;
	box-sizing: border-box;
`
