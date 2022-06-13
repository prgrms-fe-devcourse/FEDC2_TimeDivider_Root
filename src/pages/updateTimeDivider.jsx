import React from 'react'
import styled from 'styled-components'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { addMode, defaultMode, doneMode, modeState, originIdState, timerState } from 'atom'

import NavBar from 'shared/components/NavBar'
import Timer from 'shared/components/Timer'
import Button from 'shared/components/Button'
import AddFormModal from 'shared/components/AddFormModal'
import MergeFormModal from 'shared/components/MergeFormModal'
import { themeColors } from '../shared/constants/colors'

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
					width={6.3}
					height={2.7}
					fontSize={1.3}
					backgroundColor={themeColors.background}
					fontColor={themeColors.primary}
					style={{ lineHeight: '1rem' }}
					onClick={() => {
						toggleTimerRunning()
						setMode(addMode)
					}}
				>
					{'추가'}
				</Button>
				<Button
					width={6.3}
					height={2.7}
					fontSize={1.3}
					backgroundColor={themeColors.background}
					fontColor={themeColors.primary}
					style={{ lineHeight: '1rem' }}
					onClick={() => {
						toggleTimerRunning()
						mode === doneMode ? setMode(defaultMode) : setMode(doneMode)
					}}
				>
					{mode === doneMode ? '취소' : '완료'}
				</Button>
			</ToolBar>
			<Description>
				{mode === doneMode ? '완료 할 일을 선택하세요.' : '일을 클릭하여 시작하세요.'}
			</Description>
			<TimerArea>
				{Object.entries(timers).map(
					([id, { time, name, disabled }], index) =>
						!disabled && (
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
						),
				)}
				{Object.entries(timers).map(
					([id, { time, name, disabled }], index) =>
						disabled && (
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
						),
				)}
			</TimerArea>
			<AddFormModal />
			<MergeFormModal />
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
	flex-wrap: wrap;
	width: 31.6rem;
	margin: auto;
	gap: 0.5rem;
`
const ToolBar = styled.div`
	display: flex;
	column-gap: 1rem;
	justify-content: end;
	width: 100%;
	height: 3rem;
	padding-right: 7rem;
	padding-top: 10rem;
	padding-bottom: 2rem;
`
const Description = styled.div`
	display: flex;
	width: 90%;
	align-items: start;
	color: ${themeColors.fontDescription};
	font-size: 1.3rem;
	padding-left: 2rem;
	margin-bottom: 1rem;
`
