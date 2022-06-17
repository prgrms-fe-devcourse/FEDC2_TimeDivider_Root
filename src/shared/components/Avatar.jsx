import styled from 'styled-components'
import PropTypes from 'prop-types'

const Avatar = styled.div`
	width: ${props => props.size}rem;
	height: ${props => props.size}rem;
	background: ${({ isLoading, src }) => (isLoading ? `gray` : `no-repeat top center url(${src})`)};
	background-size: cover;
	border-radius: 50%;
`

Avatar.propTypes = {
	size: PropTypes.number,
	isLoading: PropTypes.bool,
	src: PropTypes.string,
}

export default Avatar
