import React from 'react'
import { Link } from 'react-router-dom'

export const CreateTimeDivider = () => {
	return (
		<>
			<h2>시간을 분배해요</h2>
			<Link to="/updateDivider">다음으로</Link>
		</>
	)
}

export default CreateTimeDivider
