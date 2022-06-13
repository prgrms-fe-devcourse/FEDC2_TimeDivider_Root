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
`

const Label = styled.label`
	display: block;
	font-size: 1.5rem;
`

const StyledSelect = styled.select`
	width: 100%;
	padding: 0.5rem 0.8rem;
	margin: 0.5rem 0;
	border: ${({ invalid }) => (invalid ? '0.1rem solid red' : '0.1rem solid #00dfab')};
	border-radius: 4px;
	box-sizing: border-box;
`
