import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { timerState } from '../../atom'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Text from './Text'
import PropTypes from 'prop-types'

const Timer = ({
	expiryTimestamp,
	autoStart = false,
	id,
	name,
	onClick = () => {},
	onExpire = () => console.warn('onExpire called'),
}) => {
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire,
		autoStart,
	})
	const [timers, setTimers] = useRecoilState(timerState)

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
		<TimerWrapper id={id} onClick={onClick} isRunning={isRunning}>
			<Name>
				<Text>{name}</Text>
			</Name>
			<Time>
				<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
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
	width: 8rem;
	height: 8rem;
	background-color: ${props => (props.isRunning ? '#94B49F' : '#FCF8E8')};
	border: 1px solid #94b49f;
	text-align: center;
`
const Time = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50%;
`
const Name = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50%;
`
