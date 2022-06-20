import React, { useState } from 'react'
import { colors, themeColors } from '../../shared/constants/colors'
import Text from '../../shared/components/Text'
import { ToggleButton } from '../../shared/components/ToggleButton'
import {
	Avatar,
	BottomBarArea,
	Icon,
	LogOut,
	LogOutWrapper,
	Profiles,
	Setting,
	Settings,
	Title,
	Wrapper,
} from './style'
import { BottomBar } from '../../shared/components/BottomBar'
import { IoIosArrowForward } from 'react-icons/io'
import Button from '../../shared/components/Button'
import { Link } from 'react-router-dom'

const dummyUser = {
	profileImg: 'https://tva1.sinaimg.cn/large/e6c9d24egy1h3bief308rj20dw0dwwem.jpg',
	name: '김경현',
	email: 'codeisneverodd@gmail.com',
	shareAllowed: false,
}
const MyPage = () => {
	const [user, setUser] = useState(dummyUser)
	const handleToggle = toggled => {
		const newUser = Object.assign({}, user)
		newUser.shareAllowed = toggled
		setUser(newUser)
	}
	const handleLogOut = () => {
		//로그아웃 액션
	}
	return (
		<Wrapper>
			<LogOutWrapper>
				<LogOut as={Link} onClick={handleLogOut} to={'/selectUserType'}>
					로그아웃
				</LogOut>
			</LogOutWrapper>
			<Profiles>
				<Avatar src={user.profileImg} alt="avatar" size={10.5} />
				<Text size={2.2}>{user.name}</Text>
				<Text size={1.3} color={themeColors.fontDescription}>
					{user.email}
				</Text>
			</Profiles>
			<Settings>
				<Setting>
					<Icon size={2}>📋</Icon>
					<Title size={1.5}>게시판 공유 허용</Title>
					<ToggleButton width={4.8} height={2.5} onToggle={handleToggle} />
				</Setting>
				<Setting>
					<Icon size={2}>😎</Icon>
					<Title size={1.5}>개인정보 수정</Title>
					<IoIosArrowForward size={'2rem'} />
				</Setting>
			</Settings>
			<BottomBarArea>
				<BottomBar />
			</BottomBarArea>
		</Wrapper>
	)
}

export default MyPage
