import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Navbar = ({loading}) => {
  const user = useSelector((state) => state.auth.user);
  return (
      <nav className='navbar shadow-sm' style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container">
          <Link to={'/'} className="navbar-brand fs-4 text-lg fw-semibold m-0 py-2">YukPilih</Link>

          <div className='d-flex gap-3 align-items-center'>
            <p className='m-0'>
              {loading && 'Loading...'}
              {!loading && user.username}
            </p>
            <button className='btn btn-danger'>Logout</button>
          </div>
        </div>

      </nav>
  )
}
