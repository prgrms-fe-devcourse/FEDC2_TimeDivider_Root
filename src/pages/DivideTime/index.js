import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import * as S from './style'

import Button from 'shared/components/Button'
import NavBar from 'shared/components/NavBar'
import TaskBox from 'pages/DivideTime/components/TaskBox'
import Text from 'shared/components/Text'
import TimeSelectForm from 'shared/components/TimeSelectForm'
import { convertSecondsToHourMinute } from 'shared/utils/convertTime'
import { themeColors } from 'shared/constants/colors'
import { usePendingTimers } from './hooks/usePendingTimers'
import { useTimers } from '../../shared/hooks/useTimers'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const DivideTime = () => {
	const {
		isTimeOver,
		pendingTimers,
		totalTime,
		selectedTask,
		initPendingTimers,
		changeTime,
		handlePendingTimerBoxClick,
	} = usePendingTimers()

	const { resetTimers } = useTimers()

	useEffect(() => {
		initPendingTimers()
	}, [])

	const handleSubmit = time => {
		changeTime(time)
	}

	const handleNextPageClick = () => {
		const newTimers = {}
		pendingTimers.forEach(({ name, time, id }) => {
			newTimers[id] = { time, name }
		})
		resetTimers(newTimers)
	}

	return (
		<>
			<NavBar backIcon />
			<S.SubTitle>
				<Text size={2.2} textAlign={'start'}>
					오늘 해야할 일들에 시간을 분배하세요.
				</Text>
			</S.SubTitle>
			<S.TimeSection>
				<Text
					size={2.0}
					color={themeColors.primary}
					style={{ fontSize: '2.0rem', marginBottom: '1rem' }}
				>
					남은 분배 가능 시간
				</Text>
				<Text size={3.5}>
					{convertSecondsToHourMinute(totalTime).hour} :{' '}
					{convertSecondsToHourMinute(totalTime).minute}
				</Text>
			</S.TimeSection>
			<S.TaskArea>
				<S.BoxContainer>
					{pendingTimers.map(timer => (
						<TaskBox
							key={timer.id}
							timer={timer}
							onClick={() => {
								handlePendingTimerBoxClick(timer)
							}}
						/>
					))}
				</S.BoxContainer>
			</S.TaskArea>
			<S.FormSection>
				{selectedTask && <TimeSelectForm targetTask={selectedTask} onSubmit={handleSubmit} />}
				{isTimeOver && (
					<Text color="red" size={1.4}>
						남은 시간이 부족합니다.
					</Text>
				)}
			</S.FormSection>
			<S.ButtonArea>
				<Link to="/updateTimeDivider">
					<Button onClick={handleNextPageClick}>{BUTTON_TEXT.VALID}</Button>
				</Link>
			</S.ButtonArea>
		</>
	)
}

export default DivideTime
