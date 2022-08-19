import React, { useEffect, useState } from 'react'
import Carousel from 'nuka-carousel/lib/carousel'
import Stocks from '../data/stocks'

function News() {
    const news = Stocks({dataType : 'news'})

    const [filter, setFilter] = useState([{
        'title': 'No News, Market Crashed!!!',
        'summary': 'Every man for himself, RUNNNN!!!'
    }])


    useEffect(() => {
        const filterNews = () => {
            let temp = []
            if (news?.feed) {
                news?.feed.map((v, i) => {
                    console.log('news')
                    if (v.overall_sentiment_label === 'Bullish') {
                        if (temp.length <= 4) { temp.push(v) }
                    }
                })
                if (temp === [] || temp.length <= 3) {
                    news?.feed.map((v, i) => {
                        if (v.overall_sentiment_label === 'Somewhat-Bullish') {
                            if (temp.length <= 4) { temp.push(v) }
                        }
                    })
                }
                setFilter(temp)

            }
        }
        filterNews()

    }, [news])

    return (

        <div className='px-8 flex flex-col space-y-2'>
            <h2 className='tracking-[0.5px]'>Tredning News</h2>
            <Carousel defaultControlsConfig={{
                nextButtonStyle: {
                    display: 'none'
                },
                prevButtonStyle: {
                    display: 'none'
                },
                autoplay: false,
                autoplayReverse: true,
                pagingDotsContainerClassName: 'C-DOTS'
            }}>
                {filter ? filter?.map((v, i) => {
                    if (i <= 4) {
                        return (
                            <div key={i} className="text-center mb-8">
                                <a href='/' className='C-LINECLAMP text-sm'>{v.title}</a>
                                {/* <p className='text-sm'>{v?.summary}</p> */}
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

export default News