import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const counter = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {
		increment: state => state + 1,
		incrementBy: (state, action: PayloadAction<number>) => state + action.payload,
		decrement: state => state - 1,
		reset: () => 0,
	},
})

export const { decrement, increment, incrementBy, reset } = counter.actions

export const selectCount = (state: RootState) => state.counter

export default counter.reducer
