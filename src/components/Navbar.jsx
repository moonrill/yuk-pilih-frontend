import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../services/authApi';

// eslint-disable-next-line react/prop-types
export const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(token)
      .then(() => navigate('/login'))
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar shadow-sm navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex align-items-center gap-3">
          <Link
            to={'/'}
            className="navbar-brand fs-4 text-lg fw-semibold m-0 py-2"
          >
            <span>Yuk</span>
            <span className="text-primary">Pilih</span>
          </Link>

          {user?.role === 'user' && (
            <ul className="navbar-nav d-flex flex-row gap-3">
              <Link to={'/'} className="nav-link">
                Home
              </Link>
              <Link to={'/your-votes'} className="nav-link">
                Your votes
              </Link>
              <Link to={'/expired-polls'} className="nav-link">
                Expired polls
              </Link>
            </ul>
          )}
        </div>

        <div className="d-flex gap-3 align-items-center">
          <p className="m-0 text-white">{user?.username}</p>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
            disabled={isLoading}
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
              'Logout'
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
