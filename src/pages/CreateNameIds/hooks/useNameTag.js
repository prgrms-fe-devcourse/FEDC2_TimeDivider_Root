import { useState } from 'react'
import { useCreatingTimers } from '../../../shared/hooks/useCreatingTimers'

const useNameTag = () => {
	const { nameIds, addNameId, updateNameIds } = useCreatingTimers()
	const [nameTag, setNameTag] = useState('')

	const handleNameTagSubmit = e => {
		e.preventDefault()
		const trimmedName = nameTag.trim()

		if (trimmedName) {
			addNameId(`${Date.now()}${nameIds.length}`, trimmedName)
		}

		setNameTag('')
	}
	const removeNameTag = removeId => {
		const filteredNameIds = nameIds.filter(({ id }) => removeId !== id)
		updateNameIds(filteredNameIds)
	}
	return {
		nameTag,
		setNameTag,
		handleNameTagSubmit,
		removeNameTag,
	}
}

export default useNameTag
