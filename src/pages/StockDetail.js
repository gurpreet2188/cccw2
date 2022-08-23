import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommonDetails from '../components/commonDetails'
import calcXY from '../data/calcXY'
import detail from '../data/stocks/detail'

function StockDetail() {
    const { stockSym } = useParams()
    const [details, setDetail] = useState()
    const [vals, setVals] = useState()
    const [xAxis, setXAxis] = useState()
    const [intra, setIntra] = useState()
    const size = 300
    // console.log(stockSym)
    useEffect(() => {
        let check = true
        if (check) {
            if (stockSym) {
                detail(stockSym, setDetail)
            }
        }

        return () => {
            check = false
        }
    }, [stockSym])

    useEffect(() => {
        let check = true
        if (check) {
            let vals = []
            if (localStorage.trendingIntra) {

                const d = JSON.parse(localStorage.trendingIntra)
                vals = d.filter(v => v.Metadata.Symbol === stockSym)
            } else if (localStorage.trendingStockVals) {
                const d = JSON.parse(localStorage.trendingIntra)
                vals = d.filter(v => v.Metadata.Symbol === stockSym)
            }
            console.log(vals)
            setIntra(vals)

        }
        return () => {
            check = false
        }

    }, [localStorage.trendingIntra, localStorage.trendingStockVals, stockSym])

    useEffect(() => {
        let check = true
        if (check) {
            if (intra){
                // let v = []
                // let x = []
                let filteredData = intra[0].Results.slice(-20)
                // let baseNum
                const [v, x] = calcXY(filteredData, 'High', size)
                console.log(v, x)
                setVals(v)
                setXAxis(x)
            }
        }

        return () => {
            check = false
        }
    }, [intra])



    // console.log(intra)

    const commonDetail = () => {
        return (
            <CommonDetails name={details.Name} sym={details.Symbol} summary={details.Description} chart={{'xAxis': xAxis, 'vals': vals}} />
        )
    }
    return (
        <div className='p-2'>
            {(xAxis && vals && details) ? commonDetail() : 'Loading...'}
        </div>
    )
}

export default StockDetail