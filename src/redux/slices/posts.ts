import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'
import { RootState } from '../store'

type JPPost = {
	id: number
	userId: number
	title: string
	body: string
}

export type Post = JPPost & {
	date: string
	reactions: {
		like: number
	}
}

interface PostsState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	posts: Post[]
	error?: string
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios(POSTS_URL)
	return response.data as JPPost[]
})

const initialState: PostsState = {
	status: 'idle',
	posts: [],
}

const posts = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		reactionAdded: (state, action: PayloadAction<number>) => {
			const post = state.posts.find(p => p.id === action.payload)
			if (post) {
				post.reactions.like += 1
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.status = 'succeeded'
			const loadedPosts = action.payload.map(
				(post, index) =>
					({
						...post,
						date: sub(new Date(), { minutes: index }).toISOString(),
						reactions: {
							like: 0,
						},
					} as Post)
			)

			state.posts = loadedPosts
		})
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.error = action.error.message
		})
	},
})

export const selectAllPosts = (state: RootState) => state.posts

export const { reactionAdded } = posts.actions

export default posts.reducer
