import { useState } from 'react'
import useCreatingTimers from 'shared/hooks/useCreatingTimers'

const useNameTag = () => {
	const { timerNames, addTimerName, updateTimerName } = useCreatingTimers()
	const [nameTag, setNameTag] = useState('')

	const handleNameTagSubmit = e => {
		e.preventDefault()
		const trimmedName = nameTag.trim()
		if (trimmedName) {
			addTimerName({ id: `${Date.now()}${timerNames.length}`, name: trimmedName })
		}

		setNameTag('')
	}
	const removeNameTag = removeId => {
		const filteredNameIds = timerNames.filter(({ id }) => removeId !== id)
		updateTimerName(filteredNameIds)
	}

	return {
		nameTag,
		setNameTag,
		handleNameTagSubmit,
		removeNameTag,
	}
}

export default useNameTag
