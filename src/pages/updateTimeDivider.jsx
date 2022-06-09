import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const UpdateTimeDivider = () => {
	const location = useLocation()
	console.log(location)
	return (
		<>
			<h2>모래시계 편집하기</h2>
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
		</>
	)
}

export default UpdateTimeDivider
