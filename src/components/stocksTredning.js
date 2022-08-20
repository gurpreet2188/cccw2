import React, { useEffect, useState } from 'react'
import Stocks from '../data/stocks'
import stocksIntra from '../data/stocksIntra'
import stocksTrending from '../data/stocksTrending'
import Charts from './charts'

function StocksTredning() {
    const [tredning, setTrending] = useState()
    const [data, setData] = useState([])
    const [vals, setVals] = useState([])
    const [finalVals, setFinalVals] = useState([])
    const [xAxis, setXAxis] = useState([])
    const [symbols, setSymbols] = useState([])
    const [shortlist, setShortList] = useState()
    
    const size = 35 // console.log(graph?.Results[0])
    
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
            // console.log(temp[0].info.ticker_symbols[0])
            temp.map((v,i)=>{
                setSymbols(symbols => [...symbols, v.info.ticker_symbols[0]])
            })
        }

    }, [tredning])

    useEffect(()=>{
        if(symbols.length > 0) {
            stocksIntra(symbols, '30', setData)
        }
    },[symbols])

    useEffect(() => {
        let t = []
        for (let i = 0; i < vals.length; i += shortlist.length) {
            const c = vals.slice(i, i + shortlist.length)
            t.push(c)
        }
        setFinalVals(t)
    }, [shortlist, vals])
    // console.log('test', vals)

    useEffect(()=>{
        stocksTrending(setTrending)
    },[])

    return (

        <div className='flex flex-col p-2'>
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
                                Value(USD)
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

                            return (
                                <tr key={i} className="text-[13px] w-[10px] p-8" >
                                    <td className='text-left border-b-[0.5px]'>
                                        {v.info.title}
                                    </td>
                                    <td className='text-center border-b-[0.5px]'>
                                        ${v.price.last.value}
                                    </td>
                                    <td className=''>
                                        <div className='flex flex-row justify-center content-center'>
                                            <Charts xAxis={xAxis} vals={finalVals ? finalVals[i] : ''} yMax={0.05} yMin={0.05} w={size} h={35} type='compact' />

                                        </div>
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