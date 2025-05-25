
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VideoPage from './VideoPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoPage />
  </StrictMode>,
)
