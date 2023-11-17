import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  setConfirmPassword,
  setNewPassword,
  setOldPassword,
} from '../reducer/resetPasswordSlice';
import { useResetPasswordMutation } from '../services/authApi';

const ResetPassword = () => {
  const {token, shouldReset} = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { old_password, new_password, confirm_password } = useSelector(
    (state) => state.resetPassword
  );

  if(!token) return <Navigate to={'/login'}/>;

  const action = {
    old_password: setOldPassword,
    new_password: setNewPassword,
    confirm_password: setConfirmPassword,
  };

  const handleChange = (e) => {
    setError(null);
    return dispatch(action[e.target.name](e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!old_password || !new_password || !confirm_password) {
      setError('All fields must be filled in !');
      return;
    }

    if(new_password !== confirm_password) {
      setError('The password you entered is not same !')
      return;
    }

    resetPassword({ data: { old_password, new_password }, token })
      .unwrap()
      .then((res) => setSuccess(res.message))
      .catch(({ data }) => {
        setError(data.error)
      });
  };

  return (
    <div className="container vh-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-6 p-5 border rounded-4 shadow">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5">
              <span>Yuk</span>
              <span className="text-primary">Pilih</span>
            </h1>
            <h2 className="mb-4">Reset Password</h2>
            {shouldReset && (
              <p className='text-primary'>Your password is a default password, please change the password first.</p>
            )}
            <div className="form-floating mb-3">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="old_password"
                id="floatingInput"
                placeholder="Enter old password"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Old password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="new_password"
                id="floatingPassword"
                placeholder="Enter new password"
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">New password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name='confirm_password'
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="floatingPassword"
                placeholder="Confirm new password"
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Confirm new password</label>
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
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="error-message text-success">
                <p>{success}...</p>
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
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
