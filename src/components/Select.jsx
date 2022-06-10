import styled from 'styled-components'

const Wrapper = styled.div`
	display: ${({ block }) => (block ? 'block' : 'inline-block')};
`

const Label = styled.label`
	display: block;
	font-size: 12px;
`

const StyledSelect = styled.select`
	width: 100%;
	padding: 4px 8px;
	border: 1px solid ${({ invalid }) => (invalid ? 'red' : 'gray')};
	border-radius: 4px;
	box-sizing: border-box;
`

const Select = ({
	data,
	label,
	placeholder,
	block = false,
	invalid = false,
	required = false,
	disabled = false,
	wrapperProps,
	...props
}) => {
	// 1. String
	// 2. Object { label: string, value: string }

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
			<StyledSelect invalid={invalid} required={required} disabled={disabled} {...props}>
				{options}
			</StyledSelect>
		</Wrapper>
	)
}

export default Select
