import React from 'react'
import ReactDOM from 'react-dom'
import { App, store } from '@feature/app'
import { Provider } from 'react-redux'
import './styles/styles.css'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
