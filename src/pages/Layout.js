import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

function Layout() {
  return (
    <div className='lg:flex lg:flex-col lg:justify-start lg:items-center lg:h-screen lg:px-20 sm:block flex flex-col space-y-12 h-screen'>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default Layout