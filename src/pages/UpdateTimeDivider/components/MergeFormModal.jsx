import FormModal from '../../../shared/components/FormModal'
import React from 'react'
import { useRecoilState } from 'recoil'
import { mergeMode, modeState, originIdState, timerState } from 'state/timer'

const MergeFormModal = () => {
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

	const onMergeEvent = e => {
		e.preventDefault()
		if (!originId) return
		mergeTimer(originId, e.target.targetId.value)
	}

	return (
		<FormModal
			id={'mergeForm'}
			height={32.3}
			visible={mode === mergeMode && originId !== null}
			onClose={() => setOriginId(null)}
			onSubmit={e => onMergeEvent(e)}
			onCancel={e => setOriginId(null)}
			titleText={timers[originId]?.name + '을 어느 항목에 합치시겠습니까?'}
			cancelText={'취소'}
			confirmText={'합치기'}
		>
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
		</FormModal>
	)
}

export default MergeFormModal
