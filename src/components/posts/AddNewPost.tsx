import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllUsers } from '../../redux/slices/users'
import { addNewPost } from '../../redux/slices/posts'

const AddNewPost = () => {
	const users = useAppSelector(selectAllUsers)
	const dispatch = useAppDispatch()

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')
	const [addPostStatus, setAddPostStatus] = useState<'idle' | 'pending'>('idle')

	const userOptions = users.map(u => (
		<option key={u.id} value={u.id}>
			{u.name}
		</option>
	))

	const canSubmit = Boolean(title) && Boolean(content) && Boolean(userId) && addPostStatus === 'idle'

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (canSubmit) {
			try {
				await dispatch(addNewPost({ title, body: content, userId: +userId })).unwrap()
				setTitle('')
				setContent('')
				setUserId('')
			} catch (e) {
				console.log(e)
			} finally {
				setAddPostStatus('idle')
			}
		}
	}

	return (
		<form className='flex flex-col gap-2 py-4' onSubmit={handleSubmit}>
			<p className='text-lg font-bold'>Add New Post</p>
			<input
				className='border border-slate-600 outline-none text-sm rounded-sm py-1 px-2'
				type='text'
				placeholder='Enter post title'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<select
				className='border border-slate-600 outline-none text-sm rounded-sm py-1 px-2'
				value={userId}
				onChange={e => setUserId(e.target.value)}>
				<option value=''>Select User</option>
				{userOptions}
			</select>
			<textarea
				className='border border-slate-600 outline-none text-sm rounded-sm py-1 px-2'
				placeholder='Enter post content'
				value={content}
				onChange={e => setContent(e.target.value)}
			/>
			<button
				type='submit'
				className='bg-slate-600 text-slate-50 py-2 rounded-sm disabled:opacity-25'
				disabled={!canSubmit}>
				Add Post
			</button>
		</form>
	)
}

export default AddNewPost
