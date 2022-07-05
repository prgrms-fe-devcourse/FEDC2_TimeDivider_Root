import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Text, Logo } from 'shared/components'

const Home = () => {
	return (
		<Wrapper>
			<LogoWrapper>
				<Logo size={'MEDIUM'} />
			</LogoWrapper>
			<SubTitle>
				<Text size={3.2} fontWeight={300}>
					당신의 시간을 분배하세요
				</Text>
			</SubTitle>

			<ButtonArea>
				<Link to="/createSpareTime">
					<Button>시작하기</Button>
				</Link>
			</ButtonArea>
		</Wrapper>
	)
}

export default Home

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	padding: 3.3rem;
`

export const SubTitle = styled.span`
	margin-top: 2rem;
	width: 20rem;
	font-weight: 300;
	line-height: 4.6rem;
	text-align: center;
	height: 23.2rem;
`

export const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`
export const LogoWrapper = styled.div`
	margin-top: 15rem;
`
