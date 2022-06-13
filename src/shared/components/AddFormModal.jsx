import Select from './Select'
import { HOUR_NUMBERS, MINUTE_NUMBERS } from './TimeSelectForm'
import FormModal from './FormModal'
import React from 'react'
import { useRecoilState } from 'recoil'
import { addMode, defaultMode, modeState, timerObject, timerState } from 'atom'

const AddFormModal = () => {
	const [timers, setTimers] = useRecoilState(timerState)
	const [mode, setMode] = useRecoilState(modeState)

	const addTimer = (name, time, id) => {
		setTimers({ ...timers, [id]: timerObject(time, name) })
	}

	const onAddEvent = e => {
		e.preventDefault()
		const [name, time, id] = [
			e.target.name.value,
			hmsToTime(e.target.hour.value, e.target.minute.value),
			'' + Date.now(),
		]
		addTimer(name, time, id)
	}

	return (
		<FormModal
			id={'addForm'}
			visible={mode === addMode}
			onClose={() => setMode(defaultMode)}
			onSubmit={e => {
				onAddEvent(e)
				setMode(defaultMode)
			}}
			onCancel={e => {
				setMode(defaultMode)
			}}
			titleText={'추가하기'}
			cancelText={'취소'}
			confirmText={'확인'}
		>
			<>
				할 일: <input name={'name'} required={true} type={'text'} maxLength={10} />
				몇 시간 : <Select name={'hour'} data={HOUR_NUMBERS} />
				몇 분: <Select name={'minute'} data={MINUTE_NUMBERS} />
			</>
		</FormModal>
	)
}

export default AddFormModal

const hmsToTime = (hour = 0, minute = 0, seconds = 0) => {
	return hour * 60 * 60 + minute * 60 + seconds
}
