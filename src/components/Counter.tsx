import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { decrement, increment, incrementBy, reset, selectCount } from '../redux/slices/counter'

const Counter = () => {
	const count = useAppSelector(selectCount)
	const dispatch = useAppDispatch()

	const [amount, setAmount] = useState('')

	const incrementByAmount = +amount || 0

	const resetAll = () => {
		dispatch(reset())
		setAmount('')
	}

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
				value={amount}
				onChange={e => setAmount(e.target.value)}
			/>
			<div className='flex gap-3 my-2 justify-center'>
				<button
					className='px-3 py-1 rounded-lg border border-slate-700 bg-slate-300'
					onClick={() => dispatch(incrementBy(incrementByAmount))}>
					Increment By Amount
				</button>
				<button className='px-3 py-1 rounded-lg border border-slate-700 bg-slate-300' onClick={resetAll}>
					Reset
				</button>
			</div>
		</main>
	)
}

export default Counter
