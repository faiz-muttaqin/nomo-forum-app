import React, { useContext, useState, useEffect } from 'react';

import LanguageContext, { translations } from '../contexts/LanguageContext';
import ThreadItemLoading from './ThreadItemLoading';
import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

export default function ThreadList({ threads }) {
  const { language } = useContext(LanguageContext);
  const [, setT] = useState(translations[language] || translations.id);
  useEffect(() => {
    setT(translations[language] || translations.id);
  }, [language]);
  if (!threads || threads.length === 0) {
    return (
      <>
        <div className="d-flex flex-column gap-3 mt-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <ThreadItemLoading key={`loading-${index}`} />
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="d-flex flex-column gap-3 mt-3">
      {threads.map((thread) => (
        <div key={thread.id} className="fade-in-up">
          <ThreadItem {...thread} />
        </div>
      ))}
    </div>
  );
}
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

ThreadList.defaultProps = {
  threads: [],
};
