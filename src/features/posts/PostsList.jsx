import { useSelector } from 'react-redux'
import { getPostsError, getPostsStatus, selectPostIds } from './postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsList = () => {
	const orderedPostIds = useSelector(selectPostIds)
	const postsStatus = useSelector(getPostsStatus)
	const error = useSelector(getPostsError)

	console.log(orderedPostIds)

	let content
	if (postsStatus === 'loading') {
		content = <p>Loading...</p>
	} else if (postsStatus === 'succeeded') {
		content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId} />)
	} else if (postsStatus === 'failed') {
		content = <p>{error}</p>
	}

	return <section>{content}</section>
}

export default PostsList
