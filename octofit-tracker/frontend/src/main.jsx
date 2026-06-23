import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

// Log resolved environment info so developers can quickly see what API base will be used
// If you develop locally, define VITE_CODESPACE_NAME in `./.env.local` to point to Codespaces.
const codespace = import.meta.env.VITE_CODESPACE_NAME || null
if (codespace) console.info('VITE_CODESPACE_NAME=', codespace)
else console.info('VITE_CODESPACE_NAME is not set; falling back to the local backend on port 8000. To set it, create octofit-tracker/frontend/.env.local with VITE_CODESPACE_NAME=your-codespace-name')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
