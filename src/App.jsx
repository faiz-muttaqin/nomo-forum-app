import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useSearchParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, LANGUAGES } from './contexts/LanguageContext';
import asyncPopulateUsersAndThreads, { asyncPopulateLeaderBoards } from './states/shared/action';
import { asyncGetAuthUser } from './states/authUser/action';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';
import PageNotFound from './components/PageNotFound';
import ToggleTheme from './components/ToggleTheme';
import BtnLanguage from './components/BtnLanguage';
import BtnLoggedIn from './components/BtnLoggedIn';
import AuthModal from './components/AuthModal';
import BtnMotion from './components/BtnMotion';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import UserDetail from './pages/UserDetail';
import { setAuthModalActionCreator } from './states/authModal/action';
import { FaHome, FaRegUser } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const authModal = useSelector((state) => state.authModal);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const handleAuthModal = (value) => {
    dispatch(setAuthModalActionCreator(value));
  };
  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
    dispatch(asyncPopulateLeaderBoards());
    dispatch(asyncGetAuthUser());
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get('search') || '';
  const [keyword, setKeyword] = useState(keywordParam);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'id');
  const changeLanguage = useCallback((langCode) => {
    setLanguage(() => {
      const newLanguage = LANGUAGES.find((l) => l.code === langCode)?.code || 'id';
      localStorage.setItem('language', newLanguage);
      return newLanguage;
    });
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync state with URL param on mount or param change
  useEffect(() => {
    if (keyword !== keywordParam) {
      setKeyword(keywordParam);
    }
  }, [keywordParam]);

  // Update URL param when keyword changes
  const handleKeywordChange = (value) => {
    setKeyword(value);
    setSearchParams(value ? { search: value } : {});
  };
  return (
    <LanguageProvider value={{ language, changeLanguage }}>
      <ThemeProvider value={{ theme, toggleTheme }}>
        <div
          className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : ''}`}
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)'
              : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          }}
        >
          {/* Modern Header */}
          <header className={theme === 'dark' ? 'modern-header-dark' : 'modern-header'}>
            <div className="container-fluid px-4 py-3">
              <div className="row align-items-center g-3">
                <div className="col-12 col-md-6 d-flex align-items-center gap-3 flex-wrap">
                  <img src="./icon.png" style={{ width: '40px', height: '40px' }} className="rounded-circle" />
                  <h2 className={`text-title mb-0 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>NOMO</h2>
                  <Navigation />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end gap-2 flex-wrap">
                  <SearchBar keyword={keyword} onChange={handleKeywordChange} />
                  <BtnLanguage />
                  <ToggleTheme />

                  {authUser ? (
                    <BtnLoggedIn authUser={authUser} />
                  ) : (
                    <BtnMotion
                      id="loginButton"
                      className="btn btn-primary-orange"
                      onClick={() => handleAuthModal(true)}
                    >
                      Login
                    </BtnMotion>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="py-4">
            <Routes>
              <Route path="/" element={<HomePage keyword={keyword} />} />
              <Route path="/leaderboard" element={<LeaderboardPage keyword={keyword} />} />
              <Route path="/user-detail" element={<UserDetail />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <AuthModal show={authModal} onClose={() => handleAuthModal(false)} />
          </main>

          {/* Mobile Navigation */}
          <nav className={`mobile-nav d-md-none ${theme === 'dark' ? 'mobile-nav-dark' : ''}`}>
            <div className="d-flex gap-2">
              <Link 
                to="/" 
                className={`btn d-flex flex-column align-items-center justify-content-center ${
                  location.pathname === '/' 
                    ? 'bg-primary-orange text-white' 
                    : theme === 'dark' 
                      ? 'bg-transparent text-light' 
                      : 'bg-transparent text-dark'
                }`}
              >
                <FaHome />
                <small className="mt-1" style={{ fontSize: '0.7rem' }}>Home</small>
              </Link>
              <Link 
                to="/leaderboard" 
                className={`btn d-flex flex-column align-items-center justify-content-center ${
                  location.pathname === '/leaderboard' 
                    ? 'bg-primary-orange text-white' 
                    : theme === 'dark' 
                      ? 'bg-transparent text-light' 
                      : 'bg-transparent text-dark'
                }`}
              >
                <GiTrophyCup />
                <small className="mt-1" style={{ fontSize: '0.7rem' }}>Leaderboard</small>
              </Link>
              <Link 
                to="/user-detail" 
                className={`btn d-flex flex-column align-items-center justify-content-center ${
                  location.pathname === '/user-detail' 
                    ? 'bg-primary-orange text-white' 
                    : theme === 'dark' 
                      ? 'bg-transparent text-light' 
                      : 'bg-transparent text-dark'
                }`}
              >
                <FaRegUser />
                <small className="mt-1" style={{ fontSize: '0.7rem' }}>Profile</small>
              </Link>
            </div>
          </nav>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
export default App;
