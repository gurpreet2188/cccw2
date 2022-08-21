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
                const temp = tredning.items.slice(0, 7)
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

        <div className='flex flex-col p-2 md:w-[50%] w-[100%] self-center space-y-2'>
            <h2>Stocks</h2>
            <div className='flex flex-col justify-center content-center w-[100%] rounded-md border border-black/10'>
                <ul className='flex flex-col space-y-6 w-[100%]'>
                    <li className='flex flex-row justify-start content-center items-center  p-4 min-h-[4rem] bg-slate-50'>
                        <div className='basis-[60%]'>Name</div>
                        <div className='basis-[15%] ml-auto text-right'>Value</div>
                        <div className='basis-[15%] ml-auto text-right'>Tracking</div>
                    </li>

                    <div className='flex flex-col space-y-3'>

                        {tredning ? tredning?.items.slice(0, 7).map((v, i) => {

                            return (
                                <li key={i} className='flex flex-row justify-center content-center p-4 h-[4rem] bg-slate-50'>
                                    <div className='basis-[60%] text-sm md:text-[16px] m-auto ml-0'>{v.info.title}</div>
                                    <div className='basis-[15%] m-auto text-sm md:text-[16px] text-right'>${v.price.last.value}</div>
                                    <div className='basis-[15%] ml-auto'>
                                        <Charts xAxis={xAxis} vals={finalVals ? finalVals[i] : ''} yMax={0.05} yMin={0.05} w={size} h={35} type='compact' />
                                    </div>
                                </li>



                            )
                        }) : 'Loading'}
                    </div>

                </ul>

                {/* <table className='w-[100%] rounded-lg'>
                    <thead className='text-left bg-slate-300 rounded-lg shadow-md'>
                        <th scope='col' className='py-4 pr-4 pl-1 rounded-tr-none rounded-br-none rounded-bl-none rounded-lg'>
                            <tr>
                                Name
                            </tr>
                        </th>
                        <th scope='col' className='py-4 pr-4 pl-1 '>
                            <tr>
                                Value(USD)
                            </tr>
                        </th>
                        <th scope='col' className='py-4 pr-4 pl-1 rounded-lg rounded-tl-none rounded-br-none rounded-bl-none'>
                            <tr>
                                Chart
                            </tr>
                        </th>
                    </thead>
                    <tbody className=''>
                        {tredning ? tredning?.items.slice(0, 7).map((v, i) => {

                            return (
                                <tr key={i} className="text-[13px] w-[10px] shadow-md rounded-lg" >
                                    <td className='text-left py-6 pl-1 pr-4 h-12'>
                                        {v.info.title}
                                    </td>
                                    <td className='text-left '>
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
                </table> */}
            </div>
        </div>
    )
}

export default StocksTredning