import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import BtnMotion from './BtnMotion';
import ThemeContext from '../contexts/ThemeContext';
import PropTypes from 'prop-types';

export default function AuthModal({ show, onClose }) {
  const [mode, setMode] = useState('login');
  const { theme } = useContext(ThemeContext);
  const modalContentClass = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';

  // Framer Motion modal animation variants
  const modalVariants = {
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Handler for backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="bg-transparent bg-opacity-25"
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
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <motion.div
            className="modal-dialog"
            style={{ minWidth: 350 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          >
            <div className={`modal-content p-5 rounded ${modalContentClass}`}>
              <BtnMotion className="btn-close ms-auto" onClick={onClose} />
              {mode === 'login' ? (
                <>
                  <LoginForm onLogin={onClose} />
                  <div className="text-center mt-2 d-flex flex-column justify-content-center">
                    <span>Don`t have an account? </span>
                    <BtnMotion className="btn btn-link p-0" onClick={() => setMode('register')}>
                      Register
                    </BtnMotion>
                  </div>
                </>
              ) : (
                <>
                  <RegisterForm onRegister={() => setMode('login')} />
                  <div className="text-center mt-2 d-flex flex-column justify-content-center">
                    <span>Already have an account? </span>
                    <BtnMotion className="btn btn-link p-0" onClick={() => setMode('login')}>
                      Login
                    </BtnMotion>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
AuthModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
