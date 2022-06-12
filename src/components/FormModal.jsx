import Modal from './Modal'
import Button from './Button'
import React from 'react'
import styled from 'styled-components'

export const FormModal = ({
	children,
	titleText,
	cancelText = '닫기',
	confirmText = '확인',
	visible,
	onCancel,
	onClose,
	onSubmit,
}) => {
	return (
		<Modal visible={visible} onClose={onClose} height={18.75}>
			<Wrapper>
				<Title>{titleText}</Title>
				<Form id={'formModal'} onSubmit={onSubmit}>
					{children}
				</Form>
				<Buttons>
					<Button onClick={onCancel}>{cancelText}</Button>
					<Button form={'formModal'} type={'submit'}>
						{confirmText}
					</Button>
				</Buttons>
			</Wrapper>
		</Modal>
	)
}
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`
const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
	margin-bottom: 1rem;
`
const Form = styled.form`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`
const Buttons = styled.div`
	display: flex;
`
