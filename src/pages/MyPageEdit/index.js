import styled from 'styled-components'
import NavBar from '../../shared/components/NavBar'
import { colors, themeColors } from '../../shared/constants/colors'
import { Avatar, LogOut, LogOutWrapper, Profiles, Setting, Settings } from '../MyPage/style'
import React, { useEffect, useState } from 'react'
import Text from '../../shared/components/Text'
import { useUser } from '../../shared/hooks/useUser'
import { Link } from 'react-router-dom'

const MyPageEdit = () => {
	const { user, changeName, changeEmail } = useUser()
	const [edited, setEdited] = useState(false)
	const [initialUser, setInitialUser] = useState(user)
	useEffect(() => {
		if (user.name !== initialUser.name || user.email !== initialUser.email) {
			setEdited(true)
		} else {
			setEdited(false)
		}
	}, [user])

	const handleNameInput = e => {
		changeName(e.target.value)
	}
	const handleEmailInput = e => {
		changeEmail(e.target.value)
	}
	const handleDone = e => {
		e.preventDefault()
		console.log('done')
	}
	return (
		<Wrapper>
			<NavBar backIcon />
			<Done edited={edited}>완료</Done>
			<Profiles>
				<Avatar src={user.profileImg} alt="avatar" size={10.5} />
			</Profiles>
			<Settings>
				<Setting>
					<Title size={1.5}>이름</Title>
					<Input value={user.name} onInput={handleNameInput} />
				</Setting>
				<Setting>
					<Title size={1.5}>이메일</Title>
					<Input value={user.email} onInput={handleEmailInput} />
				</Setting>
			</Settings>
		</Wrapper>
	)
}

export default MyPageEdit

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background-color: ${themeColors.labelBackground};
`
const Input = styled.input`
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	align-items: center;
	font-size: 1.5rem;
	flex: 1;
`
const Title = styled.div`
	width: 6rem;
	font-size: 1.5rem;
`

const Done = styled.div`
	position: absolute;
	top: 3rem;
	right: 1.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 8.2rem;
	height: 2.6rem;
	border-radius: 0.6rem;
	font-size: 1.6rem;
	font-weight: ${props => (props.edited ? 700 : 400)};
	color: ${props => (props.edited ? themeColors.primary : colors.timeoutDarkGray)};
`
