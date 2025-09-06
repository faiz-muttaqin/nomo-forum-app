import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthModalActionCreator } from '../states/authModal/action';
import { asyncSetAuthUser } from '../states/authUser/action';
import BtnMotion from './BtnMotion';
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    dispatch(asyncSetAuthUser({ email, password }));
    setLoading(false);
    dispatch(setAuthModalActionCreator(false));
  };

  return (
    <div className="d-flex">
      <form style={{ minWidth: 320 }} onSubmit={handleSubmit}>
        <h3 className="mb-3 text-center">Login</h3>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        {success && <div className="alert alert-success py-1">{success}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <BtnMotion
          type="submit"
          id="loginSubmitButton"
          className="btn btn-primary-orange w-100"
          data-testid="loginSubmitButton"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </BtnMotion>
      </form>
    </div>
  );
}
