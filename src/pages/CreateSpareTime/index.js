import React from 'react'
import { Link } from 'react-router-dom'

import * as S from './style'
import NavBar from 'shared/components/NavBar'
import Button from 'shared/components/Button'
import SubTitle from 'shared/components/SubTitle'
import TimeSelectForm from './components/TimeSelecForm'
import useCreatingTimers from 'shared/hooks/useCreatingTimers'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '시간을 입력해주세요',
})

const CreateTime = () => {
	const { spareTime, updateSpareTime, isValidSpareTime } = useCreatingTimers()

	return (
		<S.Wrapper>
			<NavBar backIcon />
			<SubTitle>오늘 사용할 수 있는 시간은 얼마인가요?</SubTitle>
			<TimeSelectForm intialTime={spareTime} handleChangeTime={updateSpareTime}></TimeSelectForm>
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
