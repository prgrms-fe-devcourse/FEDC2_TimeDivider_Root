import styled from 'styled-components'

import Text from './Text'
import { colors } from 'shared/constants/colors'

export const SubTitle = ({ description, children }) => {
	return (
		<StyledSubTitle>
			<Text block={true} size={2.2} textAlign={'start'}>
				{children}
			</Text>
			<Text block={true} size={1.3} textAlign={'start'} color={colors.lightGray}>
				{description}
			</Text>
		</StyledSubTitle>
	)
}

export const StyledSubTitle = styled.div`
	position: relative;
	left: -2.5rem;
	width: 100%;
	align-items: flex-start;
	width: 24.5rem;
	line-height: 3.2rem;
	text-align: center;
`
export default SubTitle
