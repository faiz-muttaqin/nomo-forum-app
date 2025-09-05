import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
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

function App() {
  const authUser = useSelector((state) => state.authUser);
  const authModal = useSelector((state) => state.authModal);
  const dispatch = useDispatch();
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
          className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-body-secondary text-dark'}`}
        >
          <div className="main-container">
            <div className="row align-items-center p-4 bg-secondary bg-opacity-25 ">
              <div className="col-md-6 d-flex align-items-center gap-3">
                <img src="./icon.png" style={{ width: '40px', height: '40px' }} />
                <h2 className="text-title">NOMO</h2>
                <Navigation />
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-end gap-2">
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
            <main className="p-4">
              <Routes>
                <Route path="/" element={<HomePage keyword={keyword} />} />
                <Route path="/leaderboard" element={<LeaderboardPage keyword={keyword} />} />
                <Route path="/user-detail" element={<UserDetail />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <AuthModal show={authModal} onClose={() => handleAuthModal(false)} />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
export default App;
