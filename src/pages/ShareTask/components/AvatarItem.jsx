import styled from 'styled-components'
import Avatar from 'shared/components/Avatar'
import Text from 'shared/components/Text'

const AvatarItem = ({ username, ...props }) => {
	return (
		<Wrapper {...props}>
			<Avatar isLoading={false} src="https://picsum.photos/200" alt="avatar" size={5} />
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
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
`
