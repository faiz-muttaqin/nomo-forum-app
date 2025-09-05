import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import BtnMotion from './BtnMotion';
export default function ThreadItemLoading() {
  const { theme } = useContext(ThemeContext);
  const cardClass =
    theme === 'dark' ? 'bg-secondary bg-opacity-25 text-light' : 'bg-white text-dark';
  const navLinkClass =
    theme === 'dark'
      ? 'bg-secondary bg-opacity-25 text-light'
      : 'bg-secondary bg-opacity-25 text-dark';

  return (
    <div className={`p-0 ${cardClass} border-0 rounded-2`}>
      <div className="card-body p-3">
        {/* Avatar and user info */}
        <div className="d-flex align-items-center mb-3">
          <div className="flex-shrink-0">
            <span
              className="rounded-circle bg-secondary placeholder"
              style={{ width: 30, height: 30, display: 'inline-block' }}
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <span className="placeholder-glow w-50 d-block mb-1">
              <span
                className="placeholder rounded w-100"
                style={{ height: 18, display: 'inline-block' }}
              />
            </span>
            <span className="placeholder-glow w-75 d-block">
              <span
                className="placeholder rounded w-100"
                style={{ height: 14, display: 'inline-block' }}
              />
            </span>
          </div>
        </div>
        {/* Title */}
        <span className="placeholder-glow w-75 d-block mb-2">
          <span
            className="placeholder rounded w-100"
            style={{ height: 22, display: 'inline-block' }}
          />
        </span>
        {/* Body */}
        <span className="placeholder-glow w-100 d-block mb-2">
          <span
            className="placeholder rounded w-100 mb-2"
            style={{ height: 16, display: 'block' }}
          />
          <span
            className="placeholder rounded w-75 mb-2"
            style={{ height: 16, display: 'block' }}
          />
          <span className="placeholder rounded w-50" style={{ height: 16, display: 'block' }} />
        </span>
        {/* Category badges */}
        <div className="mb-2">
          {[1, 2].map((i) => (
            <span
              key={i}
              className={`badge me-1 bg-opacity-50 placeholder ${theme === 'dark' ? 'bg-info' : 'bg-primary'}`}
              style={{ minWidth: 60, height: 20, display: 'inline-block' }}
            >
              &nbsp;
            </span>
          ))}
        </div>
        {/* Action buttons */}
        <div className="btn-group" role="group" aria-label="React Actions">
          {[1, 2, 3].map((i) => (
            <BtnMotion
              key={i}
              className={`btn d-flex align-items-center gap-2 ${navLinkClass} disabled`}
              disabled
              style={{ minWidth: 80 }}
            >
              <span
                className="placeholder rounded"
                style={{ width: 20, height: 20, display: 'inline-block' }}
              />
              <span
                className="placeholder rounded"
                style={{ width: 30, height: 16, display: 'inline-block' }}
              />
            </BtnMotion>
          ))}
        </div>
      </div>
    </div>
  );
}
