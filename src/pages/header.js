import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/logo'


function Header() {
  const [nav, setNav] = useState(false)
  const [headerImage, setHeaderImage] = useState()
  const currentURL = useLocation()
  // console.log(currentURL, 'test')
  useEffect(() => {
    if (currentURL.pathname !== '/') {
      setHeaderImage(false)
    } else {
      setHeaderImage(true)
    }
  }, [currentURL])

  return (
    <div className={`relative flex flex-row content-center w-[100%] ${headerImage ? 'bg-hero bg-center bg-cover bg-no-repeat md:min-h-[20rem] min-h-[15rem]' : 'sm:h-20'}`}>
      <div className='flex flex-row justify-between p-4 bg-gradient-to-b from-[rgba(0,0,0,0.7)] w-[100%]'>
        {/* <StockLogo/> */}
        <Link to='/'>
          <Logo width={120} height={60} color1={'#f1f1f1'} color2={"#c1c1c1"} color3={"#f1f1f1"} color4={"#f1f1f1"} />
        </Link>
        <nav className='hidden md:block'>
          <div className='flex flex-row text-white space-x-5 p-4 rounded-md backdrop-blur-sm bg-black/30'>
            {/* <Link className='' to='/myassest'>My Assest</Link> */}
            <Link to='/crypto'>Crypto</Link>
            <Link to='/stocks'>Stocks</Link>
            <Link to='/news'>News</Link>
            {/* <Link to='/account'>Account</Link> */}
            <Link to='/about-us'>About Us</Link>
            <Link to='/contact-us'>Contact Us</Link>
          </div>
        </nav>
        <nav x-data="{open : false}" className='block z-20 md:hidden'>
          <button onClick={
            () => {
              setNav(!nav)
              // console.log('button test', nav)
            }
          }>
            <div className='flex flex-col space-y-2'>
              <span className={`BAR-1 ${nav ? 'BAR-1-OPEN' : ''} block h-0.5 w-7 bg-gray-100 transform transition duration-500 ease-in-out`}></span>
              <span className={`BAR-2 ${nav ? 'BAR-2-OPEN' : ''} block h-0.5 w-7 bg-gray-100 transform transition duration-500 ease-in-out`}></span>
              <span className={`BAR-3 ${nav ? 'BAR-3-OPEN' : ''} block h-0.5 w-7 bg-gray-100 transform transition duration-500 ease-in-out`}></span>
            </div>
          </button>
          <style>
            {`
           .BAR-1-OPEN{
              transform: translate(5px, 10px) rotate(45deg);
            }
            .BAR-2-OPEN{
              opacity: 0;
            }
            .BAR-3-OPEN{
              transform: translate(5px, -10px) rotate(-45deg);
            }
            `}
          </style>
        </nav>
      </div>

      <div className='absolute text-white top-[8rem] text-center w-[50vw] left-[25%]'>
        <p className='tracking-[1px] text-[24px]' style={{ display: headerImage ? '' : 'none' }}>We Are Stockto, blah blah blah</p>
      </div>

      <div className={`fixed ${nav ? 'NAV-OPEN' : 'NAV-CLOSE'} top-0 right-0 z-10 flex flex-col space-y-5 backdrop-blur-sm bg-black/30 py-28 px-4 h-screen w-[50vw] transform transition duration-500 ease-in-out text-white lg:hidden`}>
        {/* <Link className='mt-16' to='/myassest'>My Assest</Link> */}
        <Link to='/crypto'>Crypto</Link>
        <Link to='/stocks'>Stocks</Link>
        <Link to='/news'>News</Link>
        {/* <Link to='/account'>Account</Link> */}
        <Link to='/about-us'>About Us</Link>
        <Link to='/contact-us'>Contact Us</Link>

        {/* <p className='mt-16'></p> */}
        {/* <p>Markets</p>
            <p>Stocks</p>
            <p>News</p>
            <p>Account</p>
            <p>About Us</p> */}

        <style>
          {
            `
                .NAV-OPEN {
                  transform : translateX(0%);
                }
                .NAV-CLOSE {
                  transform : translateX(100%);
                }
                `
          }
        </style>

      </div>
    </div>
  )
}

export default Header