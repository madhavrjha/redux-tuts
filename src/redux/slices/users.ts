import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type User = {
	id: number
	name: string
}

type InitialState = User[]

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = createAsyncThunk('users', async () => {
	const response = await axios(USERS_URL)
	return response.data as User[]
})

const initialState: InitialState = []

const users = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchUsers.fulfilled, (_state, action) => {
			/* 
				Always use the return action.payload pattern when you want to replace the entire state

				Redux Toolkit uses immer internally to ensure that the state is updated immutably. 
				While assigning state = action.payload might look like it's replacing the state,
				it does not trigger the proper state update.
			*/
			return action.payload
		})
	},
})

export const selectAllUsers = (state: RootState) => state.users

export default users.reducer
