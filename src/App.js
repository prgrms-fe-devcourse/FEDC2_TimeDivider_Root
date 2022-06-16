import GlobalStyle from './styles/GlobalStyle'
import AppRouter from './routes/router'
import { RecoilRoot } from 'recoil'

const App = () => (
	<RecoilRoot>
		<GlobalStyle />
		<AppRouter />
	</RecoilRoot>
)

export default App
