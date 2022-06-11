import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import { Timer } from '../components/Timer'
const UpdateTimeDivider = () => {
	const dummyData = [
		{ id: '123', name: '밥 묵자', time: 600 },
		{ id: '234', name: '치킨 묵자', time: 1200 },
		{ id: '345', name: '피자 묵자', time: 1800 },
		{ id: '456', name: '삼겹살 묵자', time: 2400 },
		{ id: '567', name: '홍차 마시자', time: 3000 },
		{ id: '678', name: '잠이나 자자', time: 3600 },
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
						key={id}
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

const TimerArea = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
	height: 30rem;
`
