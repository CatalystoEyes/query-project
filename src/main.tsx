import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import General from './General.tsx'
import Cover from './Cover/Cover.tsx'


const queryClient = new QueryClient({
  defaultOptions:{queries: {
    refetchOnWindowFocus: false,
  }}
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <Cover>
     <General />
      </Cover>
    </QueryClientProvider>
  </React.StrictMode>,
)
