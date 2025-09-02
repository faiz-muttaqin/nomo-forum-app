import React from 'react';
import { LanguageConsumer, LANGUAGES } from '../contexts/LanguageContext';

export default function BtnLanguage() {
  return (
    <LanguageConsumer>
      {({ language, changeLanguage }) => (
        <div className="dropdown">
          <button
            className="btn btn-sm bg-warning bg-opacity-75 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {LANGUAGES.find((l) => l.code === language)
              ?.code?.slice(0, 2)
              .toUpperCase() || 'ID'}
          </button>
          <ul className="dropdown-menu">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  className={`dropdown-item${language === lang.code ? ' active' : ''}`}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </LanguageConsumer>
  );
}
