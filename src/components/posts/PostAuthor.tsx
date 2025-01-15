import { useAppSelector } from '../../redux/hooks'
import { selectAllUsers } from '../../redux/slices/users'

type PropType = {
	userId: number
}

const PostAuthor = ({ userId }: PropType) => {
	const users = useAppSelector(selectAllUsers)

	const author = users.find(user => user.id === userId)

	return (
		<p className='text-xs text-slate-600'>
			<span>by {author ? author.name : 'Unknown author'}</span>
		</p>
	)
}

export default PostAuthor
