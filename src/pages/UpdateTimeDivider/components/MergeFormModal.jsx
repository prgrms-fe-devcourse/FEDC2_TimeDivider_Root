import FormModal from './FormModal'
import React from 'react'
import { useRecoilState } from 'recoil'
import { mergeMode, modeState, originIdState } from 'state/timer'
import { useTimers } from 'shared/hooks'

const MergeFormModal = () => {
	const { timers, mergeTimer } = useTimers()
	const [mode, setMode] = useRecoilState(modeState)
	const [originId, setOriginId] = useRecoilState(originIdState)

	const handleClose = e => {
		setOriginId(null)
	}
	const handleSubmit = e => {
		e.preventDefault()
		if (!originId) return
		mergeTimer(originId, e.target.targetId.value)
	}
	const handleCancel = e => {
		setOriginId(null)
	}

	return (
		<FormModal
			id={'mergeForm'}
			height={32.3}
			visible={mode === mergeMode && originId !== null}
			onClose={handleClose}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
			titleText={timers[originId]?.name + '을 어느 항목에 합치시겠습니까?'}
			cancelText={'취소'}
			confirmText={'합치기'}
		>
			<select name={'targetId'}>
				{Object.entries(timers).map(
					([optionId, { time, name, disabled }]) =>
						optionId !== originId &&
						!disabled && (
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
