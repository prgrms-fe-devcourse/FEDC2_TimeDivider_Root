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
})

export const StyledLogo = styled.img`
	height: ${props => SIZE_TYPE[props.size] || SIZE_TYPE['small']};
	width: ${props => SIZE_TYPE[props.size] || SIZE_TYPE['small']};
	margin: 3rem;
`