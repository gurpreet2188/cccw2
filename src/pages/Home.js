import React from 'react'
import CryptoTrending from '../components/CryptoTrending'
import NewsCarousel from '../components/NewsCarousel'
import StocksTredning from '../components/stocksTredning'

function Home() {
  return (
    <>
      <NewsCarousel />
      <div className='flex flex-col md:flex-row md:space-x-[calc(100vw/10)] md:space-y-0 space-y-4 space-x-0 w-[100%] justify-center content-center'>
        <StocksTredning />
        <CryptoTrending />
      </div>
    </>
  )
}

export default Home