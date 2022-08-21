import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

function Layout() {
  return (
    <div className=' md:justify-center md:px-20 sm:block flex flex-col space-y-12 h-screen'>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default Layout