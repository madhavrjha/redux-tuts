import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { fetchUsers } from './features/users/usersSlice.js'
import { fetchPosts } from './features/posts/postsSlice.js'

import App from './App.jsx'

import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

store.dispatch(fetchPosts())
store.dispatch(fetchUsers())

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
