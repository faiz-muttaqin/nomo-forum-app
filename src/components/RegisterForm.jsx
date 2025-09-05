import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import PropTypes from 'prop-types';
import BtnMotion from './BtnMotion';

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    console.log('result');
    console.log(result);
    console.log('result.success');
    console.log(result.success);
    if (result.status == 'success') {
      setSuccess('Register success! You can now login.');
      if (onRegister) onRegister();
    } else {
      setError(`Register failed! Please try again.${result.message || ''}`);
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form style={{ minWidth: 320 }} onSubmit={handleSubmit}>
        <h3 className="mb-3 text-center">Register</h3>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        {success && <div className="alert alert-success py-1">{success}</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>
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
        <BtnMotion type="submit" className="btn btn-warning w-100 mb-3" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </BtnMotion>
      </form>
    </div>
  );
}
RegisterForm.propTypes = {
  onRegister: PropTypes.func,
};
