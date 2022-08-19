import React, { useEffect, useState } from 'react'
import Stocks from '../data/stocks'
import stocksIntra from '../data/stocksIntra'
import Charts from './charts'

function StocksTredning() {
    const [tredning, setTrending] = useState()
    const [data, setData] = useState([])
    const [vals, setVals] = useState([])
    const [finalVals, setFinalVals] = useState([])
    const [xAxis, setXAxis] = useState([])
    const [symbols, setSymbols] = useState([])
    const [shortlist, setShortList] = useState()

    const size = 100 // console.log(graph?.Results[0])

    useEffect (()=>{
      
            if (data?.length > 0) {
                // console.log(data, 'test')
                data?.map((v,i)=>{
                    // console.log(v.Results, 'test')
                    //get unix date
                    const lastUnixDate = Date.parse(v?.Results[v?.Results?.length - 1].Date.split(' ')[0])
                    //filter through 
                    const filteredData = v?.Results.filter(f => Date.parse(f?.Date.split(' ')[0] ) === lastUnixDate) 
                    // console.log(filteredData, 'test')
                    //set short listed
                    setShortList(filteredData)
                    // baseNum
                    const baseNum = size / filteredData.length
                    // console.log(baseNum, 'test')
                    //set vals
                    if(shortlist === undefined) {
                        filteredData.map((fv, fi) =>{
                            setVals(vals => [...vals, parseFloat(fv?.High)])
                            setXAxis(xAxis => [...xAxis, (baseNum * fi)])
                        })
                    }
                })
            }
      
    },[data])

    useEffect(() => {

        if (tredning?.items) {
            const temp = tredning.items.slice(0, 10)
            console.log(temp[0].info.ticker_symbols[0])
            temp.map((v,i)=>{
                setSymbols(symbols => [...symbols, v.info.ticker_symbols[0]])
            })
           
        }

    }, [tredning])

    useEffect(()=>{
        if(symbols.length > 0) {
            setData(stocksIntra(symbols, '30'))
        }
    },[symbols])

    console.log(data)

    useEffect(() => {
        let t = []
        for (let i = 0; i < vals.length; i += shortlist.length) {
            const c = vals.slice(i, i + shortlist.length)
            t.push(c)
        }
        setFinalVals(t)
        // console.log(t, 'test')
    }, [shortlist, vals])
    console.log('test', vals)




    useEffect(() => {
        const f = async () => {
            const res = await fetch('https://google-finance4.p.rapidapi.com/market-trends/?t=most-active&hl=en&gl=us', {
                headers: {
                    'X-RapidAPI-Key': `${process.env.REACT_APP_RGF}`,
                    'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
                }
            })

            const d = await res.json()
            localStorage.setItem('stockTredning', JSON.stringify(d))
            setTrending(d)
            // console.log(d)
        }
        if (localStorage.stockTredning) {
            setTrending(JSON.parse(localStorage.stockTredning))
        } else {
            f()
        }
        // f()
    }, [])
    // console.log(tredning?.items[0])
    return (

        <div className='flex flex-col p-2 overflow-x-scroll'>
            {/* <Charts xAxis={xAxis} vals={vals ? vals : ''} yMax={0.05} yMin={0.05} w={100} h={100} type='compact' /> */}
            <h2>Stocks - Tredning</h2>
            <div className=''>
                <table>
                    <thead className='text-center'>
                        <th scope='col' className='p-4'>
                            <tr>
                                Name
                            </tr>
                        </th>
                        <th scope='col' className='p-4'>
                            <tr>
                                Current Value
                            </tr>
                        </th>
                        <th scope='col' className='p-4'>
                            <tr>
                                Chart
                            </tr>
                        </th>
                    </thead>
                    <tbody className=''>
                        {tredning ? tredning?.items.slice(0, 10).map((v, i) => {
                            // const graph = Stocks({ dataType: 'graph', time: '30', stockCode: "NVDA" })
                            // graphsSVG()

                            return (
                                <tr key={i} className="text-[13px] w-[10px] p-8" >
                                    <td className='text-left p-4 border-b-[0.5px]'>
                                        {v.info.title}
                                    </td>
                                    <td className='text-center border-b-[0.5px]'>
                                        {v.price.last.value}
                                    </td>
                                    <td className=''>

                                        <Charts xAxis={xAxis} vals={finalVals ? finalVals[i] : ''} yMax={0.05} yMin={0.05} w={size} h={size} type='compact' />
                                    </td>
                                </tr>
                            )
                        }) : 'Loading'}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StocksTredning