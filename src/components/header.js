import React, { useState } from 'react'
import Logo from '../assets/logo'


function Header() {
  const [nav, setNav] = useState(false)
  // const fontStyle = {
  //     fontFamily: 
  // }
  return (
    <div className='relative flex flex-row content-center h-40 w-screen bg-hero bg-cover bg-no-repeat'>
      <div className='flex flex-row justify-between p-4 bg-gradient-to-b from-[rgba(0,0,0,0.5)] w-screen'>
        {/* <StockLogo/> */}
        <Logo width={120} height={60} color1={'#f1f1f1'} color2={"#c1c1c1"} color3={"#f1f1f1"} color4={"#f1f1f1"} />
        <nav x-data="{open : false}" className='z-20 lg:hidden'>
          <button onClick={
            ()=>{
              setNav(!nav)
              console.log('button test', nav)
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

      <div className={`fixed ${nav ? 'NAV-OPEN' : 'NAV-CLOSE'} top-0 right-0 flex flex-col space-y-5 backdrop-blur-sm bg-black/30 p-6 h-screen w-[50vw] transform transition duration-500 ease-in-out text-white lg:hidden`}>
            <p className='mt-16'>My Assest</p>
            <p>Markets</p>
            <p>News</p>
            <p>Account</p>
            <p>About Us</p>

            <style>
              {
                `
                .NAV-OPEN {
                  transform : translateX(0%)
                }
                .NAV-CLOSE {
                  transform : translateX(100%)
                }
                `
              }
            </style>

          </div>
    </div>
  )
}

export default Header