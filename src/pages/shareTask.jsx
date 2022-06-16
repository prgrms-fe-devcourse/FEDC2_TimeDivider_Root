import React from 'react'
import NavBar from 'shared/components/NavBar'
import TaskCard from 'shared/components/TaskCard'
import styled from 'styled-components'

const ShareTask = () => {
	return (
		<div>
			<NavBar>할 일 공유</NavBar>
			<CardArea>
				<TaskCard />
				<TaskCard />
				<TaskCard />
				<TaskCard />
				<TaskCard />
			</CardArea>

			<ButtonArea>
				<TempMenu />
			</ButtonArea>
		</div>
	)
}

export default ShareTask

const CardArea = styled.div`
	position: relative;
	width: 100%;
	height: 60rem;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 1rem;
	box-sizing: border-box;

	::-webkit-scrollbar {
		display: none;
	}
`

const TempMenu = styled.div`
	width: 100%;
	height: 10rem;
	background-color: gray;
`

const ButtonArea = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
`
