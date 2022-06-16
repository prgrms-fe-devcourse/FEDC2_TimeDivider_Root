import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useNavigation = cb => {
	const navigate = useNavigate()
	const location = useLocation()
	useEffect(() => {
		try {
			cb()
		} catch {
			navigate('/home')
		}
	}, [location, navigate])
}

export default useNavigation
