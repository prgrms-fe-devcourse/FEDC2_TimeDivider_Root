import { Link } from 'react-router-dom'

import * as S from './style'
import Button from 'shared/components/Button'
import Text from 'shared/components/Text'
import Logo from '../../shared/components/Logo'

const Home = () => {
	return (
		<S.Wrapper>
			<S.LogoWrapper>
				<Logo size={'MEDIUM'} />
			</S.LogoWrapper>
			<S.SubTitle>
				<Text size={3.2} fontWeight={300}>
					당신의 시간을 분배하세요
				</Text>
			</S.SubTitle>

			<S.ButtonArea>
				<Link to="/createSpareTime">
					<Button>시작하기</Button>
				</Link>
			</S.ButtonArea>
		</S.Wrapper>
	)
}

export default Home
