import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassword, setUsername } from '../reducer/loginSlice';
import { useLoginMutation } from '../services/authApi';
import token from '../utils/token';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);
  const { username, password } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };

    login(data)
      .unwrap()
      .then((response) => {
        setError(false);

        console.log(response);

        // Set token in localstorage
        token.set(response.access_token);

        // Redirect to poll page
        navigate('/');
      })
      .catch(({ data }) => setError(data.message));
  };

  return (
    <div className="container vh-100 ">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-6 p-5 border rounded-4 shadow">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5">YukPilih</h1>
            <div className="form-floating mb-3">
              <input
                onChange={({ target }) => dispatch(setUsername(target.value))}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={({ target }) => dispatch(setPassword(target.value))}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>

            {error && (
              <div className="error-message text-danger">
                <p>{error} !</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary px-4 py-2"
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
