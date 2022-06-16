import PropTypes from 'prop-types'

const Text = ({ children, block, size, strong, color, textAlign, ...props }) => {
	const Tag = block ? 'div' : 'span'
	const fontStyle = {
		fontWeight: strong ? 'bold' : undefined,
		fontSize: `${typeof size === 'number' ? `${size}rem` : size}`,
		color,
		textAlign,
	}

	return (
		<Tag style={{ ...props.style, ...fontStyle }} {...props}>
			{children}
		</Tag>
	)
}

Text.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	block: PropTypes.bool,
	color: PropTypes.string,
}

export default Text
