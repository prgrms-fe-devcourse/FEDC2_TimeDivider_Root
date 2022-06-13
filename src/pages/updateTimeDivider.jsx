import React from 'react'
import styled from 'styled-components'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { addMode, defaultMode, doneMode, modeState, originIdState, timerState } from 'atom'

import NavBar from 'shared/components/NavBar'
import Timer from 'shared/components/Timer'
import Button from 'shared/components/Button'
import AddFormModal from 'shared/components/AddFormModal'
import DoneFormModal from 'shared/components/DoneFormModal'
import Text from '../shared/components/Text'

const UpdateTimeDivider = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	const [mode, setMode] = useRecoilState(modeState)
	const setOriginId = useSetRecoilState(originIdState)

	const toggleTimerRunning = (id = '') => {
		const newTimers = Object.assign({}, timers)
		for (const timerId in newTimers) {
			newTimers[timerId] = {
				...newTimers[timerId],
				isRunning: timerId === id ? !newTimers[id].isRunning : false,
			}
		}
		setTimers(newTimers)
	}

	return (
		<Wrapper>
			<NavBar>제목 미정 </NavBar>
			<ToolBar>
				<Button
					size={'md'}
					onClick={() => {
						toggleTimerRunning()
						setMode(addMode)
					}}
				>
					{'추가하기'}
				</Button>
				<Button
					size={'md'}
					onClick={() => {
						toggleTimerRunning()
						mode === doneMode ? setMode(defaultMode) : setMode(doneMode)
					}}
				>
					{mode === doneMode ? '취소' : '완료하기'}
				</Button>
			</ToolBar>
			<Text>완료 할 일을 선택하세요.</Text>
			<TimerArea mode={mode}>
				{Object.entries(timers).map(([id, { time, name, disabled }], index) => (
					<Timer
						key={id}
						id={id}
						name={name}
						expiryTimestamp={timeToExpiryTime(time)}
						onClick={() => {
							if (timers[id].disabled) return
							mode === doneMode ? setOriginId(id) : toggleTimerRunning(id)
						}}
					/>
				))}
			</TimerArea>
			<AddFormModal />
			<DoneFormModal />
		</Wrapper>
	)
}

export default UpdateTimeDivider

const timeToExpiryTime = time => {
	return new Date(new Date().getTime() + time * 1000)
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
