import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
      <nav className='navbar shadow-sm' style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container">
          <Link to={'/'} className="navbar-brand fs-4 text-lg fw-semibold m-0 py-2">YukPilih</Link>

          <div className='d-flex gap-3 align-items-center'>
            <p className='m-0'>Username</p>
            <button className='btn btn-danger'>Logout</button>
          </div>
        </div>

      </nav>
  )
}
