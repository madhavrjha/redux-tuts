import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
	posts: [],
	status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	try {
		const response = await axios(POSTS_URL)
		return response.data
	} catch (e) {
		return e.message
	}
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
	try {
		const response = await axios.post(POSTS_URL, initialPost)
		return response.data
	} catch (e) {
		return e.message
	}
})

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer: (state, action) => {
				state.posts.push(action.payload)
			},
			prepare: (title, body, userId) => {
				return {
					payload: {
						id: nanoid(),
						title,
						body,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				}
			},
		},
		reactionAdded: (state, action) => {
			const { postId, reaction } = action.payload
			const existingPost = state.posts.find(p => p.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction]++
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.status = 'succeeded'

			const loadedPosts = action.payload.map((post, index) => ({
				...post,
				date: sub(new Date(), { minutes: index + 1 }).toISOString(),
				reactions: {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				},
			}))

			state.posts = loadedPosts
		})
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		})
		builder.addCase(addNewPost.fulfilled, (state, action) => {
			const addedPost = {
				...action.payload,
				date: new Date().toISOString(),
				reactions: {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				},
			}
			state.posts.push(addedPost)
		})
	},
})

export const selectAllPosts = state => state.posts.posts
export const getPostsStatus = state => state.posts.status
export const getPostsError = state => state.posts.error

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
