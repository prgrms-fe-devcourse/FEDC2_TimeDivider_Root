import FormModal from './FormModal'
import React from 'react'
import { useTimers } from 'shared/hooks'
import { useRecoilState } from 'recoil'
import { defaultMode, modeState, resetMode } from '../../../state/timer'

const ResetFormModal = () => {
	const { resetTimers } = useTimers()
	const [mode, setMode] = useRecoilState(modeState)

	const handleClose = e => {
		setMode(defaultMode)
	}
	const handleCancel = e => {
		setMode(defaultMode)
	}
	const handleSubmit = e => {
		resetTimers()
	}
	return (
		<FormModal
			id={'resetForm'}
			height={21.1}
			visible={mode === resetMode}
			onClose={handleClose}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
			titleText={'모든 타이머를 삭제하시겠습니까?'}
			cancelText={'취소'}
			confirmText={'확인'}
		>
			{' '}
		</FormModal>
	)
}

export default ResetFormModal
