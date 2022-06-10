import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { combineState, currentTimerState, timerState } from '../atom'
import React, { useEffect } from 'react'
import styled from 'styled-components'

export function Timer({ expiryTimestamp, autoStart = false, id, name, onClick }) {
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
		autoStart,
	})
	const [timers, setTimers] = useRecoilState(timerState)
	const [currentTimer, setCurrentTimer] = useRecoilState(currentTimerState)

	useEffect(() => {
		restart(expiryTimestamp, false)
	}, [expiryTimestamp])

	useEffect(() => {
		setTimers({ ...timers, [id]: { name, time: hours * 60 * 60 + minutes * 60 + seconds } })
	}, [hours, minutes, seconds])

	useEffect(() => {
		if (currentTimer.id !== id) pause()
	}, [currentTimer])

	return (
		<TimerWrapper
			id={id}
			onClick={() => {
				if (onClick === undefined) {
					if (!isRunning) {
						resume()
						setCurrentTimer({ id, name })
					} else {
						pause()
						setCurrentTimer({ id: null, name: null })
					}
				} else {
					onClick()
				}
			}}
			isRunning={isRunning}
		>
			<Name>{name}</Name>
			<Time>
				<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
			</Time>
		</TimerWrapper>
	)
}

const TimerWrapper = styled.div`
	width: 8rem;
	height: 8rem;
	background-color: ${props => (props.isRunning ? 'orange' : 'antiquewhite')};
	border: 1px solid black;
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
