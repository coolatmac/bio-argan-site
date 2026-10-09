import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { RouterProvider } from './router'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement,
    <RouterProvider>
      <App />
    </RouterProvider>
  )
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider>
        <App />
      </RouterProvider>
    </React.StrictMode>
  )
}
