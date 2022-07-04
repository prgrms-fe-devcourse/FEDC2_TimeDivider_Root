import { useEffect, useState } from 'react'
import apis from 'shared/api'
import { TEST_CHANNEL_ID } from 'shared/constants/chanelId'
import { parsePostData, stringifyPostData } from 'shared/utils/postData'
import useTimers from 'shared/hooks/useTimers'
import useUser from 'shared/hooks/useUser'
import dummyUserImage from 'shared/images/dummyUser.png'

const usePosts = () => {
	const { timers } = useTimers()
	const { user } = useUser()
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		setIsLoading(true)
		const { data } = await apis.getPosts(TEST_CHANNEL_ID)

		const filteredData = data.filter(post => {
			if (post.title === 'Test') return false
			const { share } = parsePostData(post.title)
			return share === 'PUBLIC'
		})

		const fetchData = filteredData.map(post => {
			const { timers } = parsePostData(post.title)
			const like = post.likes.find(like => like.user === user._id)
			const likeId = like ? like._id : null
			return { ...post, timers, like, likeId, imageSrc: post.author.image ?? dummyUserImage }
		})

		setPosts(fetchData)
		setIsLoading(false)
	}

	const updateMyPost = async () => {
		const timersData = Object.keys(timers).map((key, idx) => {
			return {
				id: idx,
				name: timers[key].name,
			}
		})
		const data = stringifyPostData('PUBLIC', timersData)

		await apis.modifyPost({
			postId: user.posts[0]._id,
			title: data,
			image: null,
			channelId: TEST_CHANNEL_ID,
		})
		await getPosts()
	}

	const makePrivateMyPost = async () => {
		await apis.disablePost(user.posts[0]._id, TEST_CHANNEL_ID)
		await getPosts()
	}

	return { posts, isLoading, getPosts, updateMyPost, makePrivateMyPost }
}

export default usePosts
