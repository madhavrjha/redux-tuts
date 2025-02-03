import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PostAuthor = ({ userId }) => {
	const users = useSelector(selectAllUsers)

	const author = users.find(user => user.id === userId)

	return <span>by {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : 'Unknown author'}</span>
}

PostAuthor.propTypes = {
	userId: PropTypes.number.isRequired,
}

export default PostAuthor
