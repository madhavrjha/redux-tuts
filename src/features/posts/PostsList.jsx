import { useSelector } from 'react-redux'
import { getPostsError, getPostsStatus, selectAllPosts } from './postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsList = () => {
	const posts = useSelector(selectAllPosts)
	const postsStatus = useSelector(getPostsStatus)
	const error = useSelector(getPostsError)

	let content
	if (postsStatus === 'loading') {
		content = <p>Loading...</p>
	} else if (postsStatus === 'succeeded') {
		// posts is read-only, so post.slice() is used to create a writable copy.
		const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
		content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
	} else if (postsStatus === 'failed') {
		content = <p>{error}</p>
	}

	return <section>{content}</section>
}

export default PostsList
