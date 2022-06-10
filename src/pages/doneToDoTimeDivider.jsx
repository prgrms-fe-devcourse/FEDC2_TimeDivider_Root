import React, { useState } from 'react'
import styled from 'styled-components'
import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { combineState, currentTimerState, timerState } from '../atom'
import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { Timer } from '../components/Timer'

const DoneToDoTimeDivider = () => {
	const [timers, setTimers] = useRecoilState(timerState)

	const [originId, setOriginId] = useState(null)

	return (
		<>
			<NavBar backIcon>모래시계 편집하기</NavBar>
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
			<TimerArea>
				{Object.entries(timers).map(([id, { time, name }], index) => {
					return (
						<Timer
							onClick={() => {
								setOriginId(id)
							}}
							key={id}
							id={id}
							name={name}
							expiryTimestamp={new Date(new Date().getTime() + time * 1000)}
						/>
					)
				})}
			</TimerArea>
			<div>
				{Object.entries(timers).map(([id, { time, name }], index) => (
					<div>
						{id}: {time}, {name}
					</div>
				))}
			</div>

			<Modal>
				<form
					onSubmit={e => {
						e.preventDefault()
						const targetId = e.target.targetId.value
						const newTimers = {
							...timers,
							[targetId]: {
								...timers[targetId],
								time: timers[targetId].time + timers[originId].time,
							},
						}
						delete newTimers[originId]
						setOriginId(null)
						setTimers(newTimers)
					}}
				>
					{originId ? timers[originId].name : '선택하세요'}
					에서
					<select name={'targetId'}>
						{Object.entries(timers).map(
							([optionId, { time, name }]) =>
								optionId !== originId && <option value={optionId}>{name}</option>,
						)}
					</select>
					으로<button>시간합치기</button>
				</form>
			</Modal>
		</>
	)
}

export default DoneToDoTimeDivider

const TimerArea = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
	height: 30rem;
`
const Modal = styled.div`
	width: 100%;
	height: 10rem;
	background-color: aliceblue;
`

const convertTimeToHMS = totalTime => {
	return {
		hours: Math.floor(totalTime / 3600),
		minutes: Math.floor((totalTime % 3600) / 60),
		seconds: (totalTime % 3600) % 60,
	}
}
const formattedTime = totalTime => `${convertTimeToHMS(totalTime).hours}:
${convertTimeToHMS(totalTime).minutes}:
${convertTimeToHMS(totalTime).seconds}`
