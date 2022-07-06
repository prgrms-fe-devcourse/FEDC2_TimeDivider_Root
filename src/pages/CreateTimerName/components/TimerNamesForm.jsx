import React from 'react'
import { Button, Input } from 'shared/components'
import styled from 'styled-components'

const TimerNamesForm = ({ onSubmit, value, onChange }) => {
	return (
		<Form onSubmit={onSubmit}>
			<Input
				type="text"
				value={value}
				onChange={e => onChange(e.target.value)}
				autoFocus={true}
				required
			/>
			<Button width={7.9} height={3.9} fontSize={1.6}>
				추가
			</Button>
		</Form>
	)
}

export default TimerNamesForm

export const Form = styled.form`
	display: flex;
	gap: 2rem;
`
