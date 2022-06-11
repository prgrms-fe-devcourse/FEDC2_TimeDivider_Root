import React from 'react'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import NavBar from '../components/NavBar'
import { Timer } from '../components/Timer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TimeSelectForm from '../components/TimeSelectForm'

export const AddToDoTimeDivider = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	return (
		<>
			<NavBar backIcon>모래시계 편집하기</NavBar>
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
			<TimerArea>
				{Object.entries(timers).map(([id, { time, name }], index) => {
					return (
						<Timer
							onClick={() => {}}
							key={id}
							id={id}
							name={name}
							expiryTimestamp={new Date(new Date().getTime() + time * 1000)}
						/>
					)
				})}
			</TimerArea>
			<Modal>
				<form
					onSubmit={e => {
						e.preventDefault()
						const [name, time, id] = [
							e.target.name.value,
							e.target.hour.value * 60 * 60 + e.target.minute.value * 60,
							'' + Date.now(),
						]
						setTimers({ ...timers, [id]: { time, name } })
					}}
				>
					할 일: <input name={'name'} required={true} type={'text'} maxLength={10} />
					몇 시간 : <input name={'hour'} required={true} type={'number'} maxLength={2} max={23} />
					몇 분: <input name={'minute'} required={true} type={'number'} maxLength={2} max={59} />
					<button>생성하기</button>
				</form>
			</Modal>
		</>
	)
}

export default AddToDoTimeDivider
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
