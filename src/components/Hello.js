const Hello = ({ children = 'Jiwon' }) => {
	const helloStyle = {
		textAlign: 'center',
	}

	return <h1 style={helloStyle}>Hello {children}</h1>
}

export default Hello
