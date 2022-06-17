import React from 'react'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { addMode, defaultMode, doneMode, mergeMode, modeState, originIdState } from 'state/timer'

import NavBar from 'shared/components/NavBar'
import Timer from 'shared/components/Timer'
import Button from 'shared/components/Button'
import AddFormModal from 'pages/UpdateTimeDivider/components/AddFormModal'
import MergeFormModal from 'pages/UpdateTimeDivider/components/MergeFormModal'
import { themeColors } from 'shared/constants/colors'
import DoneFormModal from 'pages/UpdateTimeDivider/components/DoneFormModal'
import { BottomBar } from '../../shared/components/BottomBar'
import { BottomBarArea, Description, TimerArea, ToolBar, Wrapper } from './style'
import { useTimers } from '../../shared/hooks/useTimers'

const UpdateTimeDivider = () => {
	const { timers, toggleRunning } = useTimers()
	const [mode, setMode] = useRecoilState(modeState)
	const setOriginId = useSetRecoilState(originIdState)

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
						toggleRunning()
						setMode(addMode)
					}}
				>
					{'추가'}
				</Button>
				<Button
					width={6.3}
					height={2.7}
					fontSize={1.3}
					backgroundColor={mode === doneMode ? themeColors.primary : themeColors.background}
					fontColor={mode === doneMode ? themeColors.fontReversed : themeColors.primary}
					style={{ lineHeight: '1rem' }}
					onClick={() => {
						toggleRunning()
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
									mode === doneMode ? setOriginId(id) : toggleRunning(id)
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
									mode === doneMode ? setOriginId(id) : toggleRunning(id)
								}}
							/>
						),
				)}
			</TimerArea>
			{mode === addMode && <AddFormModal />}
			{mode === doneMode && <DoneFormModal />}
			{mode === mergeMode && <MergeFormModal />}
			<BottomBarArea>
				<BottomBar />
			</BottomBarArea>
		</Wrapper>
	)
}

export default UpdateTimeDivider

const timeToExpiryTime = time => {
	return new Date(new Date().getTime() + time * 1000)
}
