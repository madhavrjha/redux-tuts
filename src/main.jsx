import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { fetchUsers } from './features/users/usersSlice.js'
import { extendedApiSlice } from './features/posts/postsSlice.js'

import App from './App.jsx'

import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())
store.dispatch(fetchUsers())

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ApiProvider api={apiSlice}>
			<App />
		</ApiProvider>
	</StrictMode>
)
