import PropTypes from 'prop-types'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'

const PostExcerpt = ({ post }) => {
	return (
		<article key={post.id}>
			<h3>{post.title}</h3>
			<p className='excerpt'>{post.body.substring(0, 75)}...</p>
			<p className='postCredit'>
				<Link to={`/post/${post.id}`}>View Post</Link>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	)
}

PostExcerpt.propTypes = {
	post: PropTypes.object.isRequired,
}

export default PostExcerpt
