import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaRegUser } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';
import ThemeContext from '../contexts/ThemeContext';

function Navigation() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const getNavLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark';
    const activeClass = 'bg-primary-orange text-white';

    return `btn d-flex align-items-center gap-2 ${isActive ? activeClass : baseClass} ${isActive ? '' : 'bg-opacity-25'}`;
  };

  const iconStyle = { fontSize: '1.5rem' };

  return (
    <nav>
      <div className="btn-group" role="group" aria-label="Navigation">
        <Link to="/" className={getNavLinkClass('/')}>
          <FaHome style={iconStyle} />
        </Link>
        <Link to="/leaderboard" className={getNavLinkClass('/leaderboard')}>
          <GiTrophyCup style={iconStyle} />
        </Link>
        <Link to="/user-detail" className={getNavLinkClass('/user-detail')}>
          <FaRegUser style={iconStyle} />
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
