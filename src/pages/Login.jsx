import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setToken } from '../reducer/authSlice';
import { setPassword, setUsername } from '../reducer/loginSlice';
import { useLoginMutation } from '../services/authApi';

const Login = () => {
  const { username, password } = useSelector((state) => state.login);
  const { token } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Check if user has logged in
  if (token) return <Navigate to={'/'} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };

    login(data)
      .unwrap()
      .then((response) => {
        setError(false);

        // Set token in state and localstorage
        dispatch(setToken(response?.access_token));
      })
      .catch(({ data, status }) => {
        setError(data.message);
      });
  };

  return (
    <div className="container vh-100 ">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-6 p-5 border rounded-4 shadow">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5">
              <span>Yuk</span>
              <span className="text-primary">Pilih</span>
            </h1>
            <div className="form-floating mb-3">
              <input
                onChange={({ target }) => {
                  setError(null);
                  dispatch(setUsername(target.value));
                }}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-2">
              <input
                onChange={({ target }) => {
                  setError(null);
                  dispatch(setPassword(target.value));
                }}
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-check mb-3">
              <label htmlFor="showPassword" className="user-select-none">
                Show Password
              </label>
              <input
                type="checkbox"
                id="showPassword"
                className="form-check-input"
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>

            {error && (
              <div className="error-message text-danger">
                <p>{error} !</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-dark px-4 py-2"
            >
              {isLoading ? (
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="spinner-border text-light"
                    role="status"
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  ></div>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
