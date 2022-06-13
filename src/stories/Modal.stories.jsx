import { useState } from 'react'
import Modal from 'shared/components/Modal'

export default {
	title: 'Component/Modal',
	component: Modal,
	argTypes: {
		width: { defaultValue: 18.75, control: { type: 'number' } },
		height: { control: { type: 'number' } },
	},
}

export const Default = args => {
	const [visible, setVisible] = useState(false)

	return (
		<div>
			<button onClick={() => setVisible(true)}>show modal</button>
			<Modal
				{...args}
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
