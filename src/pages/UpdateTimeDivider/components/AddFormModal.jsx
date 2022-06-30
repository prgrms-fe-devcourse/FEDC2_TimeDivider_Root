import React from 'react'
import { Input, Text, Select } from 'shared/components'
import { HOUR_NUMBERS, MINUTE_NUMBERS } from 'shared/components/TimeSelectForm'
import FormModal from './FormModal'
import { useRecoilState } from 'recoil'
import { addMode, defaultMode, modeState } from 'state/timer'
import styled from 'styled-components'
import { useTimers } from 'shared/hooks'

const AddFormModal = () => {
	const { addTimer } = useTimers()
	const [mode, setMode] = useRecoilState(modeState)

	const handleSubmit = e => {
		e.preventDefault()
		const [name, time, id] = [
			e.target.name.value,
			hmsToTime(e.target.hour.value, e.target.minute.value),
			'' + Date.now(),
		]
		addTimer(name, time, id)
		setMode(defaultMode)
	}
	const handleCancel = e => {
		setMode(defaultMode)
	}
	const handleClose = e => {
		setMode(defaultMode)
	}
	return (
		<FormModal
			id={'addForm'}
			visible={mode === addMode}
			height={38.1}
			onClose={handleClose}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
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
