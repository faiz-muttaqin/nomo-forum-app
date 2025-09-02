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
        <div className="row g-3 ">
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="col-12" key={`loading-${index}`}>
              <ThreadItemLoading />
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="row g-3">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
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
