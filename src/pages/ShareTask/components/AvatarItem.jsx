import styled from 'styled-components'
import Avatar from 'shared/components/Avatar'
import Text from 'shared/components/Text'

const AvatarItem = ({ username, imageSrc, size = 5, ...props }) => {
	return (
		<Wrapper {...props}>
			<Avatar isLoading={false} src={imageSrc} alt="avatar" size={size} />
			<AvatarName size={1.4}>{username}</AvatarName>
		</Wrapper>
	)
}

export default AvatarItem

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	box-sizing: border-box;
	cursor: pointer;
`

export const AvatarName = styled(Text)`
	width: 6rem;
	overflow: hidden;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
`
