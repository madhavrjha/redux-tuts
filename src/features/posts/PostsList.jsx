import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useEffect } from 'react'

const PostsList = () => {
	const posts = useSelector(selectAllPosts)
	const postsStatus = useSelector(getPostsStatus)
	const error = useSelector(getPostsError)

	const dispatch = useDispatch()

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postsStatus, dispatch])

	// posts is read-only, so post.slice() is used to create a writable copy.
	const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

	const renderedPosts = orderedPosts.map(post => (
		<article key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content.substring(0, 100)}</p>
			<p className='postCredit'>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	))

	return (
		<section>
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	)
}

export default PostsList
