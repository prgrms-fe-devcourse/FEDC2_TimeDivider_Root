import { useState } from 'react'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { colors } from 'shared/constants/colors'
import useToggle from 'shared/hooks/useToggle'
import styled from 'styled-components'
import Button from './Button'

const CommentForm = ({ onSubmit, ...props }) => {
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
			<TextArea name="comment" value={comment} onChange={handleChange} fontSize={40} />
			<CommentButton disabled={buttonState} width={5} height={5}>
				<IoPaperPlaneOutline style={{ marginTop: '0.4rem' }} fontSize={'3rem'} />
			</CommentButton>
		</Form>
	)
}

export default CommentForm

const Form = styled.form`
	display: flex;
	align-items: center;
	width: 100%;
`

const CommentButton = styled(Button)`
	border-radius: 0 0 0 0;
`

const TextArea = styled.input`
	width: 100%;
	height: 5rem;
	padding: 10px;
	box-sizing: border-box;
	border: solid 1px ${colors.brightGray};
	outline: none;
	font-size: 2rem;
	font-family: sans-serif;
	resize: none;
`
