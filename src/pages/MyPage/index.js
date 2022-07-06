import React, { useEffect } from 'react'
import { colors, themeColors } from 'shared/constants/colors'
import { Avatar, Button, BottomBar, Text } from 'shared/components'
import { IoIosArrowForward } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from 'shared/hooks'
import styled from 'styled-components'

const MyPage = () => {
	const { user, isLoggedIn, logout, refreshUser } = useUser()
	const navigate = useNavigate()

	useEffect(() => {
		refreshUser()
	}, [refreshUser])

	const handleLogOut = async () => {
		const { isSuccess, message } = await logout()
		if (isSuccess) {
			alert(message)
			navigate('/')
		}
	}
	const handleLogin = () => {
		navigate('/')
	}
	return (
		<Wrapper>
			{!isLoggedIn && (
				<NotLoggedInWrapper>
					<Description>
						<Text style={{ wordBreak: 'keep-all', fontSize: '2.2rem', lineHeight: '1.5' }}>
							마이페이지를 이용하려면 로그인하여야합니다.
						</Text>
					</Description>
					<Button onClick={handleLogin}>로그인 페이지로 이동</Button>
				</NotLoggedInWrapper>
			)}
			{isLoggedIn && (
				<>
					<LogOutWrapper>
						<LogOut onClick={handleLogOut}>로그아웃</LogOut>
					</LogOutWrapper>
					<Profiles>
						<Avatar src={user.image} alt="avatar" size={10.5} />
						<Text size={2.2}>{user.fullName}</Text>
						<Text size={1.3} color={themeColors.fontDescription}>
							{user.email}
						</Text>
					</Profiles>
					<Settings>
						<Setting as={Link} to={'/myPageEdit'}>
							<Icon size={2}>😎</Icon>
							<Title size={1.5}>개인정보 수정</Title>
							<IoIosArrowForward size={'2rem'} />
						</Setting>
					</Settings>
				</>
			)}
			<BottomBarArea>
				<BottomBar />
			</BottomBarArea>
		</Wrapper>
	)
}

export default MyPage

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background-color: ${themeColors.labelBackground};
`
export const Profiles = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 2.7rem;
	flex-direction: column;
	align-items: center;
	row-gap: 1rem;
`

export const Settings = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 1rem;
	width: 100%;
`
export const Setting = styled.div`
	box-sizing: border-box;
	display: flex;
	column-gap: 1rem;
	width: 33.3rem;
	height: 5rem;
	border-radius: 1.1rem;
	align-items: center;
	padding: 1.5rem;
	background-color: ${colors.white};
`
const Icon = styled(Text)`
	display: block;
	width: 2rem;
	height: 2rem;
`
const Title = styled(Text)`
	display: block;
	flex: 1;
`
const BottomBarArea = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
`
const LogOutWrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	width: 100%;
	justify-content: end;
	margin-top: 2.4rem;
	margin-bottom: 3.6rem;
	padding-right: 2.1rem;
`
const LogOut = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 8.2rem;
	height: 2.6rem;
	border-radius: 0.6rem;
	font-size: 1.3rem;
	background-color: ${colors.white};
	color: ${colors.red};
	cursor: pointer;
`

export const Description = styled.div`
	width: 24.2rem;
	height: 9rem;
	text-align: center;
	margin-top: 15.6rem;
	margin-bottom: 13.6rem;
`
export const NotLoggedInWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
`
