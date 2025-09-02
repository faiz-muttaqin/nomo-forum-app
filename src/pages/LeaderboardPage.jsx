import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ThemeContext from '../contexts/ThemeContext'; // Make sure this import path is correct
import { asyncPopulateLeaderBoards } from '../states/shared/action';

function LeaderboardPage({ keyword }) {
  const { leaderboards = [] } = useSelector((states) => states);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPopulateLeaderBoards());
  }, []);
  // Theme-based classes
  const containerClass = theme === 'dark' ? 'container py-4 text-light' : 'container py-4';
  const headerRowClass =
    theme === 'dark'
      ? 'row bg-secondary text-white rounded-pill mb-3 py-2'
      : 'row bg-dark text-white rounded-pill mb-3 py-2';
  const itemRowClass =
    theme === 'dark'
      ? 'row mb-3 align-items-center rounded-5 shadow bg-dark bg-opacity-75'
      : 'row mb-3 align-items-center rounded-5 shadow bg-light';
  const textClass = theme === 'dark' ? 'text-light' : 'text-dark';
  const mutedTextClass = theme === 'dark' ? 'text-light-50' : 'text-muted';

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
    <div className={containerClass}>
      <h1 className="text-center mb-4">Leaderboard</h1>
      <div>
        <div className="p-3">
          <div className={headerRowClass}>
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

          {filteredLeaderboards.map((leaderboardItem, index) => (
            <div key={leaderboardItem.user.id} className={itemRowClass}>
              <div className="col-1 text-center">
                <div className={`fw-bold p-2 ${textClass}`}>{index + 1}</div>
              </div>

              <div className="col-8">
                <div className="p-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={leaderboardItem.user.avatar}
                      alt={`${leaderboardItem.user.name}'s avatar`}
                      className="rounded-circle me-3"
                      width="48"
                      height="48"
                    />
                    <div>
                      <h6 className={`mb-0 ${textClass}`}>{leaderboardItem.user.name}</h6>
                      <small className={mutedTextClass}>{leaderboardItem.user.email}</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-3 text-center">
                <div className="p-2">
                  <span className={`fw-bold ${textClass}`}>{leaderboardItem.score} Pts</span>
                </div>
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
