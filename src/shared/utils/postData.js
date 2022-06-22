export const parsePostData = postTitle => {
	const { share, timers } = JSON.parse(postTitle)
	return { share, timers }
}

export const stringifyPostData = (share, timers) => {
	return JSON.stringify({ share, timers })
}
