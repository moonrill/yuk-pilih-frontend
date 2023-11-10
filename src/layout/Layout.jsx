import React from 'react'
import { Outlet } from 'react-router-dom'
import { Fab } from '../components/Fab'
import { Navbar } from '../components/Navbar'

export const Layout = () => {
  return (
    <>
      <main>
        <Navbar/>
        <Outlet/>
        <Fab/>
      </main>
    </>
  )
}
