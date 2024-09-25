import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { setAuthToken } from './services/api';
import BookManagement from './components/BookManagement';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book" element={<BookManagement/>} />


        <Route path="/books/:id" element={<BookDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
