import React, { useEffect, useState } from 'react'
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
    useEffect(() => {
        let check = true
        if (check) {
            if (data?.length > 0) {
                // console.log(data, 'test')
                data?.map((v) => {
                    // console.log(v.Results, 'test')
                    //get unix date
                    const lastUnixDate = Date.parse(v?.Results[v?.Results?.length - 1].Date.split(' ')[0])
                    //filter through 
                    const filteredData = v?.Results.filter(f => Date.parse(f?.Date.split(' ')[0]) === lastUnixDate)
                    // console.log(filteredData, 'test')
                    //set short listed
                    setShortList(filteredData)
                    // baseNum
                    const baseNum = size / filteredData.length
                    // console.log(baseNum, 'test')
                    //set vals
                    if (vals.length === 0) {
                        filteredData.map((fv, fi) => {
                            setVals(vals => [...vals, parseFloat(fv?.High)])
                            setXAxis(xAxis => [...xAxis, (baseNum * fi)])
                        })
                    }
                })
            }
        }

        return () => {
            check = false
        }

    }, [data])

    useEffect(() => {
        let check = true
        if (check) {
            if (tredning?.items) {
                const temp = tredning.items.slice(0, 10)
                // console.log(temp[0].info.ticker_symbols[0])
                temp.map((v) => {
                    setSymbols(symbols => [...symbols, v.info.ticker_symbols[0]])
                })
            }
        }


        return () => {
            check = false
        }

    }, [tredning])

    useEffect(() => {
        let check = true
        if (check) {
            if (symbols.length > 0) {
                stocksIntra(symbols, '30', setData)
            }
        }


        return () => {
            check = false
        }
    }, [symbols])

    useEffect(() => {
        let t = []
        let check = true
        if (check) {
            if (finalVals.length === 0) {
                for (let i = 0; i < vals.length; i += shortlist.length) {
                    const c = vals.slice(i, i + shortlist.length)
                    t.push(c)
                }
                setFinalVals(t)
                console.log('test vals')
            }
        }
        return () => {
            check = false
        }
    }, [vals])
    


    useEffect(() => {
        let check = true
        if (check) {
            stocksTrending(setTrending)
        }
        return () => {
            check = false
        }
    }, [])

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