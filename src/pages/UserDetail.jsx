import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogIn } from 'react-icons/fi';
import { setAuthModalActionCreator } from '../states/authModal/action';
import BtnMotion from '../components/BtnMotion';
const UserDetail = () => {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const handleAuthModal = () => {
    if (!authUser) {
      dispatch(setAuthModalActionCreator(true));
    }
  };
  if (!authUser) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">User Profile</h2>
            <div className="text-center mb-4">
              <p className="text-muted mb-4">Please log in to view your profile details.</p>
              <BtnMotion
                className="btn btn-primary-orange d-inline-flex align-items-center"
                onClick={handleAuthModal}
              >
                <FiLogIn className="me-2" />
                Log In
              </BtnMotion>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
      <div
        className="shadow-sm w-100 bg-white bg-opacity-25 rounded-3"
        style={{ maxWidth: '400px' }}
      >
        <div className="p-4">
          <h2 className="card-title text-center mb-4">User Profile</h2>
          <div className="d-flex flex-column align-items-center">
            <img
              src={authUser?.avatar}
              alt={`${authUser?.name}'s avatar`}
              className="rounded-circle mb-3 border border-0"
              style={{ width: '128px', height: '128px' }}
            />
            <h3 className="fw-semibold">{authUser?.name}</h3>
            <p className="text-muted">{authUser?.email}</p>
            <div className="w-100 border-top mt-4 pt-4">
              <div className="mb-3">
                <p className="small fw-medium text-muted mb-1">User ID</p>
                <p>{authUser?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
