import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Organize Your Life with <span className="brand-name">TodoApp</span>
          </h1>
          <p className="hero-description">
            A simple, efficient, and beautiful way to manage your daily tasks. 
            Stay organized, boost productivity, and never miss a deadline again.
          </p>
          
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="cta-button primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="cta-button primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="cta-button secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-image">
          <div className="todo-preview">
            <div className="preview-header">
              <div className="preview-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="preview-title">TodoApp</div>
            </div>
            <div className="preview-content">
              <div className="preview-todo completed">
                <span className="checkbox">✓</span>
                <span className="text">Complete project proposal</span>
              </div>
              <div className="preview-todo">
                <span className="checkbox"></span>
                <span className="text">Review quarterly reports</span>
              </div>
              <div className="preview-todo">
                <span className="checkbox"></span>
                <span className="text">Schedule team meeting</span>
              </div>
              <div className="preview-todo completed">
                <span className="checkbox">✓</span>
                <span className="text">Update project documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose TodoApp?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Simple & Intuitive</h3>
              <p>Clean, user-friendly interface that makes managing tasks effortless</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure Authentication</h3>
              <p>JWT-based security with Google OAuth integration for safe access</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Email Notifications</h3>
              <p>Get notified when new tasks are created to stay on top of your goals</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Visual statistics to monitor your productivity and completion rates</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Task Management</h3>
              <p>Create, edit, delete, and organize your todos with ease</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Cloud Sync</h3>
              <p>Access your todos from anywhere with cloud-based storage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to Get Organized?</h2>
          <p>Join thousands of users who have transformed their productivity with TodoApp</p>
          {!isAuthenticated && (
            <div className="cta-actions">
              <Link to="/register" className="cta-button primary large">
                Start Your Journey
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
