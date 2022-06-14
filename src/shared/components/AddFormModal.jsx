import Select from './Select'
import { HOUR_NUMBERS, MINUTE_NUMBERS } from './TimeSelectForm'
import FormModal from './FormModal'
import React from 'react'
import { useRecoilState } from 'recoil'
import { addMode, defaultMode, modeState, timerObject, timerState } from 'atom'
import Input from './Input'
import styled from 'styled-components'
import Text from './Text'

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
			height={38.1}
			onClose={() => setMode(defaultMode)}
			onSubmit={e => {
				onAddEvent(e)
				setMode(defaultMode)
			}}
			onCancel={e => {
				setMode(defaultMode)
			}}
			titleText={'새로운 할일에 대해서 알려주세요'}
			cancelText={'취소'}
			confirmText={'확인'}
		>
			<>
				<Input
					placeholder={'할 일을 적어주세요'}
					width={25}
					fontSize={1.6}
					name={'name'}
					required={true}
					type={'text'}
					maxLength={10}
				/>
				<Section>
					<Select name={'hour'} data={HOUR_NUMBERS} style={{ width: '8rem' }} />
					<Text size={1.6}>시간</Text>
					<Select name={'minute'} data={MINUTE_NUMBERS} style={{ width: '8rem' }} />
					<Text size={1.6}>분</Text>
				</Section>
			</>
		</FormModal>
	)
}

export default AddFormModal

const hmsToTime = (hour = 0, minute = 0, seconds = 0) => {
	return hour * 60 * 60 + minute * 60 + seconds
}
const Section = styled.section`
	display: flex;
	gap: 1rem;
	justify-content: space-between;
	align-items: center;
	padding-top: 3rem;
`
