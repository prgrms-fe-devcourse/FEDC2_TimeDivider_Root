import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import useClickAway from '../hooks/useClickAway'

const Modal = ({ children, width = 18.75, height, visible = false, onClose, ...props }) => {
	const ref = useClickAway(() => {
		if (visible) onClose && onClose()
	})

	const containerStyle = useMemo(
		() => ({
			width: `${width}rem`,
			height: `${height}rem`,
		}),
		[width, height],
	)

	const el = useMemo(() => document.createElement('div'), [])

	useEffect(() => {
		document.body.appendChild(el)
		return () => {
			document.body.removeChild(el)
		}
	})

	return ReactDOM.createPortal(
		<BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
			<ModalContainer ref={ref} {...props} style={{ ...props.style, ...containerStyle }}>
				<CloseButton onClick={onClose}>x</CloseButton>
				{children}
			</ModalContainer>
		</BackgroundDim>,
		el,
	)
}

export default Modal

const BackgroundDim = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
`
const ModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: white;
	box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
`

const CloseButton = styled.div`
	position: fixed;
	top: 0;
	right: 1rem;
	cursor: pointer;
`
