import React, { useEffect, useState } from 'react';
import { fetchHealth } from '../services/api';

export const Home = () => {
  const [apiStatus, setApiStatus] = useState('Checking connection...');

  useEffect(() => {
    fetchHealth()
      .then((data) => setApiStatus(data.message || 'API connected successfully!'))
      .catch(() => setApiStatus('Backend not connected or offline'));
  }, []);

  return (
    <main className="home-container">
      <section className="hero">
        <h1>Welcome to <span className="highlight">VibeLane</span></h1>
        <p className="subtitle">Your next-generation lifestyle & e-commerce destination.</p>
        <div className="status-badge">
          Backend Status: <strong>{apiStatus}</strong>
        </div>
      </section>
    </main>
  );
};
