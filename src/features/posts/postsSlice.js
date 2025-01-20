import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
	status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
	count: 0,
})

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

export const updatePost = createAsyncThunk('posts/updatePost', async initialPost => {
	const { id } = initialPost
	try {
		const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
		return response.data
	} catch (err) {
		// return err.message
		console.log(err.message)
		return initialPost // Jsonplaceholder throws error when updating a new post created by the client
	}
})

export const deletePost = createAsyncThunk('posts/deletePost', async initialPost => {
	const { id } = initialPost
	try {
		const response = await axios.delete(`${POSTS_URL}/${id}`)
		return response.status == 200 ? initialPost : `${response.status}: ${response.statusText}`
	} catch (e) {
		return e.message
	}
})

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		reactionAdded: (state, action) => {
			const { postId, reaction } = action.payload
			const existingPost = state.entities[postId]
			if (existingPost) {
				existingPost.reactions[reaction]++
			}
		},
		increaseCount: state => {
			state.count += 1
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPosts.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
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

				postsAdapter.upsertMany(state, loadedPosts)
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
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
				postsAdapter.addOne(state, addedPost)
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log('Update could not complete')
					console.log(action.payload)
					return
				}

				action.payload.date = new Date().toISOString()
				postsAdapter.upsertOne(state, action.payload)
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log('Delete could not complete')
					console.log(action.payload)
					return
				}
				const { id } = action.payload
				postsAdapter.removeOne(state, id)
			})
	},
})

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors(state => state.posts)

export const getPostsStatus = state => state.posts.status
export const getPostsError = state => state.posts.error
export const getCount = state => state.posts.count

export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
	posts.filter(post => post.userId === userId)
)

export const { increaseCount, postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
