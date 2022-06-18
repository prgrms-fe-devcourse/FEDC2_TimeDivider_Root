import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { timerState } from 'state/timer'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors, themeColors } from '../constants/colors'

const Timer = ({ expiryTimestamp, autoStart = false, id, name, onClick = () => {} }) => {
	const [timers, setTimers] = useRecoilState(timerState)

	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => {
			const newTimers = Object.assign({}, timers)
			newTimers[id] = {
				...newTimers[id],
				isRunning: false,
				disabled: true,
			}
			setTimers(newTimers)
		},
		autoStart,
	})

	useEffect(() => {
		restart(expiryTimestamp, false)
	}, [expiryTimestamp])

	useEffect(() => {
		setTimers({
			...timers,
			[id]: { ...timers[id], time: hours * 60 * 60 + minutes * 60 + seconds },
		})
	}, [hours, minutes, seconds])

	useEffect(() => {
		if (timers[id].isRunning) {
			resume()
		} else {
			pause()
		}
	}, [timers])
	return (
		<TimerWrapper id={id} onClick={onClick} isRunning={isRunning} disabled={timers[id].disabled}>
			<Name isRunning={isRunning} disabled={timers[id].disabled}>
				{name}
			</Name>
			<Time isRunning={isRunning} disabled={timers[id].disabled}>
				{timers[id].disabled
					? '완료'
					: `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${
							seconds < 10 ? '0' + seconds : seconds
					  }`}
			</Time>
		</TimerWrapper>
	)
}

export default Timer
Timer.propType = {
	expiryTimestamp: PropTypes.object.isRequired,
	autoStart: PropTypes.bool,
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	onClick: PropTypes.func,
	onExpire: PropTypes.func,
}
const TimerWrapper = styled.div`
	box-sizing: border-box;
	width: 10rem;
	height: 10rem;

	padding: 1rem;

	background-color: ${props =>
		props.disabled
			? `${colors.timeoutDarkGray}`
			: props.isRunning
			? `${themeColors.primary}`
			: `${themeColors.labelBackground}`};
	border-radius: 1rem;
	text-align: center;
`
const Time = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.3rem;
	width: 100%;
	height: 50%;
	color: ${props =>
		props.disabled
			? `${themeColors.fontReversed}`
			: props.isRunning
			? `${themeColors.fontReversed}`
			: `${themeColors.font}`};
`
const Name = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.3rem;
	color: ${props =>
		props.disabled
			? `${themeColors.fontReversed}`
			: props.isRunning
			? `${themeColors.fontReversed}`
			: `${themeColors.primary}`};
	width: 100%;
	height: 50%;
`
