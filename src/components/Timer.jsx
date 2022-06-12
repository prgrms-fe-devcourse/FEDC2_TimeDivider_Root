import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import React, { useEffect } from 'react'
import styled from 'styled-components'

export function Timer({ expiryTimestamp, autoStart = false, id, name, onClick = () => {} }) {
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
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
			<Name>{name}</Name>
			<Time>
				<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
				<div>{isRunning ? '실행중' : '정지'}</div>
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
