import React from 'react'
import { useState, useEffect } from 'react'
// import historyRanged from '../data/crypto/historyRanged'
import price from '../data/crypto/prices'
import trending from '../data/crypto/trending'

function CryptoTrending() {
    const [data, setData] = useState()
    const [prices, setPrices] = useState({})
    const [history, setHistory] = useState([])
    const [vals, setVals] = useState([])
    const [finalVals, setFinalVals] = useState([])
    const [xAxis, setXAxis] = useState([])
    const currency = 'usd'
    const size = 35
    // console.log(prices, 'test')

    useEffect(() => {
        let check = true
        if (check) {
            trending(setData)
        }
        return () => {
            check = false
        }
    }, [])


    useEffect(() => {
        let check = true
        if (check) {
            let coinIDS = ''
            if (data) {
                if (data?.coins.length > 0) {
                    const dateOld = new Date()
                    dateOld.setHours(dateOld.getHours() - 6) // subtract 6 hours
                    const dateCurrent = new Date()
                    console.log(dateOld.getHours(), dateCurrent.getTime(), 'time')
                    data?.coins.map(v => {
                        coinIDS += v.item.id + ','
                        // historyRanged(setHistory, history, parseInt(dateOld / 1000), parseInt(dateCurrent.getTime() / 1000), v.item.id, currency)
                        // const baseNum = size / hisData?.prices?.length

                        //    setTimeout(()=>{
                        //     hisData.then(v => {
                        //         const baseNum = size / v.prices.length
                        //         if (vals.length === 0) {
                        //             v.prices.map((fv, fi) => {
                        //                 console.log(fv, 'test')
                        //                 setVals(vals => [...vals, parseFloat(fv[1])])
                        //                 setXAxis(xAxis => [...xAxis, (baseNum * fi)])
                        //             })
                        //         }
                        //     }, 100)
                        //    })
                    })
                }
            }

            if (Object.keys(prices).length === 0 && coinIDS !== '') {
                price(setPrices, coinIDS, currency)
            }
        }
        return () => {
            check = false
        }
    }, [data])

    // useEffect(()=>{
    //     let check = true
    //     if(check) {
    //         localStorage.setItem('cryptoHistory', JSON.stringify(history))
    //     }
    //     return ()=>{
    //         check = false
    //     }
    // },[history])

    // useEffect(() => {
    //     let check = true
    //     if (check) {
    //         // console.log(history.length, 'test')
    //         if(data) {
    //             if (history.length === data.coins.length) {
    //                 // console.log(data, 'test')
    //                 history.map((v) => {
    //                     // console.log(v.Results, 'test')
    //                     //get unix date
    //                     // const lastUnixDate = Date.parse(v?.Results[v?.Results?.length - 1].Date.split(' ')[0])
    //                     // //filter through 
    //                     // const filteredData = v?.Results.filter(f => Date.parse(f?.Date.split(' ')[0]) === lastUnixDate)
    //                     // // console.log(filteredData, 'test')
    //                     // //set short listed
    //                     // setShortList(filteredData)
    //                     // baseNum
    //                     const baseNum = size / v.prices.length
    //                     // console.log(baseNum, 'test')
    //                     //set vals
    //                     // console.log(v?.prices[0], 'test')
    //                     if (vals.length === 0) {
    //                         v.prices.map((fv, fi) => {
    //                             // console.log(fv, 'test')
    //                             setVals(vals => [...vals, parseFloat(fv[1])])
    //                             setXAxis(xAxis => [...xAxis, (baseNum * fi)])
    //                         })
    //                     }
    //                 })
    //             }

    //         }
    //     }

    //     return () => {
    //         check = false
    //     }

    // }, [data, history])

    // console.log(vals, xAxis, 'test')


    return (
        // <></>
            <div className='flex flex-col p-2 md:w-[50%] w-[100%] space-y-2 mb-auto'>
                <h2>Crypto</h2>
                {/* <h2>Stocks - Tredning</h2> */}
                <div className='flex flex-col justify-center content-center w-[100%] rounded-md border border-black/10'>
                    <ul className='flex flex-col space-y-6 w-[100%]'>
                        <li className='flex flex-row justify-start content-center items-center  p-4 min-h-[4rem] bg-slate-50'>
                            <div className='basis-[60%]'>Name</div>
                            <div className='basis-[40%] ml-auto text-right'>Value</div>
                            {/* <div className='basis-[15%] ml-auto text-right'>Tracking</div> */}
                        </li>

                        <div className='flex flex-col space-y-3'>

                            {Object.keys(prices).length > 0 ? data?.coins.map((v, i) => {

                                return (
                                    <li key={i} className='flex flex-row justify-center content-center p-4 h-[4rem] bg-slate-50'>
                                        <div className='basis-[60%] text-sm md:text-[16px] m-auto ml-0 flex flex-row space-x-2 items-center'>
                                            <img src={v.item.thumb} className='h-4 w-4' />
                                            <p> {v.item.name}</p>
                                        </div>
                                        <div className='basis-[40%] m-auto text-sm md:text-[16px] text-right'>${prices[v.item.id][currency] ? prices[v.item.id][currency] : 'Loading....'}</div>
                                        {/* <div className='basis-[15%] ml-auto'> */}
                                        {/* <Charts xAxis={xAxis} vals={finalVals ? finalVals[i] : ''} yMax={0.05} yMin={0.05} w={size} h={35} type='compact' /> */}
                                        {/* </div> */}
                                    </li>
                                )
                            }) : 'Loading'}
                        </div>
                    </ul>
                </div>
            </div>
            )
}

            export default CryptoTrending