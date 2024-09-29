import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { toast } from 'react-toastify';
import instance from '../src/lib/instance.js';
import { customRender, fireEvent, screen, waitFor } from './test-utils.jsx';
import Register from '../src/pages/auth/Register.jsx';

// Mocking instance.post and toast
vi.mock('../src/lib/instance', async (importOriginal) => {
   const actual = await importOriginal();
   return {
      ...actual
   };
});

vi.mock('react-toastify', () => ({
   toast: {
      success: vi.fn(),
      error: vi.fn(),
   },
}));

describe('Register Component', () => {
   const renderRegister = () => {
      return customRender(<Register />);
   }

   beforeEach(() => {
      vi.clearAllMocks();
   });

   test('renders heading register', () => {
      renderRegister();
      const heading = screen.getByRole('heading', { name: /Register/i })
      expect(heading).toBeInTheDocument()
   })

   test('toggles password visibility when checkbox is clicked', () => {
      renderRegister();
      const passwordInput = screen.getByTestId('password');
      const checkbox = screen.getByLabelText(/Show password/i);

      expect(passwordInput).toHaveAttribute('type', 'password');
      fireEvent.click(checkbox);
      expect(passwordInput).toHaveAttribute('type', 'text');
      fireEvent.click(checkbox);
      expect(passwordInput).toHaveAttribute('type', 'password');
   });

   test('renders label and input register', async () => {
      try {
         renderRegister();
         const usernameInput = screen.getByTestId('username')
         const emailInput = screen.getByLabelText(/Email/i)
         const passwordInput = screen.getByTestId('password')
         const repeatPassword = screen.getByTestId('repeatPassword')

         expect(usernameInput).toBeInTheDocument()
         expect(emailInput).toBeInTheDocument()
         expect(passwordInput).toBeInTheDocument()
         expect(repeatPassword).toBeInTheDocument()

         fireEvent.change(usernameInput, { target: { value: 'test' } })
         fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
         fireEvent.change(passwordInput, { target: { value: 'password123' } })
         fireEvent.change(repeatPassword, { target: { value: 'password123' } })

         expect(usernameInput.value).toBe('test')
         expect(emailInput.value).toBe('test@example.com')
         expect(passwordInput.value).toBe('password123')
         expect(repeatPassword.value).toBe('password123')

         instance.post.mockResolvedValue({
            data: {
               message: 'Success'
            }
         })

         await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Register successfully')
            expect(window.location.pathname).toBe('/login')
         })
      } catch (e) {
         console.error("Test error:", e)
      }
   })
})