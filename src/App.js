import GlobalStyle from 'styles/GlobalStyle'
import AppRouter from 'pages/router'
import { RecoilRoot } from 'recoil'

const App = () => (
	<RecoilRoot>
		<GlobalStyle />
		<AppRouter />
	</RecoilRoot>
)

export default App
