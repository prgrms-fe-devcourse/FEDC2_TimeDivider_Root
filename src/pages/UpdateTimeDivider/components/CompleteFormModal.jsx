import FormModal from './FormModal'
import React from 'react'
import { useRecoilState } from 'recoil'
import { doneMode, mergeMode, modeState, originIdState } from 'state/timer'
import { useTimers } from 'shared/hooks'

const CompleteFormModal = () => {
	const { completeTimer } = useTimers()

	const [mode, setMode] = useRecoilState(modeState)
	const [originId, setOriginId] = useRecoilState(originIdState)

	const handleClose = e => {
		setOriginId(null)
	}
	const handleSubmit = e => {
		setMode(mergeMode)
	}
	const handleCancel = e => {
		if (!originId) return
		completeTimer(originId)
		setOriginId(null)
	}

	return (
		<FormModal
			id={'doneForm'}
			height={21.1}
			visible={mode === doneMode && originId !== null}
			onClose={handleClose}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
			titleText={'남은 시간을 다른 일에 합칠까요?'}
			cancelText={'합치지 않고 완료하기'}
			confirmText={'합치기'}
		>
			{' '}
		</FormModal>
	)
}

export default CompleteFormModal
