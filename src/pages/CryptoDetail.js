import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CommonDetails from '../components/commonDetails'
import calcXY from '../data/calcXY'
import detail from '../data/crypto/detail'
import historyRanged from '../data/crypto/historyRanged'

function CryptoDetail() {
    const [data, setData] = useState()
    const [history, setHistory] = useState()
    const [start, setStart] = useState()
    const [vals, setVals] = useState([])
    const [xAxis, setXAxis] = useState([])
    const size = 300
    const { coinID } = useParams()


    useEffect(() => {
        let check = true
        if (check) {
            detail(setData, coinID)
            const dateOld = new Date()
            dateOld.setHours(dateOld.getHours() - 24) // subtract 6 hours
            const dateCurrent = new Date()
            historyRanged(setHistory, dateOld / 1000, dateCurrent.getTime() / 1000, coinID, 'usd')
        }

        return () => {
            check = false
        }
    }, [coinID])
    // console.log(spanRef)

    // useEffect(() => {
    //     let check = true
    //     if (check) {
           
    //     }

    //     return () => {
    //         check = false
    //     }
    // }, [data])

    useEffect(() => {
        let check = true
        if (check) {
            if (history){
                // let v = []
                // let x = []
                // let filteredData = intra[0].Results.slice(-20)
                // let baseNum
                const [v, x] = calcXY(history.prices, 1, size)
                console.log(v, x)
                setVals(v)
                setXAxis(x)
            }
        }

        return () => {
            check = false
        }
    }, [history])

    const commonDetail = () => {
        return (
            <CommonDetails price={data?.market_data?.current_price?.usd} misc1={'Rank: #' + data?.coingecko_rank} misc2={data?.image?.thumb} change={data?.market_data?.price_change_percentage_24h} name={data.name} sym={data.symbol} summary={data.description.en}  chart={{'xAxis': xAxis, 'vals': vals}}/>
        )
    }
    return (
        <div className='p-2 bg-no-repeat bg-contain w-[100%]'>
            {(data && xAxis && vals) ? commonDetail() : 'Loading...'}
        </div>
    )
}

export default CryptoDetail