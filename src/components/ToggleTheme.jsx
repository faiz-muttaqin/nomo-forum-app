import React from 'react';
import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import BtnMotion from './BtnMotion';
function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <BtnMotion
            className={`btn btn-${theme === 'light' ? 'dark' : 'light'} btn-sm me-2`}
            onClick={toggleTheme}
            title="Ganti tema"
          >
            {theme === 'light' ? (
              <span role="img" aria-label="Dark">
                <FaMoon />
              </span>
            ) : (
              <span role="img" aria-label="Light">
                <FaSun />
              </span>
            )}
          </BtnMotion>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
