import styled from 'styled-components'
import { Avatar } from 'shared/components'

const AvatarItem = ({ username, imageSrc, size = 5, ...props }) => {
	return (
		<Wrapper {...props}>
			<Avatar isLoading={false} src={imageSrc} alt="avatar" size={size} />
			<NameWrapper>
				<AvatarName>{username}</AvatarName>
			</NameWrapper>
		</Wrapper>
	)
}

export default AvatarItem

const Wrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	width: 7rem;
	height: 10rem;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	row-gap: 1rem;
	padding: 1rem;
	cursor: pointer;
`
const NameWrapper = styled.div`
	width: 100%;
`
const AvatarName = styled.p`
	font-size: 1.2rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
`
