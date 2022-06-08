import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'
import Button from '../components/Button'
import Text from '../components/Text'
import { IoIosHourglass } from 'react-icons/io'

const Home = () => {
	return (
		<>
			<Title>
				<Text style={{ fontSize: '2rem' }}>일 모래시계</Text>
			</Title>

			<HourGlass>
				<IoIosHourglass></IoIosHourglass>
			</HourGlass>

			<Text style={{ fontSize: '2rem' }}>시간을 관리해보세요!</Text>

			<ButtonArea>
				<Link to="/createTime">
					<Button>시작하기</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default Home

const Title = styled.h2`
	padding: 2rem;
`

const HourGlass = styled.span`
	height: 50vh;
	font-size: 30vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ButtonArea = styled.div`
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`