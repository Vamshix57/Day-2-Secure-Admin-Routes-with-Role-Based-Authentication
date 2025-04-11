import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [content, setContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage('Please log in to access this page.');
        navigate('/');
        return;
      }
    
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });        
        setIsAdmin(true);
        setContent(response.data.content);
      } catch (error) {
        setIsAdmin(false);
        setErrorMessage(error.response?.status === 403 ? 'You do not have admin access.' : 'Access denied.');
        navigate('/');
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Admin Dashboard</h1>
      {isAdmin ? (
        <div>
          <p>{content}</p>
          <button
            onClick={handleLogout}
            style={{ padding: '10px', marginTop: '10px', background: '#ff4d4d', color: 'white', border: 'none' }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
}

export default Admin;