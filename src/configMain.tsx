
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ConfigPage from './ConfigPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigPage />
  </StrictMode>,
)
