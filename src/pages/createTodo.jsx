import React from 'react'
import { Link } from 'react-router-dom'

export const createTodo = () => {
	return (
		<>
			<h2>해야 할 일을 적어요</h2>
			<Link to="/createTimeDivider">다음으로</Link>
		</>
	)
}

export default createTodo
