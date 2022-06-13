import Modal from './Modal'
import Button from './Button'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FormModal = ({
	id,
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
				<Form id={id} onSubmit={onSubmit}>
					{children}
				</Form>
				<Buttons>
					<Button onClick={onCancel}>{cancelText}</Button>
					<Button form={id} type={'submit'}>
						{confirmText}
					</Button>
				</Buttons>
			</Wrapper>
		</Modal>
	)
}

export default FormModal

FormModal.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node,
	titleText: PropTypes.string,
	cancelText: PropTypes.string,
	confirmText: PropTypes.string,
	visible: PropTypes.bool.isRequired,
	onCancel: PropTypes.func,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
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
