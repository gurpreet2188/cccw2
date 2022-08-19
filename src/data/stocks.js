import { useEffect, useState } from "react"
import Papa from "papaparse"

export default function Stocks({ dataType = '', stockCode = [], time = '15' }) {
    const [data, setData] = useState()
    // const [histData, setHisData] = useState()
    // const [news, setNews] = useState()

    useEffect(() => {

        const asyncLoc = {
            setItem: (k, v) => {
                return Promise.resolve().then(() => {
                    console.log(v)
                    localStorage.setItem(k, JSON.stringify(v))
                })
            },
            getItem: (k) => {
                return Promise.resolve().then(() => {
                    return JSON.parse(localStorage.getItem(k))
                })
            }

        }

        const f = async () => {
            if (localStorage.stocks === undefined) {
                // const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCode}&interval=${time}min&apikey=${process.env.REACT_APP_AV}`)
                const res = await fetch(`https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_INTRADAY&symbol=${stockCode}&interval=${time}min&datatype=json&output_size=compact`, {
                    headers: {
                        'X-RapidAPI-Key': `${process.env.REACT_APP_RGF}`,
                        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
                    }
                })

                const d = await res.json()
                setData(d)
                localStorage.setItem('stocks', JSON.stringify(d))
                return
            } else if (localStorage.stocks) {
                setData(JSON.parse(localStorage.stocks))
                return
            }
        }

        const graphData = async () => {
            if (localStorage.trendingStockVals) {
                setData(JSON.parse(localStorage.trendingStockVals))
            } else {
                let urls = []
                // const u = `https://apistocks.p.rapidapi.com/intraday?symbol=${stockCode}&interval=${time}min&maxreturn=100`
                stockCode.map((v) => {
                    urls.push(`https://apistocks.p.rapidapi.com/intraday?symbol=${v}&interval=${time}min&maxreturn=100`)
                })
                Promise.all(urls.map((v) => {
                    return fetch(v, {
                        headers: {
                            'X-RapidAPI-Key': `${process.env.REACT_APP_RGF}`,
                            'X-RapidAPI-Host': 'apistocks.p.rapidapi.com'
                        }
                    }).then((r) => {
                        return r.json()
                    }).then((data) => {
                        return data
                    })
                })).then((val) => {
                    setData(val)
                    localStorage.setItem('trendingStockVals', JSON.stringify(val))

                }).catch(console.error.bind(console))
            }
            // if (localStorage.graph === undefined) {
            //     const res = await fetch(`https://apistocks.p.rapidapi.com/intraday?symbol=${stockCode}&interval=${time}min&maxreturn=100`, {
            //         headers: {
            //             'X-RapidAPI-Key': `${process.env.REACT_APP_RGF}`,
            //             'X-RapidAPI-Host': 'apistocks.p.rapidapi.com'
            //         }
            //     })
            //     const d = await res.json()
            //     setData(d)
            //     localStorage.setItem('graph', JSON.stringify(d))
            //     return
            // } else if (localStorage.graph) {
            //     setData(JSON.parse(localStorage.graph))
            //     return
            // }
        }


        const stocksCSV = async () => {
            // const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo`)
            Papa.parse(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${stockCode}&interval=${time}min&slice=year1month1&apikey=${process.env.REACT_APP_AV}`, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (r) => {
                    setData(r.data)
                    // console.log(r.data)
                }
            })

        }

        const getNews = async () => {
            // console.log(JSON.parse(localStorage.news), 'news')
            if (localStorage.news === undefined) {
                const res = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.REACT_APP_AV}`)
                const d = await res.json()
                setData(d)
                localStorage.setItem('news', JSON.stringify(d))
                return
            } else if (localStorage.news) {
                setData(JSON.parse(localStorage.news))
                return
            }
            // setData(asyncLoc.setItem('news', await temp).then(() => { return await asyncLoc.getItem('news') }))
        }

        if (dataType === 'data') {
            f()
        } else if (dataType === 'hist') {
            stocksCSV()
        } else if (dataType === 'news') {
            getNews()
            // let temp = getNews()
            // setData(asyncLoc.setItem('news', temp).then(() => { return asyncLoc.getItem('news') }))

        } else if (dataType === 'graph') {
            graphData()
        }



    }, [])

    return data
}
