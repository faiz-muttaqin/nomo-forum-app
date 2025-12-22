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
    const baseClass = theme === 'dark' 
      ? 'bg-secondary bg-opacity-25 text-light border-secondary' 
      : 'bg-light text-dark border-light';
    const activeClass = 'bg-primary-orange text-white border-primary-orange';

    return `btn d-flex align-items-center justify-content-center ${isActive ? activeClass : baseClass}`;
  };

  const iconStyle = { fontSize: '1.2rem' };

  return (
    <nav className="d-none d-md-block">
      <div className="btn-group" role="group" aria-label="Navigation">
        <Link to="/" className={getNavLinkClass('/')} title="Home">
          <FaHome style={iconStyle} />
        </Link>
        <Link to="/leaderboard" className={getNavLinkClass('/leaderboard')} title="Leaderboard">
          <GiTrophyCup style={iconStyle} />
        </Link>
        <Link to="/user-detail" className={getNavLinkClass('/user-detail')} title="Profile">
          <FaRegUser style={iconStyle} />
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
