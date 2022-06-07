import styled from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
const App = () => {
	return (
		<>
			<GlobalStyle />
			<Container>
				<div className="App">
					<h2>Hello Time Divider</h2>
				</div>
			</Container>
		</>
	)
}

export default App

const Container = styled.div`
	width: 100%;
	max-width: 420px;
	height: 100vh;
	margin: auto;
	padding: 0;
	overflow: hidden;
	background-color: #f1f0f7;
`
