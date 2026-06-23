import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Log resolved environment info so developers can quickly see what API base will be used
const codespace = import.meta.env.VITE_CODESPACE_NAME || null
if (codespace) console.info('VITE_CODESPACE_NAME=', codespace)
else console.info('VITE_CODESPACE_NAME is not set; falling back to the local backend on port 8000.')

const container = document.getElementById('root')
if (!container) {
  // If the root element is missing, show a clear console message instead of crashing.
  console.error('Root element not found: expected an element with id="root"')
} else {
  // createRoot is the recommended API for React 18+ (React 19 compatible)
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

