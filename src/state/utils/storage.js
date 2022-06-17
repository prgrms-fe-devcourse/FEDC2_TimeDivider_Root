export const localStorageEffect =
	key =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key)
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue))
		}

		onSet((newValue, _, isReset) => {
			isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
		})
	}

export const sessionStorageEffect =
	key =>
	({ setSelf, onSet }) => {
		const savedValue = sessionStorage.getItem(key)
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue))
		}

		onSet((newValue, _, isReset) => {
			isReset
				? sessionStorage.removeItem(key)
				: sessionStorage.setItem(key, JSON.stringify(newValue))
		})
	}
