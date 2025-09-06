import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const BtnMotion = ({ children, className, ...restProps }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={className}
      {...restProps}
    >
      {children}
    </motion.button>
  );
};

export default BtnMotion;

BtnMotion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BtnMotion.defaultProps = {
  className: '',
};
