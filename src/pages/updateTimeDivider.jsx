import React from 'react'
import { Link } from 'react-router-dom'

const UpdateTimeDivider = () => {
	return (
		<>
			<h2>모래시계 편집하기</h2>
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
		</>
	)
}

export default UpdateTimeDivider
