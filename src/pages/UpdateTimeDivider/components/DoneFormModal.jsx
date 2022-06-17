import FormModal from '../../../shared/components/FormModal'
import React from 'react'
import { useRecoilState } from 'recoil'
import { doneMode, mergeMode, modeState, originIdState } from 'state/timer'
import { useTimers } from '../../../shared/hooks/useTimers'

const MergeFormModal = () => {
	const { makeTimerDone } = useTimers()
	const [mode, setMode] = useRecoilState(modeState)
	const [originId, setOriginId] = useRecoilState(originIdState)

	const onDoneEvent = e => {
		if (!originId) return
		makeTimerDone(originId)
		setOriginId(null)
	}

	return (
		<FormModal
			id={'doneForm'}
			height={21.1}
			visible={mode === doneMode && originId !== null}
			onClose={() => {
				setOriginId(null)
			}}
			onSubmit={e => {
				setMode(mergeMode)
			}}
			onCancel={e => onDoneEvent(e)}
			titleText={'남은 시간을 다른 일에 합칠까요?'}
			cancelText={'합치지 않고 완료하기'}
			confirmText={'합치기'}
		>
			{' '}
		</FormModal>
	)
}

export default MergeFormModal
