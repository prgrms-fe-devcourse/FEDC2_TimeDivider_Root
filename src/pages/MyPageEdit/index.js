import NavBar from '../../shared/components/NavBar'
import { Profiles, Setting, Settings } from '../MyPage'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../shared/hooks/useUser'
import Avatar from '../../shared/components/Avatar'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { colors, themeColors } from '../../shared/constants/colors'

const MyPageEdit = () => {
	const { user, changeName, changeImage } = useUser()
	const [isLoading, setIsLoading] = useState(false)
	const [edited, setEdited] = useState(false)
	const [fullName, setFullName] = useState(user.fullName)

	const navigate = useNavigate()
	const [image, setImage] = useState({
		file: '',
		preview_URL: user.image,
	})

	useEffect(() => {
		if (fullName !== user.fullName || image.preview_URL !== user.image) {
			setEdited(true)
		} else {
			setEdited(false)
		}
	}, [fullName, image, user.fullName, user.image])

	const handleNameInput = e => {
		setFullName(e.target.value)
	}
	const handleImageChange = async e => {
		e.preventDefault()
		const reader = new FileReader()
		const file = e.target.files[0]
		if (file) {
			reader.readAsDataURL(file)
		}
		reader.onload = () => {
			setImage({
				file,
				preview_URL: reader.result,
			})
		}
	}

	const handleDone = async e => {
		e.preventDefault()
		if (!edited) return
		setIsLoading(true)
		await changeName(fullName)
		if (image.file !== '') await changeImage(image.file)
		setIsLoading(false)
		navigate('/myPage')
	}

	return (
		<Wrapper>
			<NavBar backIcon />
			<Done edited={edited} onClick={handleDone}>
				{isLoading ? '업로드중..' : '완료'}
			</Done>
			<Profiles>
				<Avatar src={image.preview_URL} alt="avatar" size={10.5} />
			</Profiles>
			<Settings>
				<Setting>
					<Title size={1.5}>프로필</Title>
					<ImageInput type={'file'} accept={'image/*'} onChange={handleImageChange} />
				</Setting>
				<Setting>
					<Title size={1.5}>이름</Title>
					<Input value={fullName} onInput={handleNameInput} />
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

const ImageInput = styled(Input)``
