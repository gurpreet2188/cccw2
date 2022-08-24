import React, { useEffect, useState } from 'react'
import Carousel from 'nuka-carousel/lib/carousel'
import Stocks from '../data/stocks'

function NewsCarousel() {
    const news = Stocks({ dataType: 'news' })

    const [filter, setFilter] = useState([{
        'title': 'No News, Market Crashed!!!',
        'summary': 'Every man for himself, RUNNNN!!!'
    }])

    const winSize = () => {
        if (typeof window === undefined) {
            return
        }
        return window.innerWidth >= 768
    }


    useEffect(() => {
        let check = true
        const filterNews = () => {
            let temp = []
            if (news?.feed) {
                news?.feed.map((v, i) => {
                    // console.log('news')
                    if (v.overall_sentiment_label === 'Bullish' && v.banner_image !== '') {
                        if (temp.length <= 4) { temp.push(v) }
                    }
                })
                if (temp === [] || temp.length <= 3) {
                    news?.feed.map((v, i) => {
                        if (v.overall_sentiment_label === 'Somewhat-Bullish' && v.banner_image !== '') {
                            if (temp.length <= 4) { temp.push(v) }
                        }
                    })
                }
                setFilter(temp)

            }
        }
        if (check) {
            filterNews()

        }
        return () => {
            check = false
        }

    }, [news])

    return (

        <div className='px-6 flex flex-col space-y-4 w-[100%]'>
            {/* <h2 className='tracking-[0.5px] md:text-[18px]'>Top Articles</h2> */}
            <Carousel defaultControlsConfig={{
                nextButtonStyle: {
                    display: 'none'
                },
                prevButtonStyle: {
                    display: 'none'
                },
                autoplay: false,
                autoplayReverse: true,
                pagingDotsContainerClassName: 'C-DOTS',
                pagingDotsStyle: {
                    fill: winSize() ? 'white' : 'black',


                }
            }}>
                {filter ? filter?.map((v, i) => {
                    if (i <= 4) {
                        return (
                            <div key={i}>
                                <div  className=" mb-8 h-60 bg-cover bg-no-repeat bg-center rounded-md overflow-hidden md:hidden block" style={{ backgroundImage: `url(${v.banner_image})` }}>
                                    <div className='flex flex-col justify-end  bg-no-repeat bg-gradient-to-b to-[rgba(0,0,0,0.5)] from-white/0 w-[100%] h-[100%] p-2'>
                                        <a href={v.url} target='_blank' className={`C-LINECLAMP text-sm text-white text-left font-bold py-1 `}>{v.title}...</a>
                                    </div>
                                </div>

                                <div className='hidden md:flex justify-center content-center space-x-0 rounded-lg overflow-hidden h-[20rem] w-[100%] border border-black/10'>
                                    <div style={{ backgroundImage: `url(${v.banner_image})` }} className='bg-cover bg-no-repeat bg-center w-[50%]'></div>
                                    <div className=' w-[50%] h-[100%] bg-no-repeat bg-center' style={{ backgroundImage: `url(${v.banner_image})` }}>
                                        <div className='flex flex-col justify-center space-y-6 backdrop-blur-sm bg-black/80 text-white h-[100%] p-4'>
                                            <h1 className='text-[24px] font-extralight '>{v.title}</h1>
                                            <p className='tracking-wider text-sm'>{v.summary}</p>
                                            <a href={v.url} target='_blank' className='justify-self-end self-end text-red-400'>Continue Reading...</a>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        )
                    }
                }) : 'Loading...'}

            </Carousel>
            <style>
                {
                    `
                            .C-DOTS {
                                gap: 6px;
                            }
                            @media only screen and (min-width: 768px) {
                                .C-DOTS {
                                    gap: 6px;
                                    left: 60px;
                                    transform: scale(1.6,1.6)
                                }
                            }
                            .C-LINECLAMP {
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                text-overflow: ellipsis;
                            }
                            `
                }
            </style>
        </div>
    )
}

export default NewsCarousel