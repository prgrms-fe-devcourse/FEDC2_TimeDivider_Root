import { colors } from 'shared/constants/colors'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Select = ({
	data,
	label,
	fontSize = 2.4,
	placeholder,
	block = false,
	invalid = false,
	required = false,
	disabled = false,
	...props
}) => {
	const formattedData = data.map(item =>
		typeof item === 'string' ? { label: item, value: item } : item,
	)

	const options = formattedData.map(item => (
		<StyledOption key={item.value} value={item.value}>
			{item.label}
		</StyledOption>
	))

	if (placeholder) {
		options.unshift(
			<StyledOption key="placeholder" value="" hidden>
				{placeholder}
			</StyledOption>,
		)
	}

	return (
		<Wrapper block={block}>
			<Label>{label}</Label>
			<StyledSelect
				{...props}
				{...props.style}
				fontSize={fontSize}
				invalid={invalid}
				required={required}
				disabled={disabled}
			>
				{options}
			</StyledSelect>
		</Wrapper>
	)
}

Select.propTypes = {
	fontSize: PropTypes.number,
	backgroundColor: PropTypes.string,
	placeholder: PropTypes.string,
	block: PropTypes.bool,
	invalid: PropTypes.bool,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
}

export default Select

const Wrapper = styled.div`
	display: ${({ block }) => (block ? 'block' : 'inline-block')};
	border-bottom: 1px solid ${colors.blue};
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
	font-size: ${props => `${props.fontSize}rem`};
	width: 100%;
	padding: 0.8rem 1rem;
	outline: none;
	border-radius: 0;
	margin: 0;
	border-radius: 4px;
	box-sizing: border-box;
	text-align: center;
`

const StyledOption = styled.option`
	font-size: 1rem;
`
