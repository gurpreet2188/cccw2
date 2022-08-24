import React, { useState, useEffect } from 'react'
import NewsCarousel from '../components/NewsCarousel'

function News() {
  const [data, setData] = useState()

  useEffect(() => {
    let check = true
    if (check) {
      if (localStorage.news) {
        setData(JSON.parse(localStorage.news))
      }
    }
    return () => {
      check = false
    }
  }, [localStorage.news])

  console.log(data ? data.feed : '', 'news')

  return (
    // Main Section
    <div class="p-2 pb-10 flex flex-col items-center space-y-6 overflow-y-auto">
      {/* <h1>Trending News</h1> */}
      <div class="w-[100%]">
        <NewsCarousel />
      </div>
      <h1  className='self-start text-[28px] tracking-wider font-light'>More News</h1>
      <div class="flex space-y-6 flex-col w-[100%] justify-center content-center items-center md:max-w-[100%]">
        {data ? data?.feed?.slice(0, 10).map((v, i) => {
          if (v.banner_image !== '') {
            return (
              <div key={i} className='flex flex-col md:flex-row md:h-[15rem] w-[100%] border border-black/10 rounded-lg overflow-hidden flex-grow-0 flex-shrink-0'>
                {/* {v.title} */}
                <div style={{ backgroundImage: `url(${v.banner_image})` }} className='bg-no-repeat md:basis-[50%] bg-cover bg-center h-[12rem] md:w-[100%] md:h-[100%] w-[100%] border-b border-black/10'></div>
                <div className='flex flex-col space-y-4 p-4 md:basis-[50%] md:justify-between'>
                  <h1 className='text-xl font-light tracking-wide'>{v.title}</h1>
                  <p className='text-sm C-LINECLAMP-NEWS'>{v.summary}</p>
                  <a href={v.url} className='self-end justify-self-end text-red-500 tracking-wide text-sm'>continue reading...</a>
                </div>
              </div>
            )
          }
        }) : 'Loading..'}
      </div>
      <style>
        {
          `
          .C-LINECLAMP-NEWS {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }
          `
        }
      </style>
    </div>
  )
}

export default News