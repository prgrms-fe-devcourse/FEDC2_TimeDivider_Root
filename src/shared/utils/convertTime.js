import { addZero } from './timeFormatting'

export const convertHourMinuteToSeconds = time => {
	return parseInt(time.hour) * 3600 + parseInt(time.minute) * 60
}

export const convertSecondsToHourMinute = time => {
	const hour = addZero(String(parseInt(time / 3600)))
	const minute = addZero(String(parseInt((time % 3600) / 60)))

	return { hour, minute }
}
