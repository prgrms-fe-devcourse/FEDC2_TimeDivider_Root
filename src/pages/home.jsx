import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
	return (
		<>
			<h2>Home</h2>
			<p>첫 화면 - 프로젝트 명</p>
			<Link to="/createTime">시작하기</Link>
		</>
	)
}

export default home
