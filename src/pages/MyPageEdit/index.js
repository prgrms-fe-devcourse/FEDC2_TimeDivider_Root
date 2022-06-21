import NavBar from '../../shared/components/NavBar'
import { Profiles, Setting, Settings } from '../MyPage/style'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../shared/hooks/useUser'
import { Done, ImageInput, Input, Title, Wrapper } from './style'
import Avatar from '../../shared/components/Avatar'

import { useNavigate } from 'react-router-dom'

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
	}, [fullName, image])

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
