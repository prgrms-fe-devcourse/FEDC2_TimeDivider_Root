import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import NavBar from '../components/NavBar'
import { Timer } from '../components/Timer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { HOUR_NUMBERS, MINUTE_NUMBERS } from '../components/TimeSelectForm'
import Select from '../components/Select'
import Modal from '../components/Modal'

export const AddToDoTimeDivider = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	const [modalVisible, setModalVisible] = useState(true)

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
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
			<TimerArea>
				{Object.entries(timers).map(([id, { time, name }], index) => (
					<Timer key={id} id={id} name={name} expiryTimestamp={timeToExpiryTime(time)} />
				))}
			</TimerArea>
			<Modal visible={true} onClose={() => setModalVisible(false)}>
				<form onSubmit={e => onAddEvent(e)}>
					할 일: <input name={'name'} required={true} type={'text'} maxLength={10} />
					몇 시간 : <Select name={'hour'} data={HOUR_NUMBERS} />
					몇 분: <Select name={'minute'} data={MINUTE_NUMBERS} />
					<button>생성하기</button>
				</form>
			</Modal>
		</>
	)
}

export default AddToDoTimeDivider

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
