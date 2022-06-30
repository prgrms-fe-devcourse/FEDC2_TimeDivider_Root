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
import { BottomBarArea, Description, TimerArea, ToolBar, TopBar, Wrapper } from './style'
import { useTimers } from 'shared/hooks/useTimers'
import { ToolBarButton } from './components/ToolBarButton'
import ResetFormModal from './components/ResetFormModal'
import { useUser } from '../../shared/hooks/useUser'

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
