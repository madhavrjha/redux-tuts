import { useAppDispatch } from '../../redux/hooks'
import { Post, reactionAdded } from '../../redux/slices/posts'
import PostAuthor from './PostAuthor'
import PostDate from './PostDate'

type PropType = {
	post: Post
}

const PostExcerpt = ({ post }: PropType) => {
	const dispatch = useAppDispatch()

	return (
		<div className='bg-slate-100 px-4 py-2 rounded-md border border-slate-200'>
			<h2 className='text-md'>{post.title}</h2>
			<p className='text-sm text-slate-600'>{post.body.slice(0, 100)}...</p>
			<div className='flex gap-4'>
				<PostAuthor userId={post.userId} />
				<PostDate date={post.date} />
			</div>
			<p className='text-sm cursor-pointer inline-block select-none' onClick={() => dispatch(reactionAdded(post.id))}>
				<span className='text-slate-500'>{post.reactions.like}</span> ❤️
			</p>
		</div>
	)
}

export default PostExcerpt
