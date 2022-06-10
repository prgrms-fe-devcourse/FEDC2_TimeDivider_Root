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
	const [showModal, setShowModal] = useState(false)
	const [clickedId, setSelectedId] = useState(null)
	const [combine, setCombine] = useRecoilState(combineState)
	const showCombineModal = () => {}

	return (
		<>
			<NavBar backIcon>모래시계 편집하기</NavBar>
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
			<TimerArea>
				{Object.entries(timers).map(([id, { time, name }], index) => (
					<Timer
						onClick={() => {
							setSelectedId(id)
							setShowModal(true)
						}}
						key={index}
						id={id}
						name={name}
						expiryTimestamp={new Date(new Date().getTime() + time * 1000)}
					/>
				))}
			</TimerArea>
			{showModal && (
				<Modal>
					<form
						onSubmit={e => {
							e.preventDefault()
							const targetId = e.target.targetId.value
							const newExpiryTimestamp = new Date(
								new Date().getTime() + timers[targetId].time * 1000 + timers[clickedId].time * 1000,
							)

							setCombine({ id: targetId, newExpiryTimestamp })
							const newTimers = Object.assign({}, timers)
							delete newTimers[clickedId]
							setTimers(newTimers)
							setShowModal(false)
						}}
					>
						<div>합칠 시간: {clickedId ? formattedTime(timers[clickedId].time) : null}</div>
						<div>{timers[clickedId]?.name} 에서</div>
						<select name={'targetId'}>
							{Object.entries(timers).map(
								([optionId, { time, name }]) =>
									optionId !== clickedId && <option value={optionId}>{name}</option>,
							)}
						</select>
						으로<button>시간합치기</button>
					</form>
				</Modal>
			)}
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
