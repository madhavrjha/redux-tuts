import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchPosts, selectAllPosts } from '../../redux/slices/posts'
import PostExcerpt from './PostExcerpt'
import AddNewPost from './AddNewPost'

const Posts = () => {
	const posts = useAppSelector(selectAllPosts)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (posts.status === 'idle') dispatch(fetchPosts())
	}, [posts, dispatch])

	let content: React.ReactNode

	if (posts.status === 'loading') {
		content = <p>Loading...</p>
	} else if (posts.status === 'failed') {
		content = <p>Something went wrong</p>
	} else if (posts.status === 'succeeded') {
		const orderedPosts = posts.posts.slice().sort((a, b) => b.date.localeCompare(a.date))

		content = (
			<div className='flex flex-col gap-2'>
				{orderedPosts.map(post => (
					<PostExcerpt key={post.id} post={post} />
				))}
			</div>
		)
	}

	return (
		<div className='min-h-screen max-w-screen-sm mx-auto px-2'>
			<AddNewPost />
			<h1 className='text-xl font-bold'>Posts</h1>
			{content}
		</div>
	)
}

export default Posts
