import React from 'react'
import { Link } from 'react-router-dom'

const createTime = () => {
	return (
		<>
			<h2>오늘의 시간</h2>
			<Link to="/createTodo">다음으로</Link>
		</>
	)
}

export default createTime
