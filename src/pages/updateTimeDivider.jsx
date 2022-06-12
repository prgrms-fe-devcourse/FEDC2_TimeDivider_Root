import React, { useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import { useRecoilState } from 'recoil'
import { timerState } from '../atom'
import { Timer } from '../components/Timer'
import Button from '../components/Button'
import Select from '../components/Select'
import { HOUR_NUMBERS, MINUTE_NUMBERS } from '../components/TimeSelectForm'
import { FormModal } from '../components/FormModal'

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

	const [timers, setTimers] = useRecoilState(timerState)
	const [mode, setMode] = useState(updateMode)
	const [originId, setOriginId] = useState(null)

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
						stopAllTimers()
						setMode(addMode)
					}}
				>
					추가하기
				</Button>
				<Button
					size={'md'}
					onClick={() => {
						stopAllTimers()
						mode === doneMode ? setMode(updateMode) : setMode(doneMode)
					}}
				>
					{mode === doneMode ? '취소' : '완료하기'}
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
					/>
				))}
			</TimerArea>
			<FormModal
				visible={mode === addMode || (mode === doneMode && originId)}
				onClose={() => {
					if (mode === addMode) {
						setMode(updateMode)
					}
					if (mode === doneMode) {
						setOriginId(null)
					}
				}}
				onSubmit={e => {
					if (mode === addMode) {
						onAddEvent(e)
						setMode(updateMode)
					}
					if (mode === doneMode) {
						onMergeEvent(e)
						setOriginId(null)
					}
				}}
				onCancel={e => {
					if (mode === addMode) {
						setMode(updateMode)
					}
					if (mode === doneMode) {
						onDeleteEvent(e)
					}
				}}
				titleText={formModalText[mode]?.titleText}
				cancelText={formModalText[mode]?.cancelText}
				confirmText={formModalText[mode]?.confirmText}
			>
				{mode === addMode && (
					<>
						할 일: <input name={'name'} required={true} type={'text'} maxLength={10} />
						몇 시간 : <Select name={'hour'} data={HOUR_NUMBERS} />
						몇 분: <Select name={'minute'} data={MINUTE_NUMBERS} />
					</>
				)}
				{mode === doneMode && originId && (
					<>
						{timers[originId]?.name}
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
				)}
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
