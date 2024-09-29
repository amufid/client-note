import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../src/App.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import { customRender, fireEvent } from './test-utils'
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

class IntersectionObserver {
   constructor(callback) {
      this.callback = callback;
   }

   observe() { }
   unobserve() { }
   disconnect() { }
}

// Menetapkan mock ke window
window.IntersectionObserver = IntersectionObserver;

// Mock useAuth sebelum menjalankan test
vi.mock('../src/provider/useAuth', () => ({
   useAuth: () => ({
      accessToken: 'mockAccessToken',  // Mock nilai accessToken
   }),
}));

describe('App Component', () => {
   it('renders without crashing', () => {
      expect(() => render(<App />)).not.toThrow();  // Memastikan tidak ada error
   });

   it('renders the ToastContainer and displays a toast', () => {
      const { container } = render(<App />);

      // Memeriksa apakah elemen dengan kelas Toastify ada
      const toastElement = container.querySelector('.Toastify');
      expect(toastElement).toBeInTheDocument();  // Memastikan elemen ada
   });
});

describe('Dashboard component', () => {
   beforeEach(() => {
      customRender(<Dashboard />);
   });

   it('renders dashboard component', () => {
      const { container } = customRender(<Dashboard />);
      expect(container).toBeInTheDocument();
   });

   it('renders the NavbarDashboard component', () => {
      expect(screen.getByText(/Welcome to My Note/i)).toBeInTheDocument();
   });

   it('renders the login button with correct text', () => {
      expect(screen.getByRole('link', { name: /Get started free/i })).toBeInTheDocument();
   });

   it('renders the image with correct src and alt attributes', () => {
      const image = screen.getByAltText(/dash/i);

      // Memastikan gambar dirender
      expect(image).toBeInTheDocument();

      // Memastikan src gambar sesuai dengan yang diharapkan
      expect(image).toHaveAttribute('src', '/dash.png');
   });

   it('renders secure note features', () => {
      expect(screen.getByText(/Secure/i)).toBeInTheDocument();
      expect(screen.getByText(/Save the moment/i)).toBeInTheDocument();
      expect(screen.getByText(/Easy access/i)).toBeInTheDocument();
   });

   it('navigates to login page when button is clicked', () => {
      // Mencari tombol berdasarkan teks
      const button = screen.getByRole('button', { name: /get started free/i });

      // Simulasikan klik pada tombol
      fireEvent.click(button);
      expect(button).toBeInTheDocument();

      // Asserasi untuk memastikan navigasi terjadi
      expect(window.location.pathname).toBe('/login');
   });
})
