import React from 'react'
import ReactDOM from 'react-dom'

import { MoviesProvider } from './context'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
