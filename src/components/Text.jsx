const Text = ({ children, block, paragraph, size, strong, color, ...props }) => {
	const Tag = block ? 'div' : paragraph ? 'p' : 'span'
	const fontStyle = {
		fontWeight: strong ? 'bold' : undefined,
		fontSize: `${size}rem`,
		color: color,
	}

	return (
		<Tag style={{ ...props.style, ...fontStyle }} {...props}>
			{children}
		</Tag>
	)
}

export default Text
