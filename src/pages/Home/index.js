import { Link } from 'react-router-dom'
import logo from 'assets/images/logoTimeDivider.png'

import * as S from './style'

import Button from 'shared/components/Button'
import Text from 'shared/components/Text'

const Home = () => {
	return (
		<S.Wrapper>
			<S.Logo src={logo}></S.Logo>

			<S.SubTitle>
				<Text size={3.2}>당신의 시간을 분배하세요</Text>
			</S.SubTitle>

			<S.ButtonArea>
				<Link to="/createTime">
					<Button>시작하기</Button>
				</Link>
			</S.ButtonArea>
		</S.Wrapper>
	)
}

export default Home