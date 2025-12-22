import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ThemeContext from '../contexts/ThemeContext'; // Make sure this import path is correct
import { asyncPopulateLeaderBoards } from '../states/shared/action';

function LeaderboardPage({ keyword }) {
  const leaderboards = useSelector((states) => states.leaderboards);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(asyncPopulateLeaderBoards());
  }, [dispatch]);

  // Filter leaderboards based on keyword
  const filteredLeaderboards = leaderboards.filter((leaderboardItem) => {
    if (!keyword) return true;

    const lowerKeyword = keyword.toLowerCase();
    return (
      leaderboardItem.user.name.toLowerCase().includes(lowerKeyword) ||
      leaderboardItem.user.email.toLowerCase().includes(lowerKeyword)
    );
  });
  return (
    <div className="container">
      <div className="main-feed-container">
        <h2 className={`text-center mb-4 fw-bold ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
          🏆 Leaderboard
        </h2>
        
        <div className={`card border-0 p-4 ${theme === 'dark' ? 'modern-card-dark' : 'modern-card'}`}>
          {/* Header Row */}
          <div className="row align-items-center py-3 mb-3 border-bottom">
            <div className="col-2 text-center">
              <strong>Rank</strong>
            </div>
            <div className="col-7">
              <strong>User</strong>
            </div>
            <div className="col-3 text-center">
              <strong>Score</strong>
            </div>
          </div>

          {/* Leaderboard Items */}
          {filteredLeaderboards.map((leaderboardItem, index) => (
            <div 
              key={leaderboardItem.user.id} 
              className={`row align-items-center py-3 mb-2 rounded-3 fade-in-up ${
                theme === 'dark' ? 'bg-dark bg-opacity-25' : 'bg-light'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rank */}
              <div className="col-2 text-center">
                <div className={`fw-bold fs-4 ${
                  index === 0 ? 'text-warning' : 
                  index === 1 ? 'text-secondary' :
                  index === 2 ? 'text-danger' :
                  theme === 'dark' ? 'text-light' : 'text-dark'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
              </div>

              {/* User Info */}
              <div className="col-7">
                <div className="d-flex align-items-center">
                  <img
                    src={leaderboardItem.user.avatar}
                    alt={`${leaderboardItem.user.name}'s avatar`}
                    className="rounded-circle me-3 avatar-md"
                  />
                  <div>
                    <h6 className={`mb-0 fw-semibold ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
                      {leaderboardItem.user.name}
                    </h6>
                    <small className={theme === 'dark' ? 'text-light opacity-75' : 'text-muted'}>
                      {leaderboardItem.user.email}
                    </small>
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="col-3 text-center">
                <span className={`badge badge-modern ${
                  theme === 'dark' ? 'bg-primary bg-opacity-25 text-primary' : 'bg-primary text-white'
                } fs-6`}>
                  {leaderboardItem.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

LeaderboardPage.propTypes = {
  keyword: PropTypes.string,
};

LeaderboardPage.defaultProps = {
  keyword: '',
};

export default LeaderboardPage;
