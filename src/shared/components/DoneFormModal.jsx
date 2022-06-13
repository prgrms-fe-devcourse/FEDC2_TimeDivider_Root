import FormModal from './FormModal'
import React from 'react'
import { useRecoilState } from 'recoil'
import { doneMode, modeState, originIdState, timerState } from 'atom'

const DoneFormModal = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	const [mode, setMode] = useRecoilState(modeState)
	const [originId, setOriginId] = useRecoilState(originIdState)

	const mergeTimer = (originId, targetId) => {
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

	const deleteTimer = id => {
		const newTimers = Object.assign({}, timers)
		delete newTimers[id]
		setTimers(newTimers)
	}

	const onMergeEvent = e => {
		e.preventDefault()
		if (!originId) return
		mergeTimer(originId, e.target.targetId.value)
	}

	const onDeleteEvent = e => {
		if (!originId) return
		deleteTimer(originId)
		setOriginId(null)
	}

	return (
		<FormModal
			id={'doneForm'}
			visible={mode === doneMode && originId}
			onClose={() => setOriginId(null)}
			onSubmit={e => onMergeEvent(e)}
			onCancel={e => onDeleteEvent(e)}
			titleText={'남은 시간을 어느 항목에 합치시겠습니까?'}
			cancelText={'시간버리기'}
			confirmText={'합치기'}
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
	)
}

export default DoneFormModal
