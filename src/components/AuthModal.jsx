import React, { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ThemeContext from '../contexts/ThemeContext';
import PropTypes from 'prop-types';

export default function AuthModal({ show, onClose }) {
  const [mode, setMode] = useState('login');
  const { theme } = useContext(ThemeContext);
  const modalContentClass = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';

  if (!show) return null;

  // Handler for backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-secondary bg-opacity-25"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog" style={{ minWidth: 350 }}>
        <div className={`modal-content p-5 rounded ${modalContentClass}`}>
          <button className="btn-close ms-auto" onClick={onClose} />
          {mode === 'login' ? (
            <>
              <LoginForm onLogin={onClose} />
              <div className="text-center mt-2 d-flex flex-column justify-content-center">
                <span>Don`t have an account? </span>
                <button className="btn btn-link p-0" onClick={() => setMode('register')}>
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <RegisterForm onRegister={() => setMode('login')} />
              <div className="text-center mt-2 d-flex flex-column justify-content-center">
                <span>Already have an account? </span>
                <button className="btn btn-link p-0" onClick={() => setMode('login')}>
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
AuthModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
