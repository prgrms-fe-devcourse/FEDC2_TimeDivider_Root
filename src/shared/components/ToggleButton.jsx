import styled from 'styled-components'
import { useState } from 'react'
import { colors, themeColors } from '../constants/colors'

const ToggleButton = ({ width = 10, height = 5, onToggle, ...props }) => {
	const [toggled, setToggled] = useState(false)

	return (
		<Wrapper
			{...props}
			onClick={() => {
				setToggled(toggled => !toggled)
				onToggle(!toggled)
			}}
			width={width}
			height={height}
			toggled={toggled}
		>
			<Switch size={height} toggled={toggled} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	width: ${props => props.width}rem;
	height: ${props => props.height}rem;
	background-color: ${props => (props.toggled ? themeColors.primary : colors.timeoutDarkGray)};
	border: 0.3rem solid ${props => (props.toggled ? themeColors.primary : colors.timeoutDarkGray)};
	border-radius: ${props => props.height}rem;
	justify-content: ${props => (props.toggled ? 'end' : 'start')};
`

const Switch = styled.div`
	width: ${props => props.size}rem;
	height: ${props => props.size}rem;
	background-color: ${colors.white};
	border-radius: 50%;
`

export default ToggleButton
