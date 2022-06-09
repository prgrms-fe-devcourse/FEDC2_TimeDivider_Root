import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes'

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => (
					<Route path={route.path} key={route.path} element={<route.view />} />
				))}
			</Routes>
		</BrowserRouter>
	)
}
export default AppRouter
