import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../services/authApi';

// eslint-disable-next-line react/prop-types
export const Navbar = () => {
  const {token, user} = useSelector((state) => state.auth);
  const [logout, {isLoading}] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(token)
      .then(() => navigate('/login'))
      .catch((err) => console.log(err));
  }

  return (
      <nav className='navbar shadow-sm navbar-dark bg-dark'>
        <div className="container">
          <Link to={'/'} className="navbar-brand fs-4 text-lg fw-semibold m-0 py-2">
          <span>Yuk</span>
              <span className='text-primary'>Pilih</span>
          </Link>

          <div className='d-flex gap-3 align-items-center'>
            <p className='m-0 text-white'>
              {user?.username}
            </p>
            <button className='btn btn-danger' onClick={handleLogout} disabled={isLoading}>Logout</button>
          </div>
        </div>

      </nav>
  )
}
