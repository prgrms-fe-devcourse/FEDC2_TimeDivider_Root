import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import { Timer } from '../components/Timer'
const UpdateTimeDivider = () => {
	const [timers, setTimers] = useRecoilState(timerState)

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
