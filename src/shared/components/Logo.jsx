import styled from 'styled-components'
import logo from 'shared/images/logoTimeDivider.png'

const Logo = ({ size }) => {
	return <StyledLogo size={size} src={logo} />
}

export default Logo

const SIZE_TYPE = Object.freeze({
	LARGE: '30rem',
	MEDIUM: '20rem',
	SAMLL: '10rem',
	LOGIN: '12.6rem',
	NAVBAR: '6rem',
})

export const StyledLogo = styled.img`
	height: ${props => SIZE_TYPE[props.size] || SIZE_TYPE['small']};
	width: ${props => SIZE_TYPE[props.size] || SIZE_TYPE['small']};
	margin-bottom: ${props => props.size === 'LOGIN' && 3}rem;
`
