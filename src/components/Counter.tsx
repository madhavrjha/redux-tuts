import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { decrement, increment, selectCount } from '../redux/slices/counter'

const Counter = () => {
	const count = useAppSelector(selectCount)
	const dispatch = useAppDispatch()

	return (
		<main className='text-center'>
			<h1 className='text-4xl'>{count}</h1>
			<div className='flex gap-3 my-2 justify-center'>
				<button
					className='px-3 py-1 rounded-lg border border-slate-700 bg-slate-300'
					onClick={() => dispatch(increment())}>
					+
				</button>
				<button
					className='px-3 py-1 rounded-lg border border-slate-700 bg-slate-300'
					onClick={() => dispatch(decrement())}>
					-
				</button>
			</div>
			<input
				type='text'
				className='w-[300px] outline-none border border-slate-700 rounded-md px-2 py-1'
				placeholder='Amount'
			/>
			<div className='flex gap-3 my-2 justify-center'>
				<button className='px-3 py-1 rounded-lg border border-slate-700 bg-slate-300'>Increment By Amount</button>
				<button className='px-3 py-1 rounded-lg border border-slate-700 bg-slate-300'>Reset</button>
			</div>
		</main>
	)
}

export default Counter
