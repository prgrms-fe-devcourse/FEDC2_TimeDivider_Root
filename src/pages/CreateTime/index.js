import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import * as S from './style'
import NavBar from 'shared/components/NavBar'
import Text from 'shared/components/Text'
import Button from 'shared/components/Button'
import Select from 'shared/components/Select'

const HOUR_NUMBERS = Array.from({ length: 24 }, (_, i) => {
	return { label: `${i}`, value: i }
})

const MINUTE_NUMBERS = Array.from({ length: 6 }, (_, i) => {
	return { label: `${i * 10}`, value: i * 10 }
})

const TIME_TYPE = Object.freeze({
	HOUR: 'hour',
	MINUTE: 'minute',
})

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateTime = () => {
	const [spareTime, setSpareTime] = useState({ [TIME_TYPE.HOUR]: '0', [TIME_TYPE.MINUTE]: '0' })
	const isValidSpareTime = useMemo(
		() => spareTime.hour !== '0' || spareTime.minute !== '0',
		[spareTime],
	)

	const handleSpareTime = e => {
		const { name, value } = e.target
		setSpareTime({ ...spareTime, [name]: value })
	}

	return (
		<S.Wrapper>
			<NavBar backIcon />

			<S.SubTitle>
				<Text size={2.2} textAlign={'start'}>
					오늘 사용할 수 있는 시간은 얼마인가요?
				</Text>
			</S.SubTitle>

			<S.Section>
				<Select
					name={'hour'}
					data={HOUR_NUMBERS}
					style={{ width: '10rem' }}
					onChange={handleSpareTime}
				/>
				<Text size={2}>시간</Text>
				<Select
					name={'minute'}
					data={MINUTE_NUMBERS}
					style={{ width: '10rem' }}
					onChange={handleSpareTime}
				/>
				<Text size={2}>분</Text>
			</S.Section>

			<S.ButtonArea>
				<Link to="/createTask" state={{ spareTime }}>
					<Button disabled={!isValidSpareTime}>
						{!isValidSpareTime ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</S.ButtonArea>
		</S.Wrapper>
	)
}

export default CreateTime
