import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addMode, defaultMode, doneMode, mergeMode, modeState, originIdState } from 'state/timer'
import NavBar from 'shared/components/NavBar'
import Timer from 'shared/components/Timer'
import AddFormModal from 'pages/UpdateTimeDivider/components/AddFormModal'
import MergeFormModal from 'pages/UpdateTimeDivider/components/MergeFormModal'
import DoneFormModal from 'pages/UpdateTimeDivider/components/DoneFormModal'
import { BottomBar } from 'shared/components/BottomBar'
import { BottomBarArea, Description, TimerArea, ToolBar, Wrapper } from './style'
import { useTimers } from 'shared/hooks/useTimers'
import { ToolBarButton } from './components/ToolBarButton'

const UpdateTimeDivider = () => {
	const { timers, toggleRunning } = useTimers()
	const [completeMode, setCompleteMode] = useState(false)
	const [mode, setMode] = useRecoilState(modeState)
	const setOriginId = useSetRecoilState(originIdState)

	return (
		<Wrapper>
			<NavBar>제목 미정 </NavBar>
			<ToolBar>
				<ToolBarButton
					onClick={() => {
						toggleRunning()
						setMode(addMode)
					}}
				>
					{'추가'}
				</ToolBarButton>
				<ToolBarButton
					reversed={mode === doneMode}
					onClick={() => {
						toggleRunning()
						mode === doneMode ? setMode(defaultMode) : setMode(doneMode)
					}}
				>
					{mode === doneMode ? '취소' : '완료'}
				</ToolBarButton>
			</ToolBar>
			<Description>
				{mode === doneMode ? '완료 할 일을 선택하세요.' : '일을 클릭하여 시작하세요.'}
			</Description>
			<TimerArea>
				{Object.entries(timers)
					.sort((a, b) => {
						if (a[1].disabled) return 1
						if (b[1].disabled) return -1
						return 0
					})
					.map(([id, { time, name, disabled }], index) => (
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
					))}
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
