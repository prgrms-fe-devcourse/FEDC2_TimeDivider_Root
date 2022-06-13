import { Link } from 'react-router-dom'
import logo from 'assets/images/logoTimeDivider.png'
import styled from 'styled-components'
import Button from 'shared/components/Button'
import Text from 'shared/components/Text'

const Home = () => {
	return (
		<Wrapper>
			<Logo src={logo}></Logo>

			<SubTitle>
				<Text size={3.2}>당신의 시간을 분배하세요</Text>
			</SubTitle>

			<Link to="/createTime">
				<Button>시작하기</Button>
			</Link>
		</Wrapper>
	)
}

export default Home

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: flex-end;
	padding: 3.3rem;
`

const Logo = styled.img`
	position: absolute;
	left: 7rem;
	top: 17.4rem;
	height: 23.2rem;
	width: 22.8rem;
`

const SubTitle = styled.span`
	display: flex;
	align-items: center;
	margin: 0 8rem;
	line-height: 4.6rem;
	text-align: center;
	height: 23.2rem;
`
