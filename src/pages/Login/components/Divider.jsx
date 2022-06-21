import styled, { css } from 'styled-components' //css 추가

const Divider = props => {
	return <StyledDivider {...props} />
}

const StyledDivider = styled.hr`
	border: none;
	background-color: #aaa;
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
				width: 100%;
				height: 1px;
			`)}
`

export default Divider
