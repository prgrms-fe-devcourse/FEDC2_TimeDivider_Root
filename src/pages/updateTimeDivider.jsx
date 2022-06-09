import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import { useRecoilState } from 'recoil'
import { currentTimerState, nameState, timerState, timeState } from '../atom'
import { useTimer } from 'react-timer-hook'
const UpdateTimeDivider = () => {
	const dummyData = [
		{ id: '123', name: '밥 묵자', time: 1234 },
		{ id: '234', name: '치킨 묵자', time: 3221 },
		{ id: '345', name: '피자 묵자', time: 4432 },
		{ id: '456', name: '삼겹살 묵자', time: 4556 },
		{ id: '567', name: '홍차 마시자', time: 14432 },
		{ id: '678', name: '잠이나 자자', time: 44322 },
	]
	const [timers, setTimers] = useRecoilState(timerState)

	useEffect(() => {
		const newTimers = {}
		dummyData.forEach(({ id, name, time }) => (newTimers[id] = { name, time }))
		setTimers(newTimers)
	}, [])

	return (
		<>
			<NavBar backIcon>모래시계 편집하기</NavBar>
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
			<TimerArea>
				{Object.entries(timers).map(([id, { time, name }], index) => (
					<Timer
						key={index}
						id={id}
						name={name}
						expiryTimestamp={new Date(new Date().getTime() + time * 1000)}
					/>
				))}
			</TimerArea>
		</>
	)
}

export default UpdateTimeDivider

function Timer({ expiryTimestamp, autoStart = false, id, name }) {
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
		autoStart,
	})
	const [timers, setTimers] = useRecoilState(timerState)
	const [currentTimer, setCurrentTimer] = useRecoilState(currentTimerState)
	useEffect(() => {
		setTimers({ ...timers, [id]: { time: hours * 60 * 60 + minutes * 60 + seconds, name } })
	}, [seconds])

	useEffect(() => {
		if (currentTimer.id !== id) pause()
	}, [currentTimer])

	return (
		<TimerWrapper
			id={id}
			onClick={() => {
				resume()
				setCurrentTimer({ id, name })
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

const TimerArea = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
	height: 30rem;
`
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
