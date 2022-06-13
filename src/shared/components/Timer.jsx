import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { timerState } from 'atom'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Text from './Text'
import PropTypes from 'prop-types'

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
	background-color: ${props =>
		props.disabled ? '#D6D5A8' : props.isRunning ? '#94B49F' : '#FCF8E8'};
	border: 1px solid #94b49f;
	text-align: center;
	color: ${props => (props.disabled ? 'inherit' : props.isRunning ? 'white' : 'inherit')};
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
