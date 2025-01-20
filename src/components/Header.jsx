import { Link } from 'react-router-dom'
import { getCount, increaseCount } from '../features/posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
	const count = useSelector(getCount)
	const dispatch = useDispatch()

	return (
		<header className='Header'>
			<h1>Redux Blog</h1>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='post'>Post</Link>
					</li>
					<li>
						<Link to='user'>User</Link>
					</li>
				</ul>
				<button onClick={() => dispatch(increaseCount())}>{count}</button>
			</nav>
		</header>
	)
}

export default Header
