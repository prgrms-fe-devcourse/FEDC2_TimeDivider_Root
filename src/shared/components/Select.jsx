import { colors } from 'shared/constants/colors'
import styled from 'styled-components'

const Select = ({
	data,
	label,
	style,
	placeholder,
	block = false,
	invalid = false,
	required = false,
	disabled = false,
	wrapperProps,
	...props
}) => {
	const formattedData = data.map(item =>
		typeof item === 'string' ? { label: item, value: item } : item,
	)

	const options = formattedData.map(item => (
		<option key={item.value} value={item.value}>
			{item.label}
		</option>
	))

	if (placeholder) {
		options.unshift(
			<option key="placeholder" value="" hidden>
				{placeholder}
			</option>,
		)
	}

	return (
		<Wrapper block={block} {...wrapperProps}>
			<Label>{label}</Label>
			<StyledSelect
				style={style}
				invalid={invalid}
				required={required}
				disabled={disabled}
				{...props}
			>
				{options}
			</StyledSelect>
		</Wrapper>
	)
}

export default Select

const Wrapper = styled.div`
	display: ${({ block }) => (block ? 'block' : 'inline-block')};
	border-bottom: 1px solid ${colors.tossBlue};
`

const Label = styled.label`
	display: block;
	font-size: 1.5rem;
`

const StyledSelect = styled.select`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: none;
	width: 100%;
	padding: 0.8rem 1rem;
	outline: none;
	border-radius: 0;
	margin: 0;
	border-radius: 4px;
	box-sizing: border-box;
`
