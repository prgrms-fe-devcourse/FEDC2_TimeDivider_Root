import styled from 'styled-components'

const AvatarWrapper = styled.div`
	position: relative;
	overflow: hidden;
	border-radius: 50%;
	border: 1px solid #666;
`

const Image = styled.img`
	width: ${({ size }) => `${size}rem`};
	height: ${({ size }) => `${size}rem`};
`

const Avatar = ({ src, size = 2, alt, ...props }) => {
	return (
		<AvatarWrapper {...props}>
			<Image size={size} src={src} alt={alt} />
		</AvatarWrapper>
	)
}

export default Avatar
