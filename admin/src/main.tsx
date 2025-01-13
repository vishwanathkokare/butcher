import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Market from './Market.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Market />
    <App />
  </StrictMode>,
)
