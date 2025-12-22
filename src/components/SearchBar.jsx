import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import PropTypes from 'prop-types';

export default function SearchBar({ keyword, onChange }) {
  const { theme } = useContext(ThemeContext);
  const inputClass =
    theme === 'dark'
      ? 'form-control form-control-modern bg-dark bg-opacity-50 text-light border-secondary'
      : 'form-control form-control-modern bg-white text-dark border-secondary';
  return (
    <div className="input-group" style={{ minWidth: '200px', maxWidth: '300px' }}>
      <input
        className={inputClass}
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label="Search"
      />
    </div>
  );
}
SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
