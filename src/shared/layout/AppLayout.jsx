import styled from 'styled-components'
import { colors } from 'shared/constants/colors'

const AppLayout = ({ children }) => (
	<Wrapper>
		<AppOuter>
			<Logo src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3h1vnh9s1j20jj0jjt9o.jpg" />
			<Description>
				당신의 하루를 <br />
				분배하고 나눠요
			</Description>
			<Title>타임 디바이더</Title>
			<DownloadButton
				target="_blank"
				href={'https://github.com/prgrms-fe-devcourse/FEDC2_TimeDivider_Root'}
			>
				다운로드
			</DownloadButton>
		</AppOuter>
		<AppContainer>{children}</AppContainer>
	</Wrapper>
)

export default AppLayout

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 20rem;
`
const AppContainer = styled.div`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	box-sizing: border-box;
	align-items: center;
	padding: 0;
	overflow: hidden;
	max-width: 375px;
	height: 812px;
	box-shadow: 0 0 2rem 0.1rem rgba(0, 0, 0, 0.2);
	background-color: ${colors.background};

	@media screen and (max-width: 700px) {
		max-width: 100vw;
		height: 100vh;
	}
	@media screen and (max-height: 812px) {
		margin: 0;
		height: 100vh;
		box-shadow: none;
	}
`
const AppOuter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	height: 50rem;
	@media screen and (max-width: 1200px) {
		display: none;
	}
	@media screen and (max-height: 812px) {
		display: none;
	}
`
const Logo = styled.img`
	width: 15rem;
	height: 15rem;
`

const Description = styled.div`
	line-height: 1.2;
	font-size: 2.2rem;
	margin-bottom: 1rem;
	margin-top: 3rem;
	font-weight: 200;
`

const Title = styled.div`
	font-size: 3rem;
	font-weight: 700;
	margin-top: 1rem;
`
const DownloadButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
	border: 1px solid #4880ee;
	width: 17rem;
	height: 5rem;
	margin-top: 3rem;
	color: #4880ee;
	font-size: 1.5rem;
	border-radius: 1rem;
	&:hover {
		background-color: #4880ee;
		color: #ffffff;
	}
`
