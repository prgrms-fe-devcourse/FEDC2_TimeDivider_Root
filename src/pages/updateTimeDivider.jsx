import React, { useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import { Timer } from '../components/Timer'
import Button from '../components/Button'
import Select from '../components/Select'
import { HOUR_NUMBERS, MINUTE_NUMBERS } from '../components/TimeSelectForm'
import FormModal from '../components/FormModal'

const UpdateTimeDivider = () => {
	const [updateMode, addMode, doneMode] = ['updateMode', 'addMode', 'doneMode']
	const formModalText = {
		addMode: {
			titleText: '추가하기',
			cancelText: '취소',
			confirmText: '확인',
		},
		doneMode: {
			titleText: '남은 시간을 어느 항목에 합치시겠습니까?',
			cancelText: '시간버리기',
			confirmText: '합치기',
		},
	}
	const modeButtonText = {
		addMode: '추가하기',
		doneMode: '완료하기',
		doneModeToggled: '취소',
	}

	const [timers, setTimers] = useRecoilState(timerState)
	const [mode, setMode] = useState(updateMode)
	const [originId, setOriginId] = useState(null)

	const playOrPauseTimer = (id = '') => {
		const newTimers = Object.assign({}, timers)
		for (const timerId in newTimers) {
			newTimers[timerId] = {
				...newTimers[timerId],
				isRunning: timerId === id ? !newTimers[id].isRunning : false,
			}
		}
		setTimers(newTimers)
	}

	const deleteTimer = id => {
		const newTimers = Object.assign({}, timers)
		delete newTimers[id]
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
	const onMergeEvent = e => {
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
	}
	const onDeleteEvent = e => {
		const newTimers = Object.assign({}, timers)
		if (originId === null) return
		delete newTimers[originId]
		setOriginId(null)
		setTimers(newTimers)
	}
	return (
		<Wrapper>
			<NavBar>모래시계 편집하기</NavBar>
			<ToolBar>
				<Button
					size={'md'}
					onClick={() => {
						playOrPauseTimer()
						setMode(addMode)
					}}
				>
					{modeButtonText.addMode}
				</Button>
				<Button
					size={'md'}
					onClick={() => {
						playOrPauseTimer()
						mode === doneMode ? setMode(updateMode) : setMode(doneMode)
					}}
				>
					{mode === doneMode ? modeButtonText.doneModeToggled : modeButtonText.doneMode}
				</Button>
			</ToolBar>
			<TimerArea mode={mode}>
				{Object.entries(timers).map(([id, { time, name }], index) => (
					<Timer
						key={id}
						id={id}
						name={name}
						expiryTimestamp={timeToExpiryTime(time)}
						onClick={() => {
							mode === doneMode ? setOriginId(id) : playOrPauseTimer(id)
						}}
						onExpire={() => deleteTimer(id)}
					/>
				))}
			</TimerArea>
			<FormModal
				id={'addForm'}
				visible={mode === addMode}
				onClose={() => setMode(updateMode)}
				onSubmit={e => {
					onAddEvent(e)
					setMode(updateMode)
				}}
				onCancel={e => {
					setMode(updateMode)
				}}
				titleText={formModalText.addMode.titleText}
				cancelText={formModalText.addMode.cancelText}
				confirmText={formModalText.addMode.confirmText}
			>
				<>
					할 일: <input name={'name'} required={true} type={'text'} maxLength={10} />
					몇 시간 : <Select name={'hour'} data={HOUR_NUMBERS} />
					몇 분: <Select name={'minute'} data={MINUTE_NUMBERS} />
				</>
			</FormModal>
			<FormModal
				id={'doneForm'}
				visible={mode === doneMode && originId}
				onClose={() => setOriginId(null)}
				onSubmit={e => onMergeEvent(e)}
				onCancel={e => onDeleteEvent(e)}
				titleText={formModalText.doneMode.titleText}
				cancelText={formModalText.doneMode.cancelText}
				confirmText={formModalText.doneMode.confirmText}
			>
				<>
					{originId && timers[originId].name}
					에서
					<select name={'targetId'}>
						{Object.entries(timers).map(
							([optionId, { time, name }]) =>
								optionId !== originId && (
									<option key={optionId} value={optionId}>
										{name}
									</option>
								),
						)}
					</select>
				</>
			</FormModal>
		</Wrapper>
	)
}

export default UpdateTimeDivider

const timeToExpiryTime = time => {
	return new Date(new Date().getTime() + time * 1000)
}
const hmsToTime = (hour = 0, minute = 0, seconds = 0) => {
	return hour * 60 * 60 + minute * 60 + seconds
}
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
`
const TimerArea = styled.div`
	display: flex;
	background-color: ${props => (props.mode === 'doneMode' ? 'skyblue' : 'none')};
	flex-wrap: wrap;
	width: 100%;
	margin-left: 1rem;
	gap: 0.5rem;
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
