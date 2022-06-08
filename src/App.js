import styled from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import AppRouter from './routes/router'

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Container>
				<AppRouter />
			</Container>
		</>
	)
}

export default App

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	align-items: center;
	width: 100%;
	max-width: 420px;
	height: 100vh;
	margin: auto;
	padding: 0;
	overflow: hidden;
	background-color: #f1f0f7;
`
