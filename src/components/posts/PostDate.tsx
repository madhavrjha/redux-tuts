import { formatDistanceToNow, parseISO } from 'date-fns'

type PropType = {
	date: string
}

const PostDate = ({ date }: PropType) => {
	const daysAgo = formatDistanceToNow(parseISO(date)) + ' ago'

	return (
		<p title={date} className='text-xs text-slate-600'>
			<span>{daysAgo}</span>
		</p>
	)
}

export default PostDate
