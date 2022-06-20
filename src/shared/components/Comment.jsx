import { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'

const Comment = ({ onSubmit, ...props }) => {
	const [comment, setComment] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(comment)
		setComment('')
	}

	const handleChange = e => {
		const { value } = e.target
		setComment(value)
	}
	return (
		<Form {...props} onSubmit={handleSubmit}>
			<TextArea name="comment" value={comment} onChange={handleChange} fontSize={40} />
			<Button width={8} height={8} fontSize={1.6}>
				등록
			</Button>
		</Form>
	)
}

export default Comment

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`

const TextArea = styled.textarea`
	width: 22rem;
	height: 8rem;
	padding: 10px;
	box-sizing: border-box;
	border: solid 1px #1e90ff;
	outline: none;
	border-radius: 5px;
	margin-right: 1rem;
	font-size: 16px;
	resize: none;
`
