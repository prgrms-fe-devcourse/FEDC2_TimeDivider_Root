import React, { useEffect } from 'react'
import { themeColors } from '../../shared/constants/colors'
import Text from '../../shared/components/Text'
import {
	BottomBarArea,
	Description,
	Icon,
	LogOut,
	LogOutWrapper,
	NotLoggedInWrapper,
	Profiles,
	Setting,
	Settings,
	Title,
	Wrapper,
} from './style'
import { BottomBar } from '../../shared/components/BottomBar'
import { IoIosArrowForward } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../shared/hooks/useUser'
import Avatar from '../../shared/components/Avatar'
import Button from '../../shared/components/Button'

const MyPage = () => {
	const { user, isLoggedIn, logout, refreshUser } = useUser()
	const navigate = useNavigate()

	useEffect(() => {
		refreshUser()
	}, [])
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
						<Text size={2.2}>마이페이지를 이용하려면 로그인 하여야합니다.</Text>
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
