import styled, { css } from 'styled-components'
import { colors } from '../../../shared/constants/colors' //css 추가

const Divider = props => {
	return <StyledDivider {...props} />
}

const StyledDivider = styled.div`
	border: none;
	background-color: ${colors.timeoutDarkGray};
	${props =>
		(props.type === 'vertical' &&
			css`
				position: relative;
				top: -1px;
				display: inline-block;
				width: 1px;
				height: 13px;
				vertical-align: middle;
			`) ||
		(props.type === 'horizontal' &&
			css`
				display: block;
				width: 33.3rem;
				height: 1px;
				margin-top: 2rem;
				margin-bottom: 1.5rem;
			`)}
`

export default Divider
