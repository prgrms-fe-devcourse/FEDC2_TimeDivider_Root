import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { timerState } from 'atom'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors, palette } from '../constants/colors'

const Timer = ({ expiryTimestamp, autoStart = false, id, name, onClick = () => {} }) => {
	const [timers, setTimers] = useRecoilState(timerState)

	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => {
			const newTimers = Object.assign({}, timers)
			newTimers[id] = {
				...newTimers[id],
				name: newTimers[id].name + '-완료',
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
				<span>
					{hours < 10 && 0}
					{hours}{' '}
				</span>{' '}
				:{' '}
				<span>
					{minutes < 10 && 0}
					{minutes}
				</span>{' '}
				:{' '}
				<span>
					{seconds < 10 && 0}
					{seconds}
				</span>
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
	width: 6.5rem;
	height: 6.5rem;
	padding: 1rem;
	font-size: 0.8rem;
	background-color: ${props =>
		props.disabled
			? `${palette.timeoutDarkGray}`
			: props.isRunning
			? `${colors.primary}`
			: `${colors.labelBackground}`};
	border-radius: 1rem;
	text-align: center;
`
const Time = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50%;
	color: ${props =>
		props.disabled
			? `${colors.fontReversed}`
			: props.isRunning
			? `${colors.fontReversed}`
			: `${colors.font}`};
`
const Name = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props =>
		props.disabled
			? `${colors.fontReversed}`
			: props.isRunning
			? `${colors.fontReversed}`
			: `${colors.primary}`};
	width: 100%;
	height: 50%;
`
