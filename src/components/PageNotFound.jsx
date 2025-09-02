import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/ThemeContext'; // Assuming you have a theme context

function PageNotFound({ message }) {
  const { theme } = React.useContext(ThemeContext) || { theme: 'light' }; // Default to light if no context

  return (
    <div
      className={`container min-vh-100 d-flex align-items-center justify-content-center bg-${theme === 'dark' ? 'dark text-light' : 'light text-dark'}`}
    >
      <div className="text-center p-5">
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="display-6 mb-3">Page Not Found</h2>
        <p className="lead mb-4">{message || 'Halaman yang anda cari tidak ada.'}</p>
        <Link to="/" className={`btn btn-${theme === 'dark' ? 'light' : 'primary'} px-4 py-2`}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

PageNotFound.propTypes = {
  message: PropTypes.string,
};

export default PageNotFound;
