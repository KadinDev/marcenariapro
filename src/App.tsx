
import { Routes } from './routes'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './contexts/auth'

export function App() {
  return (
    <AuthProvider>
      
      <ToastContainer autoClose={3000} />

      <Routes/>
    
    </AuthProvider>
  );
}

