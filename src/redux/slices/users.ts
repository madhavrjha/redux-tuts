import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state = action.payload
		})
	},
})

export default users.reducer
