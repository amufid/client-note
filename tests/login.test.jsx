import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Login from '../src/pages/auth/Login.jsx';
import { toast } from 'react-toastify';
import instance from '../src/lib/instance.js';
import { customRender, fireEvent, screen, waitFor } from './test-utils.jsx';

// Mocking instance.post and toast
vi.mock('../src/lib/instance', async (importOriginal) => {
   const actual = await importOriginal();
   return {
      ...actual,
      post: vi.fn(),
   }
})

vi.mock('react-toastify', () => ({
   toast: {
      success: vi.fn(),
      error: vi.fn(),
   },
}));

describe('Login Component', () => {
   const renderLogin = () => {
      return customRender(<Login />);
   };

   beforeEach(() => {
      vi.clearAllMocks();
   });

   test('render heading login', () => {
      renderLogin();
      expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
   });

   test('renders email input and label', () => {
      renderLogin();
      // Check if the email input is in the document
      const emailInput = screen.getByLabelText(/Email/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput.value).toBe('test@example.com');
   });

   test('renders password input and label', () => {
      renderLogin();
      const passwordInput = screen.getByTestId('password');

      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      expect(passwordInput.value).toBe('123456');
   });

   test('toggles password visibility when checkbox is clicked', () => {
      renderLogin();
      const passwordInput = screen.getByTestId('password');
      const checkbox = screen.getByLabelText(/Show password/i);

      expect(passwordInput).toHaveAttribute('type', 'password');
      fireEvent.click(checkbox);
      expect(passwordInput).toHaveAttribute('type', 'text');
      fireEvent.click(checkbox);
      expect(passwordInput).toHaveAttribute('type', 'password');
   });

   test('renders login button with correct text', () => {
      renderLogin()
      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveTextContent('Login');
   });

   test('renders loading state for button', () => {
      renderLogin();
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByTestId('password');
      const loginButton = screen.getByRole('button', { name: /login/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(loginButton);

      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveTextContent('Loading...');
   });

   const mockSetToken = vi.fn();
   const mockSetRefreshToken = vi.fn();

   test('should login successfully', async () => {
      try {
         renderLogin();
         const mockToken = 'mockAccessToken';
         const mockRefreshToken = 'mockRefreshToken';
         const emailInput = screen.getByPlaceholderText(/email/i);
         const passwordInput = screen.getByPlaceholderText(/password/i);
         const loginButton = screen.getByRole('button', { name: /login/i });

         fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
         fireEvent.change(passwordInput, { target: { value: 'password123' } });
         fireEvent.click(loginButton);

         instance.post.mockResolvedValue({
            data: {
               accessToken: {
                  token: mockToken,
                  refreshToken: mockRefreshToken,
               },
            },
         });

         await waitFor(() => {
            expect(mockSetToken).toHaveBeenCalledWith(mockToken);
            expect(mockSetRefreshToken).toHaveBeenCalledWith(mockRefreshToken);
            expect(toast.success).toHaveBeenCalledWith('Login successfully');
            expect(window.location.pathname).toBe('/note');
         })
      } catch (error) {
         console.error("Test error:", error)
      }
   });

   test('should show toast error when login with error', async () => {
      try {
         renderLogin();

         const emailInput = screen.getByPlaceholderText(/email/i);
         const passwordInput = screen.getByPlaceholderText(/password/i);
         const loginButton = screen.getByRole('button', { name: /login/i });

         fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
         fireEvent.change(passwordInput, { target: { value: 'password111' } });
         fireEvent.click(loginButton);

         instance.post.mockResolvedValue({
            data: {
               accessToken: {
                  token: undefined,
                  refreshToken: undefined,
               },
            },
         });

         await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Email or password wrong!'));
      } catch (error) {
         console.error("Test error:", error)
      }
   });

   test('renders link to register page', () => {
      renderLogin();
      const registerLink = screen.getByRole('link', { name: /sign up here/i })
      expect(registerLink).toBeInTheDocument();
      expect(registerLink).toHaveAttribute('href', '/register');
   })

   test('renders link to login with Google', () => {
      renderLogin();
      const loginWithGoogle = screen.getByRole('link', { name: /Sign in with Google/i })
      expect(loginWithGoogle).toBeInTheDocument();
      expect(loginWithGoogle).toHaveAttribute('href', 'http://localhost:5000/api/oauth/google');
   })
});
