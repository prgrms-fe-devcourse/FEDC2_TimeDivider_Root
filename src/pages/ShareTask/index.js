import React from 'react'
import apis from 'shared/api'
import { BottomBar } from 'shared/components/BottomBar'
import NavBar from 'shared/components/NavBar'
import TaskCard from 'shared/components/TaskCard'
import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import styled from 'styled-components'

//Post get 요청 채널의 모든게시물
const postsList = [
	{
		//"likes": Like[],
		//"comments": Comment[],
		_id: '1',
		image: 'Optional',
		imagePublicId: 'Optional',
		title: 'String',
		tasks: [
			{
				id: 1,
				name: '타입스크립트 부시기',
			},
			{
				id: 2,
				name: '1일 1CSS',
			},
			{
				id: 3,
				name: '로그인 페이지',
			},
		],
		channel: 'Channel',
		author: '신다혜',
		createdAt: 'String',
		updatedAt: 'String',
	},
	{
		//"likes": Like[],
		//"comments": Comment[],
		_id: '2',
		image: 'Optional',
		imagePublicId: 'Optional',
		title: 'String',
		tasks: [
			{
				id: 1,
				name: '졸업 프로젝트',
			},
			{
				id: 2,
				name: 'Timer Component 만들기',
			},
			{
				id: 3,
				name: '제로베이스 과제',
			},
		],
		channel: 'Channel',
		author: '김경현',
		createdAt: 'String',
		updatedAt: 'String',
	},
	{
		//"likes": Like[],
		//"comments": Comment[],
		_id: '3',
		image: 'Optional',
		imagePublicId: 'Optional',
		title: 'String',
		tasks: [
			{
				id: 1,
				name: '놀기',
			},
			{
				id: 2,
				name: '쉬기',
			},
			{
				id: 3,
				name: '잠자기',
			},
		],
		channel: 'Channel',
		author: '이지원',
		createdAt: 'String',
		updatedAt: 'String',
	},
]

const ShareTask = () => {
	return (
		<div>
			<NavBar>할 일 공유</NavBar>
			<CardArea>
				{postsList.map(post => (
					<TaskCard key={post._id} author={post.author} tasks={post.tasks} />
				))}
			</CardArea>
			<ButtonArea>
				<BottomBar />
			</ButtonArea>
		</div>
	)
}

export default ShareTask

const CardArea = styled.div`
	position: relative;
	width: 100%;
	height: 66.5rem;
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

const ButtonArea = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
`
