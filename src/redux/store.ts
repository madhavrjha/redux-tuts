import { configureStore } from '@reduxjs/toolkit'
import counter from './slices/counter'
import posts from './slices/posts'
import users from './slices/users'

const store = configureStore({
	reducer: {
		counter,
		posts,
		users,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
