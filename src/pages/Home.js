import React, { useEffect, useState } from 'react'
import CryptoTrending from '../components/CryptoTrending'
import NewsCarousel from '../components/NewsCarousel'
import StocksTredning from '../components/stocksTredning'

function Home() {
  const [load, setLoad] = useState(false)
  useEffect(() => {
    let check = true
    const clearData = () =>{
      localStorage.clear()
      localStorage.setItem('time', JSON.stringify(new Date().getTime()))
    }

    if (check) {
      if(localStorage.time) {
        const checkTime = new Date(parseInt(localStorage.time))
        const currentTime = new Date()
        console.log(checkTime)
        const diffTime = currentTime - checkTime.getTime()
        const secInHr = Math.floor( diffTime / 1000 / 60)
        console.log(secInHr)
        if(secInHr > 1440) {
          clearData()
          setLoad(true)
        }
        setLoad(true)
        
      }else {
        clearData()
        setLoad(true)
      }
    }
    return () => {
      check = false
    }
  }, [])
  
  if(load) {
    return (
      <>
        {/* <NewsCarousel /> */}
        <div className='flex flex-col md:flex-row md:space-x-[calc(100vw/10)] md:space-y-0 space-y-4 space-x-0 w-[100%] justify-center content-center'>
          <StocksTredning />
          <CryptoTrending />
        </div>
      </>
    )

  }else {
    return(
      <>Loading....</>
    )
  }

}

export default Home