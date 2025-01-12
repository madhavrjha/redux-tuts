import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from './counterSlice'
import { useState } from 'react'

const Counter = () => {
	const count = useSelector(state => state.counter.count)
	const dispatch = useDispatch()

	const [amount, setAmount] = useState(0)
	const addValue = +amount || 0

	const resetAll = () => {
		dispatch(reset())
		setAmount(0)
	}

	return (
		<section>
			<p>{count}</p>
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>

			<input type='text' value={amount} onChange={e => setAmount(e.target.value)} />

			<button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
			<button onClick={resetAll}>Reset</button>
		</section>
	)
}

export default Counter
