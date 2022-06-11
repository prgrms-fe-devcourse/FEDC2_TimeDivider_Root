export const convertHourMinuteToSeconds = time => {
	return parseInt(time.hour) * 3600 + parseInt(time.minute) * 60
}

export const convertSecondsToHourMinute = time => {
	const hour = String(parseInt(time / 3600))
	const minute = String(parseInt((time % 3600) / 60))

	return { hour, minute }
}
