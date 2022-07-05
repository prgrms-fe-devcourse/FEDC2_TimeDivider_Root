import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
	addMode,
	defaultMode,
	doneMode,
	mergeMode,
	modeState,
	originIdState,
	resetMode,
} from 'state/timer'
import AddFormModal from 'pages/UpdateTimeDivider/components/AddFormModal'
import MergeFormModal from 'pages/UpdateTimeDivider/components/MergeFormModal'
import CompleteFormModal from 'pages/UpdateTimeDivider/components/CompleteFormModal'
import { BottomBar, Logo, Timer } from 'shared/components'

import { useTimers, useUser } from 'shared/hooks'
import { ToolBarButton } from './components/ToolBarButton'
import ResetFormModal from './components/ResetFormModal'
import styled from 'styled-components'
import { themeColors } from 'shared/constants/colors'

const UpdateTimeDivider = () => {
	const { timers, toggleRunning } = useTimers()
	const { user } = useUser()
	const [mode, setMode] = useRecoilState(modeState)
	const setOriginId = useSetRecoilState(originIdState)

	const handleTimerClick = id => {
		if (timers[id].disabled) return
		mode === doneMode ? setOriginId(id) : toggleRunning(id)
	}
	const handleResetButtonClick = e => {
		setMode(resetMode)
	}
	const handleAddButtonClick = e => {
		toggleRunning()
		setMode(addMode)
	}
	const handleCompleteButtonClick = e => {
		mode === doneMode ? setMode(defaultMode) : setMode(doneMode)
	}
	const timerEntries = timers =>
		Object.entries(timers).sort((a, b) => {
			if (a[1].disabled) return 1
			if (b[1].disabled) return -1
			return 0
		})

	return (
		<Wrapper>
			<TopBar>
				<Logo size={'NAVBAR'} />
			</TopBar>
			<ToolBar>
				<ToolBarButton onClick={handleResetButtonClick}>{'리셋'}</ToolBarButton>
				<ToolBarButton onClick={handleAddButtonClick}>{'추가'}</ToolBarButton>
				<ToolBarButton reversed={mode === doneMode} onClick={handleCompleteButtonClick}>
					{mode === doneMode ? '취소' : '완료'}
				</ToolBarButton>
			</ToolBar>
			<Description>
				{mode === doneMode ? '완료 할 일을 선택하세요.' : '일을 클릭하여 시작하세요.'}
			</Description>
			<TimerArea>
				{timerEntries(timers).map(([id, { time, name }], index) => (
					<Timer
						key={id}
						id={id}
						name={name}
						expiryTimestamp={timeToExpiryTime(time)}
						onClick={() => handleTimerClick(id)}
					/>
				))}
			</TimerArea>
			{mode === resetMode && <ResetFormModal />}
			{mode === addMode && <AddFormModal />}
			{mode === doneMode && <CompleteFormModal />}
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

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	align-items: center;
`
const TimerArea = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	gap: 0.5rem;
	padding-top: 1rem;
	padding-left: 3.5rem;
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
	padding-left: 4rem;
	margin-bottom: 1rem;
`
const BottomBarArea = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
`
const TopBar = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding-top: 2rem;
`
const Title = styled.div`
	display: flex;
	padding-left: 7rem;
	flex: 1;
`
const AvatarWrapper = styled.div`
	margin-left: 1rem;
`
