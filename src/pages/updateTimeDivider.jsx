import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
const UpdateTimeDivider = () => {
	const dummyData = [
		{ id: '123', name: '밥 묵자', time: 1234 },
		{ id: '234', name: '치킨 묵자', time: 3221 },
		{ id: '345', name: '피자 묵자', time: 4432 },
		{ id: '456', name: '삼겹살 묵자', time: 4556 },
		{ id: '567', name: '홍차 마시자', time: 14432 },
		{ id: '678', name: '잠이나 자자', time: 44322 },
	]
	return (
		<>
			<NavBar backIcon>모래시계 편집하기</NavBar>
			<Link to="/doneTodo">완료하기</Link>
			<Link to="/addTodo">추가하기</Link>
			<TimerArea>
				{dummyData.map(({ id, name, time }, index) => (
					<Timer
						key={index}
						id={id}
						onClick={() => {
							console.log(id)
						}}
					>
						<Name>{name}</Name>
						<Time>{time}</Time>
					</Timer>
				))}
			</TimerArea>
		</>
	)
}

export default UpdateTimeDivider

const TimerArea = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
	height: 30rem;
`
const Timer = styled.div`
	width: 8rem;
	height: 8rem;
	background-color: antiquewhite;
	border: 1px solid black;
	text-align: center;
`
const Time = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50%;
`
const Name = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50%;
`
