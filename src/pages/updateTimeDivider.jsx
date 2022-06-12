import React, { useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import { Timer } from '../components/Timer'
import Button from '../components/Button'
import Select from '../components/Select'
import { HOUR_NUMBERS, MINUTE_NUMBERS } from '../components/TimeSelectForm'
import Modal from '../components/Modal'

const UpdateTimeDivider = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	const [addModalVisible, setAddModalVisible] = useState(false)
	const [doneModalVisible, setDoneModalVisible] = useState(false)

	const stopAllTimers = () => {
		const newTimers = Object.assign({}, timers)
		for (const timerId in newTimers) {
			newTimers[timerId] = {
				...newTimers[timerId],
				isRunning: false,
			}
		}
		setTimers(newTimers)
	}
	const playOrPauseTimer = id => {
		const newTimers = Object.assign({}, timers)
		for (const timerId in newTimers) {
			newTimers[timerId] = {
				...newTimers[timerId],
				isRunning: timerId === id ? !newTimers[id].isRunning : false,
			}
		}
		setTimers(newTimers)
	}
	const onAddEvent = e => {
		e.preventDefault()
		const [name, time, id] = [
			e.target.name.value,
			hmsToTime(e.target.hour.value, e.target.minute.value),
			'' + Date.now(),
		]
		setTimers({ ...timers, [id]: { time, name } })
	}
	return (
		<>
			<NavBar backIcon>모래시계 편집하기</NavBar>
			<ToolBar>
				<Button
					size={'md'}
					onClick={() => {
						stopAllTimers()
						setAddModalVisible(true)
					}}
				>
					추가하기
				</Button>
				<Button
					size={'md'}
					onClick={() => {
						stopAllTimers()
					}}
				>
					완료하기
				</Button>
			</ToolBar>
			<TimerArea>
				{Object.entries(timers).map(([id, { time, name }], index) => (
					<Timer
						key={id}
						id={id}
						name={name}
						expiryTimestamp={timeToExpiryTime(time)}
						onClick={() => {
							playOrPauseTimer(id)
						}}
					/>
				))}
			</TimerArea>
			<Modal visible={addModalVisible} onClose={() => setAddModalVisible(false)}>
				<form
					onSubmit={e => {
						onAddEvent(e)
						setAddModalVisible(false)
					}}
				>
					할 일: <input name={'name'} required={true} type={'text'} maxLength={10} />
					몇 시간 : <Select name={'hour'} data={HOUR_NUMBERS} />
					몇 분: <Select name={'minute'} data={MINUTE_NUMBERS} />
					<button>생성하기</button>
				</form>
			</Modal>
		</>
	)
}

export default UpdateTimeDivider

const timeToExpiryTime = time => {
	return new Date(new Date().getTime() + time * 1000)
}
const hmsToTime = (hour = 0, minute = 0, seconds = 0) => {
	return hour * 60 * 60 + minute * 60 + seconds
}
const TimerArea = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
	height: 30rem;
`
const ToolBar = styled.div`
	display: flex;
	column-gap: 1rem;
	justify-content: end;
	width: 100%;
	height: 3rem;
	padding-right: 1rem;
	padding-top: 1rem;
`
