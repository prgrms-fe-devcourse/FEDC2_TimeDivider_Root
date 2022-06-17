import { useState } from 'react'

const useForm = ({ initialValues, onSubmit, validate }) => {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		setIsLoading(true)

		const newErrors = validate(values)
		const isError = Object.keys(newErrors).length !== 0
		isError ? setErrors(newErrors) : await onSubmit(values)

		setIsLoading(false)
	}

	return {
		values,
		errors,
		isLoading,
		handleChange,
		handleSubmit,
	}
}

export default useForm
