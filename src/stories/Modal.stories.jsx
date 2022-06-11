import { useState } from 'react'
import Modal from '../components/Modal'

export default {
	title: 'Component/Modal',
	component: Modal,
}

export const Default = () => {
	const [visible, setVisible] = useState(false)

	return (
		<div>
			<button onClick={() => setVisible(true)}>show modal</button>
			<Modal
				visible={visible}
				onClose={() => {
					setVisible(false)
				}}
			>
				Hi
			</Modal>
		</div>
	)
}
