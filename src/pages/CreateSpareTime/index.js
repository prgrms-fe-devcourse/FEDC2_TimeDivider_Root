import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import * as S from './style'
import NavBar from 'shared/components/NavBar'
import Text from 'shared/components/Text'
import Button from 'shared/components/Button'
import Select from 'shared/components/Select'
import { TIME_TYPE, useCreatingTimers } from '../../shared/hooks/useCreatingTimers'

const HOUR_NUMBERS = Array.from({ length: 24 }, (_, i) => {
	return { label: `${i}`, value: i }
})

const MINUTE_NUMBERS = Array.from({ length: 6 }, (_, i) => {
	return { label: `${i * 10}`, value: i * 10 }
})

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateSpareTime = () => {
	const { spareTime, updateSpareTime } = useCreatingTimers()

	const isValidSpareTime = useMemo(
		() => spareTime.hour !== '0' || spareTime.minute !== '0',
		[spareTime],
	)

	const handleSpareTimeChange = e => {
		const { name, value } = e.target
		updateSpareTime(name, value)
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
					onChange={handleSpareTimeChange}
					value={spareTime[TIME_TYPE.HOUR]}
				/>
				<Text size={2}>시간</Text>
				<Select
					name={'minute'}
					data={MINUTE_NUMBERS}
					value={spareTime[TIME_TYPE.MINUTE]}
					style={{ width: '10rem' }}
					onChange={handleSpareTimeChange}
				/>
				<Text size={2}>분</Text>
			</S.Section>

			<S.ButtonArea>
				<Link to="/createNameIds">
					<Button disabled={!isValidSpareTime}>
						{!isValidSpareTime ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</S.ButtonArea>
		</S.Wrapper>
	)
}

export default CreateSpareTime
