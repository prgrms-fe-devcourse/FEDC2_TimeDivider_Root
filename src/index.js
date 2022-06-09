import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RecoilRoot } from 'recoil'
import { DebugObserver } from './components/DebugObserver'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<DebugObserver />
			<App />
		</RecoilRoot>
	</React.StrictMode>,
)
