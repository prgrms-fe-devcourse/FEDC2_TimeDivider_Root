import GlobalStyle from 'styles/GlobalStyle'
import AppRouter from 'pages/router'
import { RecoilRoot } from 'recoil'
import { AppLayout } from './shared/layout'

const App = () => (
	<RecoilRoot>
		<GlobalStyle />
		<AppLayout>
			<AppRouter />
		</AppLayout>
	</RecoilRoot>
)

export default App
