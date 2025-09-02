import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import PropTypes from 'prop-types';

export default function SearchBar({ keyword, onChange }) {
  const { theme } = useContext(ThemeContext);
  const inputClass =
    theme === 'dark'
      ? 'form-control border-0 bg-secondary bg-opacity-25 text-light border-secondary'
      : 'form-control border-0 bg-light text-dark border-secondary';
  return (
    <div className="input-group">
      <input
        className={inputClass}
        type="text"
        placeholder="Cari..."
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label="Cari "
      />
    </div>
  );
}
SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
