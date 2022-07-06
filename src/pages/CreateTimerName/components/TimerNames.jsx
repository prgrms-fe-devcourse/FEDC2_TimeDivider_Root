import React from 'react'
import styled from 'styled-components'
import { Badge } from 'shared/components'

const TimerNames = ({ items, remove }) => {
	return (
		<Wrapper>
			<Area>
				{items.map(({ id, name }) => (
					<Badge key={id} onClick={() => remove(id)}>
						{name}
					</Badge>
				))}
			</Area>
		</Wrapper>
	)
}

export default TimerNames

export const Wrapper = styled.div`
	height: 20rem;
	overflow-y: scroll;
`

export const Area = styled.div`
	position: relative;
	width: 30rem;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	margin-bottom: 2rem;
`
