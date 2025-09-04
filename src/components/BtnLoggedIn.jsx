import React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { asyncPopulateThreads } from '../states/shared/action';
import PropTypes from 'prop-types';
export default function BtnLoggedIn({ authUser = null }) {
  const dispatch = useDispatch();
  const handleAuthLogOut = () => {
    dispatch(asyncUnsetAuthUser());
    dispatch(asyncPopulateThreads());
  };
  return (
    <div className="dropdown">
      {authUser ? (
        <button
          className="flex-shrink-0 rounded-circle border-0"
          type="button"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            className="rounded-circle"
            src={authUser.avatar}
            alt={authUser.id}
            title={authUser.name}
            style={{ height: '36px' }}
          />
        </button>
      ) : (
        <button
          className="btn rounded-circle"
          type="button"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <IoPersonCircleOutline />
        </button>
      )}

      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
        <li className="dropdown-item-text">
          <div className="fw-bold">{authUser.name}</div>
          <div className="text-muted small">{authUser.email}</div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item text-danger" id='logoutButton' onClick={handleAuthLogOut}>
            <BsBoxArrowRight />
            {' Logout'}
          </button>
        </li>
      </ul>
    </div>
  );
}
BtnLoggedIn.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
};
