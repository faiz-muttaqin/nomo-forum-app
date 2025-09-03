import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ThreadList from '../components/ThreadList';
import ThreadFormCard from '../components/ThreadFormCard';

function HomePage({ keyword }) {
  const { threads = [] } = useSelector((states) => states);
  const filteredThreads = keyword
    ? threads.filter(
        (thread) =>
          thread.title.toLowerCase().includes(keyword.toLowerCase()) ||
          thread.body.toLowerCase().includes(keyword.toLowerCase()) ||
          thread.category.toLowerCase().includes(keyword.toLowerCase())
      )
    : threads;
  return (
    <section className="container">
      <ThreadFormCard />
      <ThreadList threads={filteredThreads} />
    </section>
  );
}

HomePage.propTypes = {
  keyword: PropTypes.string,
};

HomePage.defaultProps = {
  keyword: '',
};

export default HomePage;
