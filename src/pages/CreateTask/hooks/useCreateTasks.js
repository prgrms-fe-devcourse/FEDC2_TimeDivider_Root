import { useMemo, useState } from 'react'

const useCreateTasks = () => {
	const [spareTime, setSpareTime] = useState({ hour: 0, minute: 0 })
	const [task, setTask] = useState('')
	const [tasks, setTasks] = useState([])
	const isValidTasks = useMemo(() => tasks.length > 0, [tasks])

	const handleSubmit = e => {
		e.preventDefault()
		const trimmedTask = task.trim()

		if (trimmedTask) {
			setTasks([...tasks, { id: `${Date.now()}${tasks.length}`, task: trimmedTask }])
		}

		setTask('')
	}

	const removeTask = removeId => {
		const filteredTasks = tasks.filter(({ id }) => removeId !== id)
		setTasks(filteredTasks)
	}

	return {
		spareTime,
		setSpareTime,
		task,
		setTask,
		tasks,
		setTasks,
		isValidTasks,
		handleSubmit,
		removeTask,
	}
}

export default useCreateTasks
