import React from 'react'
import NavBar from 'shared/components/NavBar'
import TaskCard from 'shared/components/TaskCard'
import styled from 'styled-components'
import { BottomBar } from '../../shared/components/BottomBar'

//채널의 포스트리스트 및 좋아요를 받아서 대체
const tasks = [
	{
		id: 1,
		task: 'gogo',
	},
	{
		id: 2,
		task: 'gogo',
	},
	{
		id: 3,
		task: 'gogo',
	},
	{
		id: 4,
		task: 'gogo',
	},
]
const ShareTask = () => {
	return (
		<div>
			<NavBar>할 일 공유</NavBar>
			<CardArea>
				<TaskCard tasks={tasks} />
				<TaskCard tasks={tasks} />
				<TaskCard tasks={tasks} />
				<TaskCard tasks={tasks} />
				<TaskCard tasks={tasks} />
			</CardArea>

			<BottomBarArea>
				<BottomBar />
			</BottomBarArea>
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

// const TempMenu = styled.div`
// 	width: 100%;
// 	height: 10rem;
// 	background-color: gray;
// `
//
// const ButtonArea = styled.div`
// 	position: absolute;
// 	width: 100%;
// 	left: 0;
// 	bottom: 0;
// `
export const BottomBarArea = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
`
