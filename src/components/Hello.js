const Hello = ({ children = 'Time Divider' }) => {
	const helloStyle = {
		textAlign: 'center',
	}

	return <h1 style={helloStyle}>Hello {children}</h1>
}

export default Hello
