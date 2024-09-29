import React from 'react'
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react'
import AuthProvider from '../src/provider/authProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

const AllProviders = ({ children }) => {
   return (
      <BrowserRouter>
         <AuthProvider>
            {children}
         </AuthProvider>
      </BrowserRouter>
   )
}

const customRender = (ui, options) =>
   rtlRender(ui, { wrapper: AllProviders, ...options })

export { customRender, fireEvent, waitFor, screen }
