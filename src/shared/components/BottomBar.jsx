import styled from 'styled-components'
import { colors, themeColors } from '../constants/colors'
import boardImg from 'shared/images/board.png'
import clockImg from 'shared/images/clock.png'
import profileImg from 'shared/images/profile.png'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export const BottomBar = ({ ...props }) => {
	const location = useLocation()
	const { user } = useUser()
	return (
		<Wrapper>
			<NavItems>
				<NavItem currentpath={location.pathname} as={Link} src={boardImg} to={'/shareTask'} />
				<NavItem
					currentpath={location.pathname}
					as={Link}
					src={clockImg}
					to={'/updateTimeDivider'}
				/>
				<NavItem currentpath={location.pathname} as={Link} src={profileImg} to={'/myPage'} />
			</NavItems>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	box-sizing: border-box;
	position: relative;
	width: 100%;
	height: 6rem;
	background-color: ${colors.white};
	box-shadow: 0 -0.1rem 0.5rem 0 rgba(0, 0, 0, 0.2);
`
const NavItems = styled.div`
	display: flex;
	justify-content: space-evenly;
`
const NavItem = styled.div`
	box-sizing: border-box;
	width: 8rem;
	height: 6rem;
	padding-top: 1.5rem;
	background: no-repeat center center url('${props => props.src}');
	background-size: 3rem 3rem;
	border-top: 3px solid
		${props => (props.to === props.currentpath ? themeColors.primary : 'transparent')};
`
