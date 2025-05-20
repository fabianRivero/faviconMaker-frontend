import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import { EditorImageProvider } from './components/contexts/EditorImageContext.jsx'
import App from './App.jsx'
import "./main.css";
import { esES } from '@clerk/localizations'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider localization={esES} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <BrowserRouter>
      <EditorImageProvider>
        <App />
      </EditorImageProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)


