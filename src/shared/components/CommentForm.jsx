import { useState } from 'react'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { colors } from 'shared/constants/colors'
import styled from 'styled-components'
import Button from './Button'
import { useUser } from '../hooks/useUser'
import Avatar from './Avatar'

const CommentForm = ({ onSubmit, ...props }) => {
	const { user } = useUser()
	const [comment, setComment] = useState('')
	const [buttonState, setButtonState] = useState(true)
	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(comment)
		setComment('')
	}

	const handleChange = e => {
		const { value } = e.target
		value.length > 0 ? setButtonState(false) : setButtonState(true)
		setComment(value)
	}
	return (
		<Form {...props} onSubmit={handleSubmit}>
			<Avatar src={user.image} size={3} />
			<TextArea
				name="comment"
				value={comment}
				onChange={handleChange}
				autoComplete={'off'}
				placeholder={'댓글 달기...'}
			/>
			<CommentButton disabled={buttonState} width={5} height={5}>
				<IoPaperPlaneOutline style={{ marginTop: '0.4rem' }} fontSize={'3rem'} />
			</CommentButton>
		</Form>
	)
}

const Form = styled.form`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding-left: 1rem;
	width: 100%;
`

const CommentButton = styled(Button)`
	border-radius: 0 0 0 0;
`

const TextArea = styled.input`
	flex: 1;
	height: 5rem;
	padding: 10px;
	box-sizing: border-box;
	border: solid 1px ${colors.brightGray};
	outline: none;
	font-size: 1.5rem;
	font-family: sans-serif;
	resize: none;
`

export default CommentForm
